// ============================================================
// Import modules
import {
    countMarkers,
    getMarkerIndex,
} from './helpers';

import { moveInArray } from '../../helpers';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'timeline.MOVE_MARKER';

// ============================================================
// Functions

/**
 * @typedef {Object} StoreAction.Timeline.MoveMarker
 * @property {Object} payload
 * @property {number} payload.position - New position of the marker
 * @property {string} payload.marker   - UUID of the marker to move
 */

/**
 *
 * @param {string} marker   - UUID of the marker to move
 * @param {number} position - New marker position
 * @returns {StoreAction.Timeline.MoveMarker}
 */
function actionCreator({ marker, position }) {
    if (!Number.isInteger(position) || position < 0) {
        throw new Error('Invalid position');
    }

    return {
        marker,
        position,
    };
}

function reducer(
    state,
    {
        marker : markerUUID,
        position,
    },
) {
    const markerIndex = getMarkerIndex(state, markerUUID);

    if (markerIndex < 0) {
        throw new Error('Marker not found');
    }

    if (position >= countMarkers(state)) {
        throw new Error('Invalid position');
    }

    return {
        ...state,
        markers : moveInArray(
            state.markers,
            markerIndex,
            position,
        ),
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
