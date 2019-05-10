// ============================================================
// Import modules
import {
    actionCreator as renameFile,
    reducer,
} from './renameFile';

import {
    buildState,
} from './testHelpers';

// ============================================================
// Tests
describe('redux/document/renameFile', () => {
    describe('Action creator', () => {
        it('Return an action', () => {
            const name = 'A new file name';

            // Expected action
            const expectedAction = {
                name,
            };

            // Result action
            const action = renameFile({ name });

            // Assertions
            expect(action).toEqual(expectedAction);
        });
    });

    describe('Reducer', () => {
        it('Return a disconnected state', () => {
            const state = buildState();
            const name = 'Some new file name';

            // Expected state
            const expectedState = {
                ...state,
                name,
            };

            // Result state
            const action = renameFile({ name });
            const resultState = reducer(state, action);

            // Assertions
            expect(resultState).toEqual(expectedState);
        });
    });
});
