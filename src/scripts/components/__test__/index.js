import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

let initialized = false;

function initializeEnzyme() {
    beforeAll(() => {

        if (initialized) {
            return;
        }

        initialized = true;
        configure({ adapter: new Adapter() });
    });
}

export {initializeEnzyme};
