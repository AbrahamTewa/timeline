// ============================================================
// Import modules
import { CONNECT_STATUS } from '../constants';

import {
    actionCreator as disconnect,
    reducer,
} from './disconnect';

import {
    buildState,
} from './testHelpers';


describe('redux/authentication/disconnect', () => {
    describe('Action creator', () => {
        it('Return an action', () => {
            // Expected action
            const expectedAction = undefined;

            // Result action
            const action = disconnect();

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
                status   : CONNECT_STATUS.DISCONNECTED,
            };

            // Result state
            const action = disconnect();
            const resultState = reducer(state, action);

            // Assertions
            expect(resultState).toEqual(expectedState);
        });
    });
});
