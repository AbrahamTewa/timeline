// ============================================================
// Import packages

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// ============================================================
// Module constants and variables

let initialized = false;

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
