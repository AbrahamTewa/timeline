import {getStore, configureStore} from '..';
import * as Timeline from '../timeline';
import faker from 'faker';

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

    action = Timeline.addMarker(label || generateMarkerLabel());
    marker = action.payload.marker;

    getStore().dispatch(action);
    return marker;
}

function generateMarkerLabel() {
    return faker.lorem.words(faker.random.number(5));
}

/**
 * Create and return an ADD_EVENT payload object.
 * @param {string} markerUUID - UUID of the marker of the event
 * @param {string} [label]    - Label of the event
 * @returns {StoreAction.Timeline.AddEvent}
 */
function getNewEventData(markerUUID, label) {
    return { description     : faker.lorem.text(faker.random.number(4))
           , illustrationURL : faker.internet.avatar()
           , label           : label || faker.lorem.words(faker.random.number(5))
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

export { addEventToStore
       , addMarkerToStore
       , generateMarkerLabel
       , getNewEventData
       , overrideStore
       , resetStore };
