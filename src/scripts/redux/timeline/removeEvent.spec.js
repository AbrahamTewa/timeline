/* eslint-env node, jest */
import uuidV4 from 'uuid/v4';

// ============================================================
// Import modules
import {
    actionCreator as removeEvent,
    reducer,
} from './removeEvent';

import {
    buildState,
} from './testHelpers';

// ============================================================
// Tests

describe('Action creator', () => {
    it('return the uuid of the event to remove', () => {
        const uuid = uuidV4();

        // Expected action
        const expectedAction = { uuid };

        // Result action
        const action = removeEvent({ uuid });

        // Assertion
        expect(action).toEqual(expectedAction);
    });
});

describe('Reducer', () => {
    it('throw an exception if the event doesn\'t exists', () => {
        const state = buildState();

        const eventId = 'Fake event id';

        const action = removeEvent({ uuid : eventId });

        expect(() => reducer(state, action)).toThrow('Event not found');
    });

    it('Empty a marker', () => {
        const state = buildState([1]);

        // Expected state
        const expectedState = {
            ...state,
            markers : [{
                ...state.markers[0],
                events : [],
            }],
            events : {},
        };

        // Result state
        const eventId = state.markers[0].events[0];
        const action = removeEvent({ uuid : eventId });
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });

    it('Remove an event', () => {
        const state = buildState([3]);

        // Expected state
        const expectedState = {
            ...state,
            markers : [{
                ...state.markers[0],
                events : [
                    state.markers[0].events[0],
                    state.markers[0].events[2],
                ],
            }],
            events : {
                ...state.events,
            },
        };

        delete expectedState.events[state.markers[0].events[1]];

        // Resulted state
        const eventId = state.markers[0].events[1];
        const action = removeEvent({ uuid : eventId });
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });
});
