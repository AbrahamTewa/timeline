// ============================================================
// Import modules
import { SAVE_STATUS } from '../constants';

import {
    actionCreator as savedFile,
    reducer,
} from './savedFile';

import {
    buildState,
} from './testHelpers';

// ============================================================
// Tests
describe('redux/document/openFile', () => {
    describe('Action creator', () => {
        it('Return an action', () => {
            const fileId = 'Document\'s file id';

            // Expected action
            const expectedAction = {
                fileId,
            };

            // Result action
            const action = savedFile({ fileId });

            // Assertions
            expect(action).toEqual(expectedAction);
        });
    });

    describe('Reducer', () => {
        it('Update the file status', () => {
            const state = buildState();
            const fileId = 'Document\'s file id';

            // Expected state
            const expectedState = {
                ...state,
                fileId,
                saveStatus : SAVE_STATUS.SAVED,
            };

            // Result state
            const action = savedFile({ fileId });
            const resultState = reducer(state, action);

            // Assertions
            expect(resultState).toEqual(expectedState);
        });
    });
});
