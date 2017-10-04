import uuid from 'uuid/v4';
import * as Marker from './helpers/marker';
import * as Event from './helpers/event';
import {ActionCreatorError} from './helpers';

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
                       ,MOVE_MARKER
                       ,REMOVE_MARKER
                       ,RENAME_MARKER

                       ,ADD_EVENT
                       ,MOVE_EVENT
                       ,REMOVE_EVENT
                       ,UPDATE_EVENT];

// ******************** Action creators ********************

/**
 * @typedef {Object} StoreAction.Timeline.AddEvent
 */

/**
 * @param {Object} data
 * @param {string} data.description - Description of the event
 * @param {string} data.label       - Label of the event
 * @param {string} data.marker      - UUID of the marker to which the event will be added
 * @param {number} [position]       - Position where to create the event.
 * @returns {{payload: {event: ReduxStore.Timeline.Event, position: number}, type: string}}
 */
function addEvent(data, position) {

    let marker;

    marker = Marker.getMarker(data.marker);

    // Checking that the marker exists
    if (!marker)
        throw new ActionCreatorError( 'Marker not found'
                                    , { actionCreator: 'addEvent'
                                      , data
                                      , actionType   : ADD_EVENT});

    if (typeof position !== 'undefined') {
        if (!Number.isInteger(position) || position < 0 || position > marker.events.length ) {
            throw new ActionCreatorError( 'Invalid position'
                                        , { actionCreator: 'addEvent'
                                          , position
                                          , actionType   : ADD_EVENT});
        }
    }

    return { payload: { event: { uuid: uuid()
                               , ...data}
                      , position: position}
           , type: ADD_EVENT};
}

/**
 * @typedef {Object} StoreAction.Timeline.AddMarker
 * @property {Object}                       payload
 * @property {{label: string, uuid: string} payload.marker
 * @property {number}                       payload.position - Position of the marker
 * @property {string}                       type
 */

/**
 *
 * @param {string} label - Label of the marker
 * @param {number} [position]
 * @returns {StoreAction.Timeline.AddMarker}
 */
