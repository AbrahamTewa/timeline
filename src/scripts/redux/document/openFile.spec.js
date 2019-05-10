// ============================================================
// Import modules
import { SAVE_STATUS } from '../constants';

import {
    actionCreator as openFile,
    reducer,
} from './openFile';

import {
    buildState,
} from './testHelpers';

// ============================================================
// Tests
describe('Action creator', () => {
    it('Return an action', () => {
        const fileId = 'Document\'s file id';

        // Expected action
        const expectedAction = {
            fileId,
        };

        // Result action
        const action = openFile({ fileId });

        // Assertions
        expect(action).toEqual(expectedAction);
    });
});

describe('Reducer', () => {
    it('Return a saved state', () => {
        const state = buildState();
        const fileId = 'Document\'s file id';

        // Expected state
        const expectedState = {
            fileId,
            saveStatus : SAVE_STATUS.SAVED,
        };

        // Result state
        const action = openFile({ fileId });
        const resultState = reducer(state, action);

        // Assertions
        expect(resultState).toEqual(expectedState);
    });
});
