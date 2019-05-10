/* eslint-env node, jest */
import uuidV4 from 'uuid/v4';

// ============================================================
// Import modules
import {
    actionCreator as moveMarker,
    reducer,
} from './moveMarker';

import {
    buildState,
} from './testHelpers';

// ============================================================
// Tests

describe('Action creator', () => {
    it('return an action', () => {
        const marker = uuidV4();
        const position = 5;

        // Expected action
        const expectedAction = {
            marker,
            position,
        };

        // Result action
        const action = moveMarker({ marker, position });

        // Assertion
        expect(action).toEqual(expectedAction);
    });

    it('throw an exception if position is not a positive integer', () => {
        expect(() => moveMarker({ position : undefined })).toThrow('Invalid position');
        expect(() => moveMarker({ position : -1 })).toThrow('Invalid position');
        expect(() => moveMarker({ position : 0.5 })).toThrow('Invalid position');
        expect(() => moveMarker({ position : '10' })).toThrow('Invalid position');

        // 0 is a valid value
        expect(() => moveMarker({ position : 0 })).not.toThrow();
        expect(() => moveMarker({ position : 10 })).not.toThrow();
    });
});

describe('Reducer', () => {
    it('Should throw an error if the marker don\'t exists', () => {
        const state = buildState(2);

        const fakeMarkerId = 'fake event id';

        const action = moveMarker({
            marker   : fakeMarkerId,
            position : 0,
        });

        expect(() => reducer(state, action)).toThrow('Marker not found');
    });

    it('Should throw an error if position is invalid', () => {
        let action;
        let state = buildState(1);
        let marker = state.markers[0].uuid;

        // The only valid position is 0 (0 marker in state)
        action = moveMarker({ marker, position : 0 });
        expect(() => reducer(state, action))
            .not.toThrow();

        // The position 1 is invalid (0 marker in state)
        action = moveMarker({ marker, position : 1 });
        expect(() => reducer(state, action))
            .toThrow('Invalid position');

        state = buildState(2);
        marker = state.markers[0].uuid;

        // The valid positions are 0 and 1
        action = moveMarker({ marker, position : 0 });
        expect(() => reducer(state, action))
            .not.toThrow();

        action = moveMarker({ marker, position : 1 });
        expect(() => reducer(state, action))
            .not.toThrow();

        // The position 2 is invalid (1 marker in state)
        action = moveMarker({ marker, position : 2 });
        expect(() => reducer(state, action))
            .toThrow('Invalid position');
    });

    it('Moving marker at the beginning', () => {
        const state = buildState(3);

        const marker = state.markers[1].uuid;

        // Expected state
        const expectedState = {
            ...state,
            markers : [
                state.markers[1],
                state.markers[0],
                state.markers[2],
            ],
        };

        // Result state

        const action = moveMarker({ marker, position : 0 });
        const resultState = reducer(state, action);

        expect(resultState).toEqual(expectedState);
    });

    it('Moving marker at the end', () => {
        const state = buildState(3);

        const marker = state.markers[1].uuid;

        // Expected state
        const expectedState = {
            ...state,
            markers : [
                state.markers[0],
                state.markers[2],
                state.markers[1],
            ],
        };

        // Result state
        const action = moveMarker({ marker, position : 2 });
        const resultState = reducer(state, action);

        expect(resultState).toEqual(expectedState);
    });
});
