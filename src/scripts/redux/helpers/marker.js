import {getCurrentState} from '..';

/**
 *
 * @param {string}      uuid   - UUID of the marker
 * @param {ReduxStore} [state] - State where to look for the marker, or the current state
 * @returns {ReduxStore.Timeline.Marker}
 */
function getMarker(uuid, state) {
    state = state || getCurrentState();
    return state.timeline.markers.filter(marker => marker.uuid === uuid)[0];
}

export {getMarker};
