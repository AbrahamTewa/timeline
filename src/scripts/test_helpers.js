// ============================================================
// Import packages
import faker from 'faker';
import renderer from 'react-test-renderer';

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

function snapshot(component) {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
}

// ============================================================
// Exports
export {generateLabel,
        generateText,
        snapshot};
