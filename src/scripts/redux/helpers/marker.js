// ============================================================
// Import modules
import { getCurrentState } from '..';

// ============================================================
// Functions
/**
 *
 * @param {string}      uuid   - UUID of the marker
 * @param {ReduxStore} [state] - State where to look for the marker, or the current state
 * @returns {ReduxStore.Timeline.Marker}
 */
function getMarker(uuid, state) {
    const currentState = state || getCurrentState();
    return currentState.timeline.markers.filter(marker => marker.uuid === uuid)[0];
}

/**
 * Return the list of all UUID markers
 * @param {ReduxStore} [state] - State where to look for the marker, or the current state
 * @return {string[]}
 */
function listMarkersUUID(state) {
    const currentState = state || getCurrentState();
    return currentState.timeline.markers.map(({ uuid }) => uuid);
}

// ============================================================
// Exports
export { 
    getMarker,
    listMarkersUUID,
};
