// ============================================================
// Import modules
import { CONNECT_STATUS } from '../constants';

import {
    actionCreator as disconnecting,
    reducer,
} from './disconnecting';

import {
    buildState,
} from './testHelpers';


describe('redux/authentication/disconnecting', () => {
    describe('Action creator', () => {
        it('Return an action', () => {
            // Expected action
            const expectedAction = undefined;

            // Result action
            const action = disconnecting();

            // Assertions
            expect(action).toEqual(expectedAction);
        });
    });

    describe('Reducer', () => {
        it('Return a disconnected state', () => {
            const state = buildState();

            // Expected state
            const expectedState = {
                signedIn : false,
                status   : CONNECT_STATUS.DISCONNECTING,
            };

            // Result state
            const action = disconnecting();
            const resultState = reducer(state, action);

            // Assertions
            expect(resultState).toEqual(expectedState);
        });
    });
});
