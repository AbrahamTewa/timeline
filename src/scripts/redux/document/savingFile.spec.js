// ============================================================
// Import modules
import { SAVE_STATUS } from '../constants';

import {
    actionCreator as savingFile,
    reducer,
} from './savingFile';

import {
    buildState,
} from './testHelpers';

// ============================================================
// Tests
describe('redux/document/savingFile', () => {
    describe('Action creator', () => {
        it('Return an action', () => {
            // Expected action
            const expectedAction = undefined;

            // Result action
            const action = savingFile();

            // Assertions
            expect(action).toEqual(expectedAction);
        });
    });

    describe('Reducer', () => {
        it('should declare the file as currently saving', () => {
            const state = buildState();

            // Expected state
            const expectedState = {
                ...state,
                saveStatus : SAVE_STATUS.SAVING,
            };

            // Result state
            const action = savingFile();
            const resultState = reducer(state, action);

            // Assertions
            expect(resultState).toEqual(expectedState);
        });
    });
});
