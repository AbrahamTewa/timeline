/* eslint-env node, jest */
// ============================================================
// Import packages
import uuidV4 from 'uuid/v4';

// ============================================================
// Import modules
import {
    actionCreator as addEvent,
    reducer,
} from './addEvent';

import {
    buildState,
} from './testHelpers';

import {
    getNewEventData,
    generateLabel,
    generateText,
} from '../../testHelpers';

// ============================================================
// Tests

describe('Action creator', () => {
    it('return an action', () => {
        const markerUUID = uuidV4();
        const position = 5;

        const data = {
            label       : generateLabel(),
            description : generateText(),
            marker      : markerUUID,
        };

        // Result
        const action = addEvent(data, position);

        // Expected
        const expectedAction = {
            event : {
                uuid : action.event.uuid,
                ...data,
            },
            position,
        };

        // Assertions
        expect(action).toEqual(expectedAction);
        expect(typeof action.event.uuid).toEqual('string');
    });

    it('Position is not mandatory', () => {
        const markerUUID = uuidV4();

        const data = {
            label       : generateLabel(),
            description : generateText(),
            marker      : markerUUID,
        };

        // Result
        const action = addEvent(data);

        // Expected
        const expectedAction = {
            event : {
                uuid : action.event.uuid,
                ...data,
            },
        };

        // Assertion
        expect(action).toEqual(expectedAction);
        expect(typeof action.event.uuid).toEqual('string');
    });

    it('throw an exception if position is not a valid number', () => {
        expect(() => addEvent({}, -1)).toThrow('Invalid position');
        expect(() => addEvent({}, 0.5)).toThrow('Invalid position');
        expect(() => addEvent({}, '10')).toThrow('Invalid position');

        expect(() => addEvent({}, 10)).not.toThrow();
        expect(() => addEvent({}, 0)).not.toThrow();
    });
});

describe('Reducer', () => {
    it('Add event to an empty marker', () => {
        const state = buildState([0]);

        const markerUUID = state.markers[0].uuid;

        const action = addEvent(
            getNewEventData(markerUUID),
        );
        const event = action.event;

        // Expected state
        const expectedState = {
            events : {
                [event.uuid] : event,
            },
            markers : [{
                ...state.markers[0],
                events : [event.uuid],
            }],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });

    it('Add event at the begining of the list', () => {
        const state = buildState([3]);

        const markerUUID = state.markers[0].uuid;

        const action = addEvent(
            getNewEventData(markerUUID),
            0,
        );
        const event = action.event;

        // Expected state
        const expectedState = {
            events : {
                ...state.events,
                [event.uuid] : event,
            },
            markers : [{
                ...state.markers[0],
                events : [
                    event.uuid,
                    ...state.markers[0].events,
                ],
            }],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });

    it('Add event at the middle of the list', () => {
        const state = buildState([3]);

        const markerUUID = state.markers[0].uuid;

        const action = addEvent(
            getNewEventData(markerUUID),
            1,
        );
        const event = action.event;

        // Expected state
        const expectedState = {
            events : {
                ...state.events,
                [event.uuid] : event,
            },
            markers : [{
                ...state.markers[0],
                events : [
                    state.markers[0].events[0],
                    event.uuid,
                    state.markers[0].events[1],
                    state.markers[0].events[2],
                ],
            }],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });

    it('Add event at the end of the list', () => {
        const state = buildState([3]);

        const markerUUID = state.markers[0].uuid;

        const action = addEvent(
            getNewEventData(markerUUID),
            3,
        );
        const event = action.event;

        // Expected state
        const expectedState = {
            events : {
                ...state.events,
                [event.uuid] : event,
            },
            markers : [{
                ...state.markers[0],
                events : [
                    ...state.markers[0].events,
                    event.uuid,
                ],
            }],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });

    it('Add an event at the end of the list by default', () => {
        const state = buildState([3]);

        const markerUUID = state.markers[0].uuid;

        const action = addEvent(
            getNewEventData(markerUUID),
        );
        const event = action.event;

        // Expected state
        const expectedState = {
            events : {
                ...state.events,
                [event.uuid] : event,
            },
            markers : [{
                ...state.markers[0],
                events : [
                    ...state.markers[0].events,
                    event.uuid,
                ],
            }],
        };

        // Result state
        const resultState = reducer(state, action);

        // Assertion
        expect(resultState).toEqual(expectedState);
    });
});
