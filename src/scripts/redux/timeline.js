import uuid from 'uuid/v4';

// ******************** Actions types ********************
const ADD_MARKER    = 'timeline.ADD_MARKER';
const REMOVE_MARKER = 'timeline.REMOVE_MARKER';
const MOVE_MARKER   = 'timeline.MOVE_MARKER';
const RENAME_MARKER = 'timeline.RENAME_MARKER';

const ADD_EVENT     = 'timeline.ADD_EVENT';
const REMOVE_EVENT  = 'timeline.REMOVE_EVENT';
const MOVE_EVENT    = 'timeline.MOVE_EVENT';
const UPDATE_EVENT  = 'timeline.UPDATE_EVENT';

const LOAD_TIMELINE = 'timeline.LOAD';

/**
 * List of actions that update the document
 * @type {string[]}
 */
const LIST_MODIFIERS = [ADD_MARKER
                       ,REMOVE_MARKER
                       ,MOVE_MARKER
                       ,RENAME_MARKER

                       ,ADD_EVENT
                       ,REMOVE_EVENT
                       ,MOVE_EVENT
                       ,UPDATE_EVENT];

// ******************** Action creators ********************

/**
 * @param {Object} data
 * @param {Object} data.bubbuleURL
 * @param {string} data.description - Description of the event
 * @param {string} data.label       - Label of the event
 * @param {string} data.marker      - UUID of the marker
 * @param {number} data.position    - Position of the created event
 */
function addEvent(data) {
    return { ...data
           , type: ADD_EVENT
           , uuid: uuid()};
}

/**
 *
 * @param {string} label - Label of the marker
 * @param {number} position
 * @returns {StoreAction.Timeline.AddMarker}
 */
function addMarker(label, position=-1) {
    return { label
           , position
           , type : ADD_MARKER
           , uuid : uuid()};
}

/**
 *
 * @param {ReduxStore} timeline
 */
function loadTimeline({timeline}) {
    return { payload: {timeline}
           , type   : LOAD_TIMELINE};
}

/**
 * @param {string} data
 * @param {string} data.marker
 * @param {string} data.event
 * @param {string} data.position
 * @returns {StoreAction.Timeline.MoveEvent}
 */
function moveEvent(data) {
    return { ...data
           , type: MOVE_EVENT};
}

/**
 *
 * @param {string} uuid
 * @param {number} position
 * @returns {StoreAction.Timeline.MoveMarker}
 */
function moveMarker(uuid, position) {
    return { position
           , uuid
           , type: MOVE_MARKER};
}

/**
 *
 * @param uuid
 * @param label
 * @returns {StoreAction.Timeline.RenameMarker}
 */
function renameMarker({label, uuid}) {
    return { label
           , type: RENAME_MARKER
           , uuid};
}

/**
 *
 * @param {string} uuid
 * @returns {StoreAction.Timeline.RemoveEvent}
 */
function removeEvent({uuid}) {
    return { type: REMOVE_EVENT
           , uuid};
}

/**
 * @param {string} uuid
 * @returns {StoreAction.Timeline.RemoveMarker}
 */
function removeMarker(uuid) {
    return { type: REMOVE_MARKER
           , uuid};
}

/**
 * @param {Object} data
 * @param {string} data.bubbuleURL
 * @param {string} data.description
 * @param {string} data.label
 * @param {string} data.markerUUID
 * @param {string} data.uuid
 * @returns {StoreAction.Timeline.UpdateEventDescription}
 */
function updateEvent(data) {
    return { ...data
           , type: UPDATE_EVENT};
}

// ******************** Reducer ********************

/**
 *
 * @param {ReduxStore.Timeline} state
 * @param {Object}         action
 * @returns {ReduxStore.Timeline}
 */
