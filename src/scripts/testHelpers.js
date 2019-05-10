/* eslint-disable import/no-extraneous-dependencies */
// ============================================================
// Import packages
import faker from 'faker';
import renderer from 'react-test-renderer';

// ============================================================
// Import modules
import {
    getStore,
    timeline,
} from './redux';

// ============================================================
// Functions

/**
 * Generate a label of several words.
 * The number of words will be between 1 and maxWords.
 * @param {number} maxWords
 * @returns {string}
 */
function generateLabel(maxWords = 5) {
    return faker.lorem.words(faker.random.number(maxWords));
}

function generateEventLabel() {
    return generateLabel();
}

/**
 * Generate a label of several paragraph.
 * The number of words will be between 1 and maxParagraph.
 * @param {number} maxParagraph
 * @returns {string}
 */
function generateText(maxParagraph) {
    return faker.lorem.text(faker.random.number(maxParagraph));
}

function snapshot(component) {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
}

/**
 * Create a new event and add it to the store.
 * @param {string} marker  - UUID of the event marker
 * @param {string} [label] - Label of the event to create
 * @returns {ReduxStore.Timeline.Event}
 */
function addEventToStore(marker, label) {
    const action = timeline.addEvent(getNewEventData(marker, label));
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
    const action = timeline.addMarker({ label : label || generateMarkerLabel() });
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


// ============================================================
// Exports
export {
    // Generators
    generateEventLabel,
    generateLabel,
    generateMarkerLabel,
    generateText,

    // Helpers
    addEventToStore,
    addMarkerToStore,
    getNewEventData,
    overrideStore,
    snapshot,
};
