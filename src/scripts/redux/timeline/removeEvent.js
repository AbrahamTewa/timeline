// ============================================================
// Import modules
import {
    cloneMarker,
    getEvent,
} from './helpers';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'timeline.REMOVE_EVENT';

// ============================================================
// Functions
/**
 * @typedef {Object} StoreAction.Timeline.RemoveEvent
 * @property {Object} payload
 * @property {string} payload.uuid  - UUID of the event to remove
 */

/**
 *
 * @param {string} uuid - UUID of the event to remove
 * @returns {StoreAction.Timeline.RemoveEvent}
 */
function actionCreator({ uuid }) {
    return { uuid };
}

/**
 * @param {ReduxStore} state
 * @param {string}     uuid  - UUID of the event to remove
 */
function reducer(
    state,
    {
        uuid,
    },
) {
    const event = getEvent(state, uuid);

    if (!event) {
        throw new Error('Event not found');
    }

    const {
        newState,
        newMarkers,
    } = cloneMarker(state, [event.marker], { cloneEventList : true });

    const marker = newMarkers[0];

    marker.events = marker.events.filter(e => e !== uuid);

    // Cloning the list of all events
    newState.events = { ...newState.events };

    // Removing the event from the list of events
    delete newState.events[uuid];

    return newState;
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
