// ============================================================
// Import packages

import uuidV4 from 'uuid/v4';

// ============================================================
// Import modules
import * as Marker from './helpers/marker';
import * as Event from './helpers/event';
import { ActionCreatorError } from './helpers';

// ============================================================
// Action types
const ADD_MARKER = 'timeline.ADD_MARKER';
const REMOVE_MARKER = 'timeline.REMOVE_MARKER';
const MOVE_MARKER = 'timeline.MOVE_MARKER';
const RENAME_MARKER = 'timeline.RENAME_MARKER';

const ADD_EVENT = 'timeline.ADD_EVENT';
const REMOVE_EVENT = 'timeline.REMOVE_EVENT';
const MOVE_EVENT = 'timeline.MOVE_EVENT';
const UPDATE_EVENT = 'timeline.UPDATE_EVENT';

const LOAD_TIMELINE = 'timeline.LOAD';

/**
 * List of actions that update the document
 * @type {string[]}
 */
const LIST_MODIFIERS = [ADD_MARKER,
    MOVE_MARKER,
    REMOVE_MARKER,
    RENAME_MARKER,

    ADD_EVENT,
    MOVE_EVENT,
    REMOVE_EVENT,
    UPDATE_EVENT];

// ============================================================
// Action creators

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
    const marker = Marker.getMarker(data.marker);

    // Checking that the marker exists
    if (!marker) {
        throw new ActionCreatorError('Marker not found',
            {
                actionCreator : 'addEvent',
                data,
                actionType    : ADD_EVENT,
            });
    }

    if (typeof position !== 'undefined') {
        if (!Number.isInteger(position) || position < 0 || position > marker.events.length) {
            throw new ActionCreatorError('Invalid position',
                {
                    actionCreator : 'addEvent',
                    position,
                    actionType    : ADD_EVENT,
                });
        }
    }

    return {
        payload : {
            event : {
                uuid : uuidV4(),
                ...data,
            },
            position,
        },
        type : ADD_EVENT,
    };
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
function addMarker({ label, position }) {
    let markerPosition;

    /** @type {number} */
    const nbMarkers = Marker.listMarkersUUID().length;

    if (typeof position !== 'undefined') {
        markerPosition = position;

        if (!Number.isInteger(position) || position < 0 || position > nbMarkers) {
            throw new ActionCreatorError(
                'Invalid position',
                {
                    actionCreator : 'addMarker',
                    position,
                    actionType    : ADD_MARKER,
                },
            );
        }
    } else {
        markerPosition = nbMarkers;
    }

    return {
        payload : {
            marker : {
                label,
                uuid : uuidV4(),
            },
            position : markerPosition,
        },
        type : ADD_MARKER,
    };
}

/**
 *
 * @param {ReduxStore} timeline
 */
