// ============================================================
// Import modules
import { getMarkerIndex } from './helpers';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'timeline.REMOVE_MARKER';

// ============================================================
// Functions

/**
 * @typedef {Object} StoreAction.Timeline.RemoveMarker
 * @property {string} marker - UUID of the marker to remove
 */

/**
 * @param {string} marker - UUID of the marker to remove
 * @returns {StoreAction.Timeline.RemoveMarker}
 */
function actionCreator({ marker }) {
    return {
        marker,
    };
}

/**
 *
 * @param {ReduxStore} state
 * @param {string}     marker - UUID of the marker to remove
 */
function reducer(state, { marker : markerUUID }) {
    /** @type {number} */
    const markerIndex = getMarkerIndex(state, markerUUID);

    if (markerIndex < 0) {
        throw new Error('Marker not found');
    }

    /** @type {ReduxStore.Timeline.Marker} */
    const marker = state.markers[markerIndex];

    const events = { ...state.events };

    // Removing all events of the marker
    marker.events.forEach((event) => {
        delete events[event];
    });

    return {
        ...state,
        events,
        markers : state.markers.filter(m => m.uuid !== markerUUID),
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
