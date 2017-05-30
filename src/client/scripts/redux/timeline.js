import uuid from 'uuid/v4';

// ******************** Actions types ********************
const ADD_MARKER    = 'timeline.ADD_MARKER';
const REMOVE_MARKER = 'timeline.REMOVE_MARKER';
const MOVE_MARKER   = 'timeline.MOVE_MARKER';
const RENAME_MARKER = 'timeline.RENAME_MARKER';

const ADD_EVENT                = 'timeline.ADD_EVENT';
const REMOVE_EVENT             = 'timeline.REMOVE_EVENT';
const MOVE_EVENT               = 'timeline.MOVE_EVENT';
const UPDATE_EVENT_LABEL       = 'timeline.UPDATE_EVENT_LABEL';
const UPDATE_EVENT_DESCRIPTION = 'timeline.UPDATE_EVENT_DESCRIPTION';

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
                       ,UPDATE_EVENT_LABEL
                       ,UPDATE_EVENT_DESCRIPTION];

// ******************** Action creators ********************

/**
 *
 * @param {string} description - Description of the event
 * @param {string} label       - Label of the event
 * @param {string} marker      - UUID of the marker
 * @param {number} position    - Position of the created event
 */
function addEvent({description, label, marker, position=-1}) {
    return { description
           , label
           , marker
           , position
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
 * @param {string} markerUUID
 * @param {string} uuid
 * @returns {StoreAction.Timeline.RemoveEvent}
 */
function removeEvent(markerUUID, uuid) {
    return { markerUUID
           , type: REMOVE_EVENT
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
 *
 * @param {string} description
 * @param {string} markerUUID
 * @param {string} uuid
 * @returns {StoreAction.Timeline.UpdateEventDescription}
 */
function updateEventDescription({description, markerUUID, uuid}) {
    return { description
           , markerUUID
           , type: UPDATE_EVENT_LABEL
           , uuid};
}

/**
 *
 * @param {string} label
 * @param {string} markerUUID
 * @param {string} uuid
 * @returns {StoreAction.Timeline.UpdateEventLabel}
 */
function updateEventLabel({label, markerUUID, uuid}) {
    return { label
           , markerUUID
           , type: UPDATE_EVENT_LABEL
           , uuid};
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
             * @type {Store.Timeline.Event}
             */
            let event;

            /**
             * Desired position of the event
             * @type {number}
             */
            let eventPosition;

            event = { description: action.description
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
            /** @type {Store.Timeline.Marker} */
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

        case UPDATE_EVENT_DESCRIPTION: {
            let {newState, event} = cloneEvent(state, action.uuid);
            event.description = action.description;
            return newState;
        }

        case UPDATE_EVENT_LABEL: {
            let {newState, event} = cloneEvent(state, action.uuid);
            event.label = action.label;
            return newState;
        }

        default:
            return state;
    }

}

/**
 *
 * @param {Store.Timeline} state
 * @param {string} uuid
 * @returns {{newState: Store.Timeline, event: Store.Timeline.Event}}
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
 * @param {Store.Timeline} state
 * @param {string}         uuid
 * @param {boolean}        cloneEvent
 * @returns {{newState: Store.Timeline, marker: Store.Timeline.Marker}}
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
 * @param {Store.Timeline} state
 * @param {string}         uuid
 * @returns {number}
 */
function getMarkerIndex(state, uuid) {
    return state.markers.findIndex(marker => marker.uuid === uuid);
}

// ******************** Exports ********************
export default reducer;

export { addEvent
       , addMarker
       , moveEvent
       , moveMarker
       , renameMarker
       , removeEvent
       , removeMarker
       , updateEventDescription
       , updateEventLabel};


export {LIST_MODIFIERS};
