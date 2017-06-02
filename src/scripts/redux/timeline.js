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
 *
 * @param {string} markerUUID
 * @param {number} position
 * @param {string} uuid
 * @returns {StoreAction.Timeline.MoveEvent}
 */
function moveEvent({markerUUID, position, uuid}) {
    return { markerUUID
           , position
           , type: MOVE_EVENT
           , uuid};
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

            event = { bubbuleURL : action.bubbuleURL || ''
                    , description: action.description
                    , label      : action.label
                    , marker     : action.marker
                    , uuid       : action.uuid};

            let {newState, marker} = cloneMarker( state
                                                , action.marker
                                                , {cloneEvent: true});

            eventPosition = action.position === -1 ? marker.events.length : action.position;

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

        case MOVE_MARKER:
            return { ...state
                   , markers: moveInArray( state.markers
                                         , getMarkerIndex(state, action.uuid)
                                         , action.position)};

        case REMOVE_EVENT: {
            let event;

            event = state.events[action.uuid];

            let {newState, marker} = cloneMarker(state, event.marker, {cloneEvent: true});

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
            let {newState, marker} = cloneMarker(state, action.uuid);

            marker.label = action.label;

            return newState;
        }

        case MOVE_EVENT: {
            let {newState, marker} = cloneMarker(state, action.markerUUID);

            marker.events = moveInArray( marker.events
                                       , marker.events.find(event => event === action.uuid)
                                       , action.position);

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
 * @param {string}              uuid       - UUID of the marker to clone
 * @param {boolean}             cloneEvent
 * @returns {{newState: ReduxStore.Timeline, marker: ReduxStore.Timeline.Marker}}
 */
function cloneMarker(state, uuid, {cloneEvent=false}={}) {
    let marker;
    let markerIndex;
    let markers;
    let newState;

    markers     = state.markers.slice(0);
    markerIndex = getMarkerIndex(state, uuid);
    marker      = Object.assign({}, markers[markerIndex]);

    if (cloneEvent)
        marker.events = [...marker.events];

    markers[markerIndex] = marker;

    newState = { ...state
               , markers};

    return { newState
           , marker : marker};
}

function moveInArray(array, oldPosition, newPosition) {

    array = array.slice(0);

    // Code inspired by :
    // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    array.splice(newPosition, 0, array.splice(oldPosition, 1)[0]);
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
