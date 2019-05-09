/* eslint-env node, jest */

// ============================================================
// Import packages
import faker from 'faker';

// ============================================================
// Import modules

import {
    generateLabel,
    generateText,
} from '../test_helpers';
import {
    getStore,
    configureStore,
} from '.';
import * as Timeline from './timeline';

// ============================================================
// Tests
xdescribe('timeline', () => {
    describe('Helpers', () => {
        it('Nothing', () => {
            // eslint-disable-next-line jest/valid-expect
            expect(true);
        });
    });
});

// ============================================================
// Functions
/**
 * Create a new event and add it to the store.
 * @param {string} marker  - UUID of the event marker
 * @param {string} [label] - Label of the event to create
 * @returns {ReduxStore.Timeline.Event}
 */
function addEventToStore(marker, label) {
    const action = Timeline.addEvent(getNewEventData(marker, label));
    const event = action.payload.event;

    getStore().dispatch(action);
    return event;
}

/**
 *
 * @param {string} [label]
 * @returns {ReduxStore.Timeline.Marker}
 */
function addMarkerToStore(label) {
    const action = Timeline.addMarker({ label : label || generateMarkerLabel() });
    const marker = action.payload.marker;

    getStore().dispatch(action);
    return { events : [], ...marker };
}

function generateMarkerLabel() {
    return generateLabel(5);
}

/**
 * Create and return an ADD_EVENT payload object.
 * @param {string} markerUUID - UUID of the marker of the event
 * @param {string} [label]    - Label of the event
 * @returns {StoreAction.Timeline.AddEvent}
 */
function getNewEventData(markerUUID, label) {
    return {
        description     : generateText(4),
        illustrationURL : faker.internet.avatar(),
        label           : label || generateLabel(5),
        marker          : markerUUID,
    };
}

function overrideStore(state) {
    const store = getStore();

    store.replaceReducer(() => state);

    store.dispatch({ type : 'reset' });
}

function resetStore() {
    const state = {
        events  : {},
        markers : [],
    };

    configureStore({ timeline : state });
}

// ============================================================
// Exports
export {
    addEventToStore
    , addMarkerToStore
    , generateMarkerLabel
    , getNewEventData
    , overrideStore
    , resetStore,
};
