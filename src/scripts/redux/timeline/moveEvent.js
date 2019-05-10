// ============================================================
// Import modules
import {
    cloneEvent,
    cloneMarker,
    existsMarker,
    getEvent,
} from './helpers';
import { moveInArray } from '../../helpers';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'timeline.MOVE_EVENT';

// ============================================================
// Functions

/**
 * @typedef {Object} StoreAction.Timeline.MoveEvent
 * @property {string} event    - UUID of the event to move
 * @property {string} marker   - Marker when the event has been moved
 * @property {number} position - Position in the marker event list of the event
 */

/**
 * Create an action that will move an event to a new position inside a marker.
 * If no marker is provided, then the event will move inside the same marker.
 *
 * @param {string} event    - UUID of the event to move
 * @param {string} [marker] - UUID of the destination marker.
 *                            If undefined, then the event will be moved inside of its actual marker
 * @param {number} position - New position of the event
 * @returns {StoreAction.Timeline.MoveEvent}
 */
function actionCreator({ event, marker, position }) {
    // Checking that the position is valid exists
    if (!Number.isInteger(position) || position < 0) {
        throw new Error(`Invalid position: ${position}`);
    }

    return {
        event,
        marker,
        position,
    };
}

/**
 * @param {ReduxStore} state
 * @param {string}     event    - UUID of the event to move
 * @param {string}     [marker] - UUID of the destination marker
 * @param {number}     position - New position of the event
 */
function reducer(
    state,
    {
        event : eventUUID,
        marker,
        position,
    },
) {
    let event = getEvent(state, eventUUID);

    // Checking that the event exists
    if (!event) {
        throw new Error(`Event not found: ${eventUUID}`);
    }

    // Cloning both origin and destination markers
    const markersToClone = [event.marker];

    // If the destination marker is not the same, then we clone this one too
    if (marker && event.marker !== marker) {
        // Checking that the marker exists
        if (!existsMarker(state, event.marker)) {
            throw new Error(`Marker not found: ${event.marker}`);
        }

        markersToClone.push(marker);
    }

    // Cloning origin and destination markers
    const clonedMarker = cloneMarker(state, markersToClone, { cloneEventList : true });

    let newState = clonedMarker.newState;
    const newMarkers = clonedMarker.newMarkers;

    const originMarker = newMarkers[0];
    const destinationMarker = newMarkers[1] || originMarker;

    const eventOriginIndex = originMarker.events.indexOf(event.uuid);

    // Ensuring that the position is available in destination marker
    if (position > destinationMarker.events.length) {
        throw new Error(`Invalid destination position: ${position}`);
    }

    // If the origin and destination marker are the same, then we simply move the event
    if (originMarker === destinationMarker) {
        originMarker.events = moveInArray(originMarker.events,
            eventOriginIndex,
            position);
    }
    else {
        // Removing the event from the origin
        originMarker.events.splice(eventOriginIndex, 1);

        // Adding the event to the destination
        destinationMarker.events.splice(position, 0, event.uuid);

        const cloneResult = cloneEvent(newState, event.uuid);
        newState = cloneResult.newState;
        event = cloneResult.event;
        event.marker = destinationMarker.uuid;
    }

    return newState;
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