function reducer( state={ events   :{}
                        , markers  : []
                        , saved    : true}
                , action) {

    switch (action.type) {

        case ADD_EVENT: {
            /**
             * Created event
             * @type {ReduxStore.Timeline.Event}
             */
            let event;

            /**
             * Desired position of the event
             * @type {number}
             */
            let eventPosition;
            let marker;

            event = { bubbuleURL : action.bubbuleURL || ''
                    , description: action.description
                    , label      : action.label
                    , marker     : action.marker
                    , uuid       : action.uuid};

            let {newState, newMarkers} = cloneMarker( state
                                                    , action.marker
                                                    , {cloneEventList: true});

            marker = newMarkers[0];

            eventPosition = action.position === -1 || typeof action.position === 'undefined'
                                ? marker.events.length
                                : action.position;

            // Add the event to the list of events of the marker at the desired position
            marker.events.splice(eventPosition, 0, event.uuid);

            // Declaring the event
            newState.events = {...newState.events};
            newState.events[event.uuid] = event;

            return newState;
        }

        case ADD_MARKER: {
            let marker;
            let markers;
            let position;

            markers = state.markers.slice(0);

            position = action.position === -1 ? markers.length : action.position;

            marker = { events: []
                     , label : action.label
                     , uuid  : action.uuid};

            markers.splice(position, 0, marker);

            return {...state
                   , markers};
        }

        case LOAD_TIMELINE:
            return action.payload.timeline;

        case MOVE_EVENT: {
            let destinationMarker;
            let event;
            let eventOriginIndex;
            let markersToClone;
            let originMarker;

            event = state.events[action.event];

            // Cloning both origin and destination markers
            markersToClone = [event.marker];

                // If the destination marker is not the same, then we clone this one too
            if (event.marker !== action.marker)
                markersToClone.push(action.marker);

                // Cloning origin and destination markers
            let {newState, newMarkers} = cloneMarker(state, markersToClone, {cloneEventList: true});

            originMarker      = newMarkers[0];
            destinationMarker = newMarkers[1];

            eventOriginIndex = originMarker.events.indexOf(event.uuid);

            // If the origin and destination marker are the same, then we simply move the event
            if (!destinationMarker) {
                originMarker.events = moveInArray( originMarker.events
                                                 , eventOriginIndex
                                                 , action.position);
            }
            else {
                let cloneResult;

                // Removing the event from the origin
                originMarker.events.splice(eventOriginIndex, 1);

                // Adding the event to the destination
                destinationMarker.events.splice(action.position, 0, event.uuid);

                cloneResult  = cloneEvent(newState, event.uuid);
                newState     = cloneResult.newState;
                event        = cloneResult.event;
                event.marker = destinationMarker.uuid;
            }

            return newState;
        }

        case MOVE_MARKER:
            return { ...state
                   , markers: moveInArray( state.markers
                                         , getMarkerIndex(state, action.uuid)
                                         , action.position)};

        case REMOVE_EVENT: {
            let event;
            let marker;

            event = state.events[action.uuid];

            let {newState, newMarkers} = cloneMarker(state, event.marker, {cloneEventList: true});
            marker = newMarkers[0];

            marker.events = marker.events.filter(event => event !== action.uuid);

            // Cloning the list of all events
            newState.events = {...newState.events};

            // Removing the event from the list of events
            delete newState.events[action.uuid];

            return newState;
        }

        case REMOVE_MARKER: {
            /** @type {ReduxStore.Timeline.Marker} */
            let marker;

            /** @type {number} */
            let markerIndex;

            markerIndex = getMarkerIndex(state, action.uuid);
            marker = state.markers[markerIndex];

            // Removing all events of the marker
            for(let event of marker.events) {
                delete state.events[event.uuid];
            }

            return {...state
                   , markers: state.markers.filter(marker => marker.uuid !== action.uuid)};
        }

        case RENAME_MARKER: {
            let {newState, newMarkers} = cloneMarker(state, action.uuid);
            let marker = newMarkers[0];

            marker.label = action.label;

            return newState;
        }

        case UPDATE_EVENT: {
            let {newState, event} = cloneEvent(state, action.uuid);
            event.bubbuleURL  = action.bubbuleURL || '';
            event.description = action.description;
            event.label       = action.label;
            return newState;
        }

        default:
            return state;
    }

}

/**
 *
 * @param {ReduxStore.Timeline} state
 * @param {string} uuid
 * @returns {{newState: ReduxStore.Timeline, event: ReduxStore.Timeline.Event}}
 */
function cloneEvent(state, uuid) {
    let newState;

    newState = { events: {...state.events}
               , ...state};

    state.events[uuid] = {...state.events[uuid]};

    return { event: state.events[uuid]
           , newState};
}

/**
 *
 * @param {ReduxStore.Timeline} state
 * @param {string|string[]}     uuid       - UUID of the marker to clone
 * @param {boolean}             cloneEventList
 * @returns {{newState: ReduxStore.Timeline, marker: ReduxStore.Timeline.Marker[]}}
 */
function cloneMarker(state, uuid, {cloneEventList=false}={}) {
    let markers;
    let newMarkers;
    let newState;

    if (typeof uuid === 'string')
        uuid = [uuid];

    markers    = state.markers.slice(0);
    newMarkers = [];

    for(let id of uuid) {
        let marker;
        let markerIndex;

        markerIndex = getMarkerIndex(state, id);

        // Cloning the marker
        marker = Object.assign({}, markers[markerIndex]);

        if (cloneEventList)
            marker.events = [...marker.events];

        // Updating the state
        markers[markerIndex] = marker;
        newMarkers.push(marker);
    }

    newState = { ...state
               , markers};

    return { newState
           , newMarkers};
}

/**
 * @param {Array} array
 * @param {number} oldPosition - Old position of the event
 * @param {number} newPosition - New position of the event
 */
function moveInArray(array, oldPosition, newPosition) {
    array = array.slice(0);

    // Code inspired by :
    // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    array.splice(newPosition, 0, array.splice(oldPosition, 1)[0]);

    return array;
}

/**
 *
 * @param {ReduxStore.Timeline} state
 * @param {string}              uuid
 * @returns {number}
 */
function getMarkerIndex(state, uuid) {
    return state.markers.findIndex(marker => marker.uuid === uuid);
}

// ******************** Exports ********************
export default reducer;

export { addEvent
       , addMarker
       , loadTimeline
       , moveEvent
       , moveMarker
       , renameMarker
       , removeEvent
       , removeMarker
       , updateEvent};


export {LIST_MODIFIERS};
