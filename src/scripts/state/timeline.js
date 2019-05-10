import {
    getCurrentState,
    timeline,
} from '../redux';

// ============================================================
// Functions
/**
 * @param {string} marker - UUID of the marker to retrieve
 * @returns {ReduxStore.Timeline.Marker}
 */
function getMarker(marker) {
    const state = getCurrentState();
    return timeline.getMarker(state, marker);
}

// ============================================================
// Exports
export {
    getMarker,
};
