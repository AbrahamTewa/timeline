// ============================================================
// Functions

/**
 * Create a new state with the given event cloned.
 * Will throw an exception if the event is not found.
 * @param {ReduxStore.Timeline} state
 * @param {string} uuid
 * @returns {{newState: ReduxStore.Timeline, event: ReduxStore.Timeline.Event}}
 */
function cloneEvent(state, uuid) {
    if (!state.events[uuid]) {
        throw new Error(`Event not found: ${uuid}`);
    }

    const newState = {
        events : { ...state.events },
        ...state,
    };

    newState.events[uuid] = { ...state.events[uuid] };

    return {
        event : state.events[uuid],
        newState,
    };
}


/**
 * Clone the given markers.
 * This function will create a new state with the cloned markers.
 * It will return an object with the new state and the cloned markers.
 * Will throw an error if the marker is not found
 *
 * @param {ReduxStore.Timeline} state
 * @param {string|string[]}     uuid       - UUID of the marker to clone
 * @param {boolean}             cloneEventList
 * @returns {{newState: ReduxStore.Timeline, marker: ReduxStore.Timeline.Marker[]}}
 */
function cloneMarker(state, uuid, { cloneEventList = false } = {}) {
    const uuidList = typeof uuid === 'string'
        ? [uuid]
        : uuid;

    const markers = state.markers.slice(0);

    const newMarkers = uuidList.map((id) => {
        const markerIndex = getMarkerIndex(state, id);

        if (markerIndex < 0) {
            throw new Error('Marker not found');
        }

        // Cloning the marker
        const marker = Object.assign({}, markers[markerIndex]);

        if (cloneEventList) {
            marker.events = marker.events.slice(0);
        }

        // Updating the state
        markers[markerIndex] = marker;

        return marker;
    });

    const newState = {
        ...state,
        markers,
    };

    return {
        newState,
        newMarkers,
    };
}

/**
 * Indicate if a marker exists or not
 * @param {ReduxStore} state
 * @param {string}     uuid
 * @returns {boolean}
 * @public
 */
function existsMarker(state, uuid) {
    return Boolean(state.markers.find(marker => marker.uuid === uuid));
}

/**
 * Return an event
 * @param {string}              uuid    - UUID of the event
 * @param {ReduxStore.Timeline} [state] - State where to look for the event, or the current state
 * @returns {ReduxStore.Timeline.Event}
 */
function getEvent(state, uuid) {
    return state.events[uuid];
}

/**
 * Return a marker
 * @param {string}              uuid  - UUID of the marker
 * @param {ReduxStore.Timeline} state - State where to look for the marker, or the current state
 * @returns {ReduxStore.Timeline.Marker}
 * @public
 */
function getMarker(state, uuid) {
    return state.markers.find(marker => marker.uuid === uuid);
}

/**
 * Return the total counts of markers
 * @param {ReduxStore.Timeline} state
 * @returns {ReduxStore.Timeline.Marker}
 * @public
 */
function countMarkers(state) {
    return state.markers.length;
}

/**
 *
 * @param {ReduxStore.Timeline} state
 * @param {string}              uuid
 * @returns {number}
 */
function getMarkerIndex(state, uuid) {
    return state.markers.findIndex(marker => marker.uuid === uuid);
}

/**
 * Return the list of all UUID markers
 * @param {ReduxStore.Timeline} [state] - State where to look for the marker, or the current state
 * @return {string[]}
 */
function listMarkersUUID(state) {
    return state.markers.map(({ uuid }) => uuid);
}

// ============================================================
// Exports

export {
    cloneEvent,
    cloneMarker,
    countMarkers,
    existsMarker,
    getEvent,
    getMarker,
    getMarkerIndex,
    listMarkersUUID,
};