function loadTimeline({ timeline }) {
    return {
        payload : { timeline },
        type    : LOAD_TIMELINE,
    };
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
function moveEvent({ event, marker, position }) {
    const eventInstance = Event.getEvent(event);

    // Checking that the event exists
    if (!eventInstance) {
        throw new ActionCreatorError('Event not found',
            {
                actionCreator : 'moveEvent',
                data          : { event, marker, position },
                actionType    : MOVE_EVENT,
            });
    }

    // Checking that the marker exists
    if (marker && !Marker.getMarker(marker)) {
        throw new ActionCreatorError('Marker not found',
            {
                actionCreator : 'moveEvent',
                data          : { event, marker, position },
                actionType    : MOVE_EVENT,
            });
    }


    const destinationMarker = Marker.getMarker(marker || eventInstance.marker);

    // Checking that the position is valid exists
    if (typeof position !== 'number'
        || position < 0
    // If moving in the same marker
        || (
            destinationMarker.uuid === eventInstance.marker
            && position >= destinationMarker.events.length
        )
    // If moving in another marker (the new marker will have one more event in that case)
        || (
            destinationMarker.uuid !== eventInstance.marker
            && position > destinationMarker.events.length
        )) {
        throw new ActionCreatorError('Invalid position',
            {
                actionCreator : 'moveEvent',
                data          : { event, marker, position },
                actionType    : MOVE_EVENT,
            });
    }

    return {
        payload : {
            event,
            marker : destinationMarker.uuid,
            position,
        },
        type : MOVE_EVENT,
    };
}

/**
 *
 * @param {string} marker
 * @param {number} position
 * @returns {StoreAction.Timeline.MoveMarker}
 */
function moveMarker({ marker, position }) {
    let markerPosition;

    // Checking that the event exists
    if (!Marker.getMarker(marker)) {
        throw new ActionCreatorError('Marker not found',
            {
                actionCreator : 'moveMarker',
                data          : { marker, position },
                actionType    : MOVE_EVENT,
            });
    }

    const nbMarkers = Marker.listMarkersUUID().length;

    if (typeof position !== 'undefined') {
        if (!Number.isInteger(position) || position < 0 || position >= nbMarkers) {
            throw new ActionCreatorError('Invalid position',
                {
                    actionCreator : 'addMarker',
                    position,
                    actionType    : ADD_MARKER,
                });
        }

        markerPosition = position;
    } else {
        markerPosition = nbMarkers;
    }

    return {
        payload : {
            marker,
            position : markerPosition,
        },
        type : MOVE_MARKER,
    };
}

/**
 *
 * @param uuid
 * @param label
 * @returns {StoreAction.Timeline.RenameMarker}
 */
function renameMarker({ label, marker }) {
    // Checking that the marker exists
    if (!Marker.getMarker(marker)) {
        throw new ActionCreatorError('Marker not found',
            {
                actionCreator : 'renameMarker',
                data          : { marker, label },
                actionType    : RENAME_MARKER,
            });
    }

    return {
        payload : { label, marker },
        type    : RENAME_MARKER,
    };
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
function removeEvent({ uuid }) {
    // Checking that the event exists
    if (!Event.getEvent(uuid)) {
        throw new ActionCreatorError('Event not found',
            {
                actionCreator : 'removeEvent',
                data          : { uuid },
                actionType    : REMOVE_EVENT,
            });
    }

    return {
        type    : REMOVE_EVENT,
        payload : { uuid },
    };
}

/**
 * @param {string} marker - UUID of the marker to remove
 * @returns {StoreAction.Timeline.RemoveMarker}
 */
function removeMarker({ marker }) {
    // Checking that the marker exists
    if (!Marker.getMarker(marker)) {
        throw new ActionCreatorError('Marker not found',
            {
                actionCreator : 'removeMarker',
                data          : { marker },
                actionType    : REMOVE_MARKER,
            });
    }

    return {
        type    : REMOVE_MARKER,
        payload : { marker },
    };
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
function updateEvent({ uuid, data }) {
    // Checking that the event exists
    if (!Event.getEvent(uuid)) {
        throw new ActionCreatorError('Event not found',
            {
                actionCreator : 'updateEvent',
                data          : { ...data },
                actionType    : UPDATE_EVENT,
            });
    }

    return {
        payload : { data, uuid },
        type    : UPDATE_EVENT,
    };
}

// ******************** Reducer ********************

/**
 *
 * @param {ReduxStore.Timeline} state
 * @param {Object}         action
 * @returns {ReduxStore.Timeline}
 */
function reducer(
    state = {
        events  : {},
        markers : [],
        saved   : true,
    },
    action,
) {
    switch (action.type) {
    case ADD_EVENT: {
        const payload = action.payload;

        const event = { ...action.payload.event };

        const { newState, newMarkers } = cloneMarker(state,
            event.marker,
            { cloneEventList : true });

        const marker = newMarkers[0];

        /**
         * Desired position of the event
         * @type {number}
         */
        const eventPosition = payload.position === -1 || typeof payload.position === 'undefined'
            ? marker.events.length
            : payload.position;

        // Add the event to the list of events of the marker at the desired position
        marker.events.splice(eventPosition, 0, event.uuid);

        // Declaring the event
        newState.events = { ...newState.events };
        newState.events[event.uuid] = event;

        return newState;
    }

    case ADD_MARKER: {
        const markers = state.markers.slice(0);
        const payload = action.payload;

        const position = typeof payload.position === 'undefined' ? markers.length : payload.position;

        const marker = {
            events : [],
            ...payload.marker,
        };

        markers.splice(position, 0, marker);

        return {
            ...state,
            markers,
        };
    }

    case LOAD_TIMELINE:
        return action.payload.timeline;

    case MOVE_EVENT: {
        const payload = action.payload;

        let event = state.events[payload.event];

        // Cloning both origin and destination markers
        const markersToClone = [event.marker];

        // If the destination marker is not the same, then we clone this one too
        if (payload.marker && event.marker !== payload.marker) {
            markersToClone.push(payload.marker);
        }

        // Cloning origin and destination markers
        const clonedMarker = cloneMarker(state, markersToClone, { cloneEventList : true });

        let newState = clonedMarker.newState;
        const newMarkers = clonedMarker.newMarkers;

        const originMarker = newMarkers[0];
        const destinationMarker = newMarkers[1];

        const eventOriginIndex = originMarker.events.indexOf(event.uuid);

        // If the origin and destination marker are the same, then we simply move the event
        if (!destinationMarker) {
            originMarker.events = moveInArray(originMarker.events,
                eventOriginIndex,
                payload.position);
        } else {
            // Removing the event from the origin
            originMarker.events.splice(eventOriginIndex, 1);

            // Adding the event to the destination
            destinationMarker.events.splice(payload.position, 0, event.uuid);

            const cloneResult = cloneEvent(newState, event.uuid);
            newState = cloneResult.newState;
            event = cloneResult.event;
            event.marker = destinationMarker.uuid;
        }

        return newState;
    }

    case MOVE_MARKER:
        return {
            ...state,
            markers : moveInArray(state.markers,
                getMarkerIndex(state, action.payload.marker),
                action.payload.position),
        };

    case REMOVE_EVENT: {
        const uuid = action.payload.uuid;

        const event = state.events[uuid];

        const {
            newState,
            newMarkers,
        } = cloneMarker(state, event.marker, { cloneEventList : true });
        const marker = newMarkers[0];

        marker.events = marker.events.filter(e => e !== uuid);

        // Cloning the list of all events
        newState.events = { ...newState.events };

        // Removing the event from the list of events
        delete newState.events[uuid];

        return newState;
    }

    case REMOVE_MARKER: {
        /** @type {number} */
        const markerIndex = getMarkerIndex(state, action.payload.marker);

        /** @type {ReduxStore.Timeline.Marker} */
        const marker = state.markers[markerIndex];

        const events = { ...state.events };

        // Removing all events of the marker
        for (const event of marker.events) {
            delete events[event];
        }

        return {
            ...state,
            events,
            markers : state.markers.filter(m => m.uuid !== action.payload.marker),
        };
    }

    case RENAME_MARKER: {
        const { newState, newMarkers } = cloneMarker(state, action.payload.marker);
        const marker = newMarkers[0];

        marker.label = action.payload.label;

        return newState;
    }

    case UPDATE_EVENT: {
        const { newState, event } = cloneEvent(state, action.payload.uuid);
        const newData = action.payload.data;

        event.illustrationURL = newData.illustrationURL || '';
        event.description = newData.description;
        event.label = newData.label;
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
    const newState = {
        events : { ...state.events },
        ...state,
    };

    // eslint-disable-next-line no-param-reassign
    state.events[uuid] = { ...state.events[uuid] };

    return {
        event : state.events[uuid],
        newState,
    };
}

/**
 *
 * @param {ReduxStore.Timeline} state
 * @param {string|string[]}     uuid       - UUID of the marker to clone
 * @param {boolean}             cloneEventList
 * @returns {{newState: ReduxStore.Timeline, marker: ReduxStore.Timeline.Marker[]}}
 */
function cloneMarker(state, uuid, { cloneEventList = false } = {}) {
    const uuidList = typeof uuid === 'string'
        ? [uuid]
        : uuid;

    const markers = state.markers.slice(0);

    const newMarkers = uuidList.map((id) => {
        const markerIndex = getMarkerIndex(state, id);

        // Cloning the marker
        const marker = Object.assign({}, markers[markerIndex]);

        if (cloneEventList) {
            marker.events = marker.events.slice(0);
        }

        // Updating the state
        markers[markerIndex] = marker;

        return marker;
    });

    const newState = {
        ...state,
        markers,
    };

    return {
        newState,
        newMarkers,
    };
}

/**
 * Move an array element from one position to another
 * @param {Array} array
 * @param {number} oldPosition - Old position of the event
 * @param {number} newPosition - New position of the event
 */
function moveInArray(array, oldPosition, newPosition) {
    const newArray = array.slice(0);

    // Code inspired by :
    // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    newArray.splice(newPosition, 0, array.splice(oldPosition, 1)[0]);

    return newArray;
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

// ============================================================
// Exports
export default reducer;

export {
    addEvent
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
    , LIST_MODIFIERS,
};
