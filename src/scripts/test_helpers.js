// ============================================================
// Import packages
import faker from 'faker';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

// ============================================================
// Module constants and variables

let initialized = false;

// ============================================================
// Functions

/**
 * Generate a label of several words.
 * The number of words will be between 1 and maxWords.
 * @param {number} maxWords
 * @returns {string}
 */
function generateLabel(maxWords=5) {
    return faker.lorem.words(faker.random.number(maxWords));
}

/**
 * Generate a label of several paragraph.
 * The number of words will be between 1 and maxParagraph.
 * @param {number} maxParagraph
 * @returns {string}
 */
function generateText(maxParagraph) {
    return faker.lorem.text(faker.random.number(maxParagraph))
}

/**
 *
 * @param {React.Component} component
 * @returns {element}
 */
function getShallowlyRenderedInstance(component) {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(component);
    return renderer._instance && renderer._instance._instance;
}

function initializeEnzyme() {
    beforeAll(() => {

        if (initialized) {
            return;
        }

        initialized = true;
        configure({ adapter: new Adapter() });
    });
}

function snapshot(component) {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
}

// ============================================================
// Exports
export {generateLabel,
        generateText,
        snapshot,
        initializeEnzyme};