function addMarker({label, position}) {
    /** @type {number} */
    let nbMarkers;

    nbMarkers = Marker.listMarkersUUID().length;

    if (typeof position !== 'undefined') {
        if (!Number.isInteger(position) || position < 0 || position > nbMarkers) {
            throw new ActionCreatorError( 'Invalid position'
                                        , { actionCreator: 'addMarker'
                                          , position
                                          , actionType   : ADD_MARKER});
        }
    }
    else {
        position = nbMarkers;
    }

    return { payload: { marker: { label
                                , uuid : uuid()}
                      , position }
           , type : ADD_MARKER};
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
 * Create an action that will move an event to a new position inside a marker.
 * If no marker is provided, then the event will move inside the same marker.
 *
 * @param {string} event  - UUID of the event to move
 * @param {string} [marker] - UUID of the destination marker.
 *                            If undefined, then the event will be moved inside of its actual marker
 * @param {number} [position]
 * @returns {StoreAction.Timeline.MoveEvent}
 */
function moveEvent({event, marker, position}) {

    let destinationMarker;
    let eventInstance;

    eventInstance = Event.getEvent(event);

    // Checking that the event exists
    if (!eventInstance)
        throw new ActionCreatorError( 'Event not found'
                                    , { actionCreator: 'moveEvent'
                                      , data: {event, marker, position}
                                      , actionType : MOVE_EVENT});

    // Checking that the marker exists
    if (marker && !Marker.getMarker(marker))
        throw new ActionCreatorError( 'Marker not found'
                                    , { actionCreator: 'moveEvent'
                                      , data: {event, marker, position}
                                      , actionType : MOVE_EVENT});


    destinationMarker = Marker.getMarker(marker || eventInstance.marker);

    // Checking that the position is valid exists
    if (   typeof position !== 'number'
        || position < 0
            // If moving in the same marker
        || (destinationMarker.uuid === eventInstance.marker && position >= destinationMarker.events.length)
            // If moving in another marker (the new marker will have one more event in that case)
        || (destinationMarker.uuid !== eventInstance.marker && position > destinationMarker.events.length)) {

        throw new ActionCreatorError( 'Invalid position'
                                    , { actionCreator: 'moveEvent'
                                      , data: {event, marker, position}
                                      , actionType : MOVE_EVENT});
    }

    return { payload: { event
                      , marker: destinationMarker.uuid
                      , position }
           , type: MOVE_EVENT};
}

/**
 *
 * @param {string} marker
 * @param {number} position
 * @returns {StoreAction.Timeline.MoveMarker}
 */
function moveMarker({marker, position}) {

    /** @type {number} */
    let nbMarkers;

    // Checking that the event exists
    if (!Marker.getMarker(marker))
        throw new ActionCreatorError( 'Marker not found'
                                    , { actionCreator: 'moveMarker'
                                      , data: {marker, position}
                                      , actionType : MOVE_EVENT});

    nbMarkers = Marker.listMarkersUUID().length;

    if (typeof position !== 'undefined') {
        if (!Number.isInteger(position) || position < 0 || position >= nbMarkers) {
            throw new ActionCreatorError( 'Invalid position'
                                        , { actionCreator: 'addMarker'
                                          , position
                                          , actionType   : ADD_MARKER});
        }
    }
    else {
        position = nbMarkers;
    }

    return { payload: { marker
                      , position }
           , type: MOVE_MARKER};
}

/**
 *
 * @param uuid
 * @param label
 * @returns {StoreAction.Timeline.RenameMarker}
 */
function renameMarker({label, marker}) {
    // Checking that the marker exists
    if (!Marker.getMarker(marker))
        throw new ActionCreatorError( 'Marker not found'
                                    , { actionCreator: 'renameMarker'
                                      , data: {marker, label}
                                      , actionType : RENAME_MARKER});

    return { payload : { label, marker}
           , type: RENAME_MARKER};
}

/**
 * @typedef {Object} StoreAction.Timeline.RemoveEvent
 * @property {Object} payload
 * @property {string} payload.uuid  - UUID of the event to remove
 */

/**
 *
 * @param {string} uuid
 * @returns {StoreAction.Timeline.RemoveEvent}
 */
function removeEvent({uuid}) {
    // Checking that the event exists
    if (!Event.getEvent(uuid))
        throw new ActionCreatorError( 'Event not found'
                                    , { actionCreator: 'removeEvent'
                                      , data: {uuid}
                                      , actionType : REMOVE_EVENT});

    return { type: REMOVE_EVENT
           , payload: {uuid} };
}

/**
 * @param {string} marker - UUID of the marker to remove
 * @returns {StoreAction.Timeline.RemoveMarker}
 */
function removeMarker({marker}) {
    // Checking that the marker exists
    if (!Marker.getMarker(marker))
        throw new ActionCreatorError( 'Marker not found'
                                    , { actionCreator: 'removeMarker'
                                      , data: {marker}
                                      , actionType : REMOVE_MARKER});

    return { type: REMOVE_MARKER
           , payload: {marker}};
}

/**
 * @typedef {Object} StoreAction.Timeline.UpdateEventDescription
 * @property {Object} payload
 * @property {string} payload.data
 * @property {string} payload.data.description - New description of the event
 * @property {string} payload.uuid             - UUID of the event to rename
 */

/**
 * @param {string} uuid
 * @param {Object} data
 * @param {string} data.illustrationURL
 * @param {string} data.description
 * @param {string} data.label
 * @returns {StoreAction.Timeline.UpdateEventDescription}
 */
function updateEvent({uuid, data}) {

    // Checking that the event exists
    if (!Event.getEvent(uuid))
        throw new ActionCreatorError( 'Event not found'
                                    , { actionCreator: 'updateEvent'
                                      , data: {...data}
                                      , actionType : UPDATE_EVENT});

    return { payload: {data, uuid}
           , type   : UPDATE_EVENT};
}

// ******************** Reducer ********************

/**
 *
 * @param {ReduxStore.Timeline} state
 * @param {Object}         action
 * @returns {ReduxStore.Timeline}
 */
function reducer( state = { events   :{}
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
            let payload;

            payload = action.payload;

            event = {...action.payload.event};

            let {newState, newMarkers} = cloneMarker( state
                                                    , event.marker
                                                    , {cloneEventList: true});

            marker = newMarkers[0];

            eventPosition = payload.position === -1 || typeof payload.position === 'undefined'
                                ? marker.events.length
                                : payload.position;

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
            let payload;
            let position;

            markers = state.markers.slice(0);
            payload = action.payload;

            position = typeof payload.position === 'undefined' ? markers.length : payload.position;

            marker = { events: []
                     , ...payload.marker };

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
            let payload;

            payload = action.payload;

            event = state.events[payload.event];

            // Cloning both origin and destination markers
            markersToClone = [event.marker];

                // If the destination marker is not the same, then we clone this one too
            if (payload.marker && event.marker !== payload.marker)
                markersToClone.push(payload.marker);

                // Cloning origin and destination markers
            let {newState, newMarkers} = cloneMarker(state, markersToClone, {cloneEventList: true});

            originMarker      = newMarkers[0];
            destinationMarker = newMarkers[1];

            eventOriginIndex = originMarker.events.indexOf(event.uuid);

            // If the origin and destination marker are the same, then we simply move the event
            if (!destinationMarker) {
                originMarker.events = moveInArray( originMarker.events
                                                 , eventOriginIndex
                                                 , payload.position);
            }
            else {
                let cloneResult;

                // Removing the event from the origin
                originMarker.events.splice(eventOriginIndex, 1);

                // Adding the event to the destination
                destinationMarker.events.splice(payload.position, 0, event.uuid);

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
                                         , getMarkerIndex(state, action.payload.marker)
                                         , action.payload.position)};

        case REMOVE_EVENT: {
            let event;
            let marker;
            let uuid;

            uuid = action.payload.uuid;

            event = state.events[uuid];

            let {newState, newMarkers} = cloneMarker(state, event.marker, {cloneEventList: true});
            marker = newMarkers[0];

            marker.events = marker.events.filter(event => event !== uuid);

            // Cloning the list of all events
            newState.events = {...newState.events};

            // Removing the event from the list of events
            delete newState.events[uuid];

            return newState;
        }

        case REMOVE_MARKER: {
            /** @type {ReduxStore.Timeline.Marker} */
            let marker;

            /** @type {number} */
            let markerIndex;

            let events;

            markerIndex = getMarkerIndex(state, action.payload.marker);
            marker = state.markers[markerIndex];

            events = { ...state.events};

            // Removing all events of the marker
            for(let event of marker.events) {
                delete events[event];
            }

            return {...state
                   , events
                   , markers: state.markers.filter(marker => marker.uuid !== action.payload.marker)};
        }

        case RENAME_MARKER: {
            let {newState, newMarkers} = cloneMarker(state, action.payload.marker);
            let marker = newMarkers[0];

            marker.label = action.payload.label;

            return newState;
        }

        case UPDATE_EVENT: {
            let {newState, event} = cloneEvent(state, action.payload.uuid);
            let newData = action.payload.data;

            event.illustrationURL = newData.illustrationURL || '';
            event.description     = newData.description;
            event.label           = newData.label;
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
            marker.events = marker.events.slice(0);

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
       , updateEvent

       // Action type
       , ADD_EVENT
       , ADD_MARKER
       , MOVE_EVENT
       , MOVE_MARKER
       , REMOVE_EVENT
       , REMOVE_MARKER
       , RENAME_MARKER
       , UPDATE_EVENT

        // Other constants
       , LIST_MODIFIERS};
