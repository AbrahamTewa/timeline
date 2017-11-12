/* eslint-env node, jest */

// ============================================================
// Import packages
import faker from 'faker';

// ============================================================
// Import modules

import {generateLabel,
        generateText} from '../../test_helpers';
import {getStore, configureStore} from '..';
import * as Timeline from '../timeline';

// ============================================================
// Tests
describe('timeline', () => {

    describe('Helpers', ()=> {
        it('Nothing', ()=> {
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
    let action;
    let event;

    action  = Timeline.addEvent(getNewEventData(marker, label));
    event = action.payload.event;

    getStore().dispatch(action);
    return event;
}

/**
 *
 * @param {string} [label]
 * @returns {ReduxStore.Timeline.Marker}
 */
function addMarkerToStore(label) {
    let action;
    let marker;

    action = Timeline.addMarker({label: label || generateMarkerLabel()});
    marker = action.payload.marker;

    getStore().dispatch(action);
    return {events: [], ...marker};
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
    return { description     : generateText(4)
           , illustrationURL : faker.internet.avatar()
           , label           : label || generateLabel(5)
           , marker          : markerUUID};
}

function overrideStore(state) {

    let store;
    store = getStore();

    store.replaceReducer(function() {
        return state;
    });

    store.dispatch({type: 'reset'});
}

function resetStore() {
    let state;

    state = { events : {}
            , markers: []};

    configureStore({timeline: state});
}

// ============================================================
// Exports
export { addEventToStore
       , addMarkerToStore
       , generateMarkerLabel
       , getNewEventData
       , overrideStore
       , resetStore };
