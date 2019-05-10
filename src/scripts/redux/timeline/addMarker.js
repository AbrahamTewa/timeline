// ============================================================
// Import packages
import uuidV4 from 'uuid';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'timeline.ADD_MARKER';

// ============================================================
// Functions

/**
 * @typedef {Object} StoreAction.Timeline.AddMarker
 * @property {StoreAction.Timeline.AddMarkerData} marker
 * @property {number}                             position - Position of the marker
 */

/**
  * @typedef {Object} StoreAction.Timeline.AddMarkerData
  * @param {?string} label - Label of the marker
  * @param {string}  uuid  - UUID of the marker to add
  */

/**
 *
 * @param {string} label - Label of the marker
 * @param {number} [position]
 * @returns {StoreAction.Timeline.AddMarker}
 */
function actionCreator({ label, position }) {
    if (typeof position !== 'undefined') {
        if (!Number.isInteger(position) || position < 0) {
            throw new Error('Invalid position');
        }
    }

    return {
        marker : {
            label,
            uuid : uuidV4(),
        },
        position,
    };
}

/**
 *
 * @param {ReduxState}                         state
 * @param {StoreAction.Timeline.AddMarkerData} marker     - Marker to add
 * @param {number}                             [position] - Position of the marker
 */
function reducer(state, { marker, position }) {
    /** @type {number} */
    const nbMarkers = state.markers.length;

    if (typeof position === 'number' && position > nbMarkers) {
        throw new Error('Invalid position');
    }

    const markers = state.markers.slice(0);

    const markerPosition = typeof position === 'undefined'
        ? markers.length
        : position;

    const newMarker = {
        events : [],
        label  : marker.label,
        uuid   : marker.uuid,
    };

    // Adding the marker to the list at the given position
    markers.splice(markerPosition, 0, newMarker);

    return {
        ...state,
        markers,
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
