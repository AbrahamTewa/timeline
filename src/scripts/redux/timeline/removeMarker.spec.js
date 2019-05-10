/* eslint-env node, jest */
import uuidV4 from 'uuid/v4';

// ============================================================
// Import modules
import {
    actionCreator as removeMarker,
    reducer,
} from './removeMarker';

import {
    buildState,
} from './testHelpers';

// ============================================================
// Tests
describe('Action creator', () => {
    it('Return an action', () => {
        const marker = uuidV4();

        // Expected action
        const expectedAction = { marker };

        // Result action
        const action = removeMarker({ marker });

        // Assertions
        expect(action).toEqual(expectedAction);
    });
});

describe('Reducer', () => {
    it('Should throw an error if marker doesn\'t exists', () => {
        const state = buildState();

        const marker = 'Fake marker id';

        const action = removeMarker({ marker });

        expect(() => reducer(state, action)).toThrow('Marker not found');
    });

    it('Should remove the last marker without events', () => {
        const state = buildState(1);

        // Expected state
        const expectedState = {
            ...state,
            markers : [],
        };

        // Result state
        const marker = state.markers[0].uuid;
        const action = removeMarker({ marker });
        const resultState = reducer(state, action);

        // Assertions
        expect(resultState).toEqual(expectedState);
    });

    it('Should remove the last marker containing events', () => {
        const state = buildState([3]);

        // Expected state
        const expectedState = {
            ...state,
            markers : [],
            events  : {},
        };

        // Result state
        const marker = state.markers[0].uuid;
        const action = removeMarker({ marker });
        const resultState = reducer(state, action);

        // Assertions
        expect(resultState).toEqual(expectedState);
    });

    it('Should remove the a marker containing events', () => {
        const state = buildState([1, 3]);

        // Expected state
        const expectedState = {
            ...state,
            markers : [
                state.markers[1],
            ],
            events : {
                ...state.events,
            },
        };

        delete expectedState.events[state.markers[0].events[0]];

        // Result state
        const marker = state.markers[0].uuid;
        const action = removeMarker({ marker });
        const resultState = reducer(state, action);

        // Assertions
        expect(resultState).toEqual(expectedState);
    });
});
