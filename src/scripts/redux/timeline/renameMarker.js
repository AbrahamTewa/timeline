// ============================================================
// Import modules
import { cloneMarker } from './helpers';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'timeline.RENAME_MARKER';

// ============================================================
// Functions

/**
 * @typedef {Object} StoreAction.Timeline.RenameMarker
 * @property {Object} payload
 * @property {string} payload.label  - New label
 * @property {string} payload.marker - UUID of the marker to rename
 */

/**
 *
 * @param {string} marker - UUID of the marker to rename
 * @param {string} label  - New marker label
 * @returns {StoreAction.Timeline.RenameMarker}
 */
function actionCreator({ label, marker }) {
    return {
        label,
        marker,
    };
}

/**
 *
 * @param {ReduxStore} state
 * @param {string}     marker - UUID of the marker to rename
 */
function reducer(
    state,
    {
        label,
        marker : markerUUID,
    },
) {
    const { newState, newMarkers } = cloneMarker(state, markerUUID);
    const marker = newMarkers[0];

    marker.label = label;

    return newState;
}
// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
