/* eslint-env node, jest */
import uuidV4 from 'uuid/v4';

// ============================================================
// Import modules
import {
    actionCreator as renameMarker,
    reducer,
} from './renameMarker';

import {
    buildState,
} from './testHelpers';
import { generateMarkerLabel } from '../../testHelpers';

// ============================================================
// Tests

describe('Action creator', () => {
    it('return the action', () => {
        const marker = uuidV4();
        const label = generateMarkerLabel();

        // Expected action
        const expectedAction = { label, marker };

        // Result action
        const action = renameMarker({ label, marker });

        // Assertion
        expect(action).toEqual(expectedAction);
    });
});

describe('Reducer', () => {
    it('Should throw an action if the marker doesn\'t exists', () => {
        const state = buildState();

        const label = generateMarkerLabel();
        const marker = uuidV4();

        const action = renameMarker({ label, marker });

        expect(() => reducer(state, action)).toThrow('Marker not found');
    });

    it('Should rename the marker', () => {
        const state = buildState(1);

        const label = generateMarkerLabel();

        // Expected state
        const expectedState = {
            ...state,
            markers : [{
                ...state.markers[0],
                label,
            }],
        };

        // Result state
        const marker = state.markers[0].uuid;
        const action = renameMarker({ label, marker });
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });
});
