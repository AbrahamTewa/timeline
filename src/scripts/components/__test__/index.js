/* eslint-env node, jest */

// ============================================================
// Import packages

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';


// ============================================================
// Module constants and variables

let initialized = false;

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

function initializeEnzyme() {
    beforeAll(() => {

        if (initialized) {
            return;
        }

        initialized = true;
        configure({ adapter: new Adapter() });
    });
}

// ============================================================
// Exports
export {initializeEnzyme};
