/* eslint-env node, jest */
import uuidV4 from 'uuid/v4';

// ============================================================
// Import modules
import {
    actionCreator as moveEvent,
    reducer,
} from './moveEvent';

import {
    buildState,
} from './testHelpers';

// ============================================================
// Tests

describe('Action creator', () => {
    it('return an action', () => {
        const event = uuidV4();
        const marker = uuidV4();
        const position = 5;

        // Expected action
        const expectedAction = {
            event,
            marker,
            position,
        };

        // Result action
        const action = moveEvent({ event, marker, position });

        // Assertion
        expect(action).toEqual(expectedAction);
    });

    it('Position is mandatory', () => {
        expect(() => moveEvent({ position : undefined })).toThrow('Invalid position');
    });

    it('throw an exception if position is not a positive integer', () => {
        expect(() => moveEvent({ position : -1 })).toThrow('Invalid position');
        expect(() => moveEvent({ position : 0.5 })).toThrow('Invalid position');
        expect(() => moveEvent({ position : '10' })).toThrow('Invalid position');
        expect(() => moveEvent({ position : undefined })).toThrow('Invalid position');

        // 0 is a valid value
        expect(() => moveEvent({ position : 0 })).not.toThrow();
        expect(() => moveEvent({ position : 10 })).not.toThrow();
    });
});

describe('Reducer', () => {
    it('Should throw an error if the event don\'t exists', () => {
        const state = buildState([2]);

        const markerId = state.markers[0].uuid;
        const fakeEventId = 'Fake event id';

        const action = moveEvent({
            event    : fakeEventId,
            marker   : markerId,
            position : 0,
        });

        expect(() => reducer(state, action)).toThrow('Event not found');
    });

    it('Should throw an error if marker don\'t exists', () => {
        const state = buildState([2]);

        const eventId = state.markers[0].events[0];

        const fakeMarkerId = 'Fake marker id';

        const action = moveEvent({
            event    : eventId,
            marker   : fakeMarkerId,
            position : 0,
        });

        expect(() => reducer(state, action)).toThrow('Marker not found');
    });

    it('Should throw an error if position is invalid', () => {
        const state = buildState([2]);

        const markerId = state.markers[0].uuid;
        const eventId = state.markers[0].events[0];

        const fakeMarkerId = `${markerId}x`;

        const action = moveEvent({
            event    : eventId,
            marker   : fakeMarkerId,
            position : 3,
        });

        expect(() => reducer(state, action)).toThrow('Marker not found');
    });

    it('Can move the event inside the same marker', () => {
        const state = buildState([2]);

        const eventA = state.markers[0].events[0];
        const eventB = state.markers[0].events[1];
        const destMarker = state.markers[0];

        const expectedState = {
            ...state,
            markers : [{
                ...state.markers[0],
                events : [
                    eventB,
                    eventA,
                ],
            }],
        };

        const action = moveEvent({
            event    : eventA,
            marker   : destMarker.uuid,
            position : 1,
        });

        const resultState = reducer(state, action);

        expect(resultState).toEqual(expectedState);
    });

    it('Should move the event into another marker', () => {
        const state = buildState([2, 0]);

        const eventA = state.markers[0].events[0];
        const eventB = state.markers[0].events[1];

        const expectedState = {
            ...state,
            markers : [
                {
                    ...state.markers[0],
                    events : [
                        eventB,
                    ],
                },
                {
                    ...state.markers[1],
                    events : [
                        eventA,
                    ],
                },
            ],
        };

        const action = moveEvent({
            event    : eventA,
            marker   : state.markers[1].uuid,
            position : 0,
        });

        const resultState = reducer(state, action);

        expect(resultState).toEqual(expectedState);
    });

    it('Move marker in the right position', () => {
        const state = buildState([1, 4]);

        const eventAA = state.markers[0].events[0];
        const eventBA = state.markers[1].events[0];
        const eventBB = state.markers[1].events[1];
        const eventBC = state.markers[1].events[2];
        const eventBD = state.markers[1].events[3];

        const expectedState = {
            ...state,
            markers : [
                {
                    ...state.markers[0],
                    events : [],
                },
                {
                    ...state.markers[1],
                    events : [
                        eventBA,
                        eventBB,
                        eventAA,
                        eventBC,
                        eventBD,
                    ],
                },
            ],
        };

        const action = moveEvent({
            event    : eventAA,
            marker   : state.markers[1].uuid,
            position : 2,
        });

        const resultState = reducer(state, action);

        expect(resultState).toEqual(expectedState);
    });
});
