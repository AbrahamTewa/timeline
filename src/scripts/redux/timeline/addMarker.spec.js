/* eslint-env node, jest */
// ============================================================
// Import modules
import {
    actionCreator as addMarker,
    reducer,
} from './addMarker';

import {
    buildState,
} from './testHelpers';

import {
    generateMarkerLabel,
} from '../../testHelpers';

// ============================================================
// Tests

describe('Action creator', () => {
    it('return an action', () => {
        const label = generateMarkerLabel();
        const position = 5;

        // Result
        const action = addMarker({ label, position });

        // Expected
        const expectedAction = {
            marker : {
                label,
                uuid : action.marker.uuid,
            },
            position,
        };

        // Assertion
        expect(action).toEqual(expectedAction);
        expect(typeof action.marker.uuid).toEqual('string');
    });

    it('Position is not mandatory', () => {
        const label = generateMarkerLabel();

        // Result
        const action = addMarker({ label });

        // Expected
        const expectedAction = {
            marker : {
                label,
                uuid : action.marker.uuid,
            },
        };

        // Assertion
        expect(action).toEqual(expectedAction);
        expect(typeof action.marker.uuid).toEqual('string');
    });

    it('throw an exception if position is not a valid number', () => {
        expect(() => addMarker({ position : -1 })).toThrow('Invalid position');
        expect(() => addMarker({ position : 0.5 })).toThrow('Invalid position');
        expect(() => addMarker({ position : '10' })).toThrow('Invalid position');

        expect(() => addMarker({ position : 0 })).not.toThrow();
        expect(() => addMarker({ position : undefined })).not.toThrow();
        expect(() => addMarker({ position : 10 })).not.toThrow();
    });
});

describe('Reducer', () => {
    it('Add marker to an empty store', () => {
        const state = buildState([]);

        const label = generateMarkerLabel();
        const action = addMarker({ label });

        // Expected state
        const expectedState = {
            ...state,
            markers : [{
                events : [],
                label,
                uuid   : action.marker.uuid,
            }],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertions
        expect(resultState).toEqual(expectedState);
    });

    it('Add marker in the beginning of markers', () => {
        const state = buildState([0, 0, 0]);

        const label = generateMarkerLabel();
        const action = addMarker({ label, position : 0 });

        // Expected state
        const expectedState = {
            ...state,
            markers : [
                {
                    events : [],
                    label,
                    uuid   : action.marker.uuid,
                },
                ...state.markers,
            ],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });

    it('Add marker in the middle of markers', () => {
        // Creating initial state
        const state = buildState([0, 0, 0]);

        const label = generateMarkerLabel();
        const action = addMarker({ label, position : 1 });

        // Expected state
        const expectedState = {
            ...state,
            markers : [
                state.markers[0],
                {
                    events : [],
                    label,
                    uuid   : action.marker.uuid,
                },
                state.markers[1],
                state.markers[2],
            ],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });

    it('Add marker in the end of markers', () => {
        // Creating initial state
        const state = buildState([0, 0, 0]);

        const label = generateMarkerLabel();
        const action = addMarker({ label, position : 3 });

        // Expected state
        const expectedState = {
            ...state,
            markers : [
                state.markers[0],
                state.markers[1],
                state.markers[2],
                {
                    events : [],
                    label,
                    uuid   : action.marker.uuid,
                },
            ],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });
});
