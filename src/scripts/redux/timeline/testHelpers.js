// ============================================================
// Import modules
import * as store from './main';
import {
    generateEventLabel,
    generateMarkerLabel,
} from '../../testHelpers';

// ============================================================
// Functions
/**
 *
 * @param {string} [label]
 * @returns {ReduxStore.Timeline.Marker}
 */
function addMarkerToState(state, label) {
    const action = store.addMarker({ label });
    return store.reducer(state, action);
}

/**
         * @returns {ReduxStore.Timeline}
         */
function buildState(markers = 0) {
    let state = getInitialState();
    let markerList;

    if (typeof markers === 'number') {
        markerList = new Array(markers);
        markerList.fill(0, 0, markers);
    }
    else {
        markerList = markers;
    }

    // Add marker
    markerList.forEach((nbEvents) => {
        const addMarkerAction = store.addMarker({ label : generateMarkerLabel() });
        state = store.reducer(state, addMarkerAction);
        const markerId = addMarkerAction.payload.marker.uuid;

        for (let i = 0; i < nbEvents; i += 1) {
            const addEventAction = store.addEvent({
                label  : generateEventLabel(),
                marker : markerId,
            });

            state = store.reducer(state, addEventAction);
        }
    });

    return state;
}

function getInitialState() {
    return {
        events  : {},
        markers : [],
    };
}

// ============================================================
// Exports
export {
    addMarkerToState,
    buildState,
    getInitialState,
};
