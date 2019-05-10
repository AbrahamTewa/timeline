// ============================================================
// Import packages
import uuidV4 from 'uuid';

// ============================================================
// Import modules
import {
    cloneMarker,
    getMarker,
} from './helpers';

// ============================================================
// Import packages
const ACTION_TYPE = 'timeline.ADD_EVENT';

// ============================================================
// Functions

/**
 * @typedef {Object} StoreAction.Timeline.AddEvent
 * @property {StoreAction.Timeline.AddEventData} event    - Event information
 * @property {number}                            position - Position of the event
 */

/**
  * @typedef {Object} StoreAction.Timeline.AddEventData
  * @property {string} uuid         - UUID of the event
  * @property {string} description  - Description of the event
  * @property {string} label        - Label of the event
  * @property {string} marker       - UUID of the marker where to add the event
  */

/**
 * @param {string} description - Description of the event
 * @param {string} label       - Label of the event
 * @param {string} marker      - UUID of the marker to which the event will be added
 * @param {number} [position]       - Position where to create the event.
 * @returns {StoreAction.Timeline.AddEvent}
 */
function actionCreator({ label, description, marker }, position) {
    if (typeof position !== 'undefined') {
        if (!Number.isInteger(position) || position < 0) {
            throw new Error('Invalid position');
        }
    }

    return {
        event : {
            uuid : uuidV4(),
            label,
            description,
            marker,
        },
        position,
    };
}

/**
 * @param {ReduxStore}                        state
 * @param {StoreAction.Timeline.AddEventData} event      - Event information
 * @param {number}                            [position] - Position where to add the event
 */
function reducer(state, { event, position }) {
    let marker = getMarker(state, event.marker);

    // Ensuring that the marker exists
    if (!marker) {
        throw new Error('Marker not found');
    }

    // Ensuring that the marker position is valid
    if (typeof position === 'number') {
        if (position > marker.events.length) {
            throw new Error('Invalid position');
        }
    }

    const { newState, newMarkers } = cloneMarker(
        state,
        event.marker,
        { cloneEventList : true },
    );

    marker = newMarkers[0];

    /**
     * Desired position of the event
     * @type {number}
     */
    const eventPosition = position === -1 || typeof position === 'undefined'
        ? marker.events.length
        : position;

    // Add the event to the list of events of the marker at the desired position
    marker.events.splice(eventPosition, 0, event.uuid);

    // Declaring the event
    newState.events = { ...newState.events };
    newState.events[event.uuid] = event;

    return newState;
}

// ============================================================
// Exports

export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
