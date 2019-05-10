/* eslint-env node, jest */
import uuidV4 from 'uuid/v4';

// ============================================================
// Import modules
import {
    actionCreator as updateEvent,
    reducer,
} from './updateEvent';

import {
    buildState,
} from './testHelpers';

import {
    generateEventLabel,
    generateText,
} from '../../testHelpers';

// ============================================================
// Tests

describe('Action creator', () => {
    it('return the new data of the event to update', () => {
        const label = generateEventLabel();
        const description = generateText();
        const illustrationURL = 'http://example.com/event.jpg';
        const uuid = uuidV4();

        const action = updateEvent({
            uuid,
            data : {
                description,
                illustrationURL,
                label,
            },
        });

        const expectedAction = {
            uuid,
            data : {
                description,
                illustrationURL,
                label,
            },
        };

        expect(action).toEqual(expectedAction);
    });

    it('should work if data is empty', () => {
        const uuid = uuidV4();

        const action = updateEvent({
            uuid,
            data : {},
        });

        const expectedAction = {
            uuid,
            data : {},
        };

        expect(action).toEqual(expectedAction);
    });
});

describe('Reducer', () => {
    describe('Action creator: updateEvent', () => {
        it('Should throw an error if the event don\'t exists', () => {
            const state = buildState([]);

            const uuid = uuidV4();

            const action = updateEvent({
                uuid,
                data : {},
            });

            expect(() => reducer(state, action)).toThrow('Event not found');
        });

        it('Should update an event', () => {
            const state = buildState([1]);
            const event = state.markers[0].events[0];

            const description = generateText();
            const illustrationURL = `http://${generateText(0)}/event.jpg`;
            const label = generateEventLabel();

            // Expected state
            const expectedState = {
                ...state,
                events : {
                    ...state.events,
                    [event] : {
                        ...state.events[event],
                        description,
                        illustrationURL,
                        label,
                    },
                },
            };

            // Result state
            const action = updateEvent({
                uuid : event,
                data : {
                    description,
                    illustrationURL,
                    label,
                },
            });

            const resultState = reducer(state, action);

            // Assertion
            expect(resultState).toEqual(expectedState);
        });

        it('Can empty an event', () => {
            const state = buildState([1]);
            const event = state.markers[0].events[0];

            // Expected state
            const expectedState = {
                ...state,
                events : {
                    ...state.events,
                    [event] : {
                        ...state.events[event],
                        description     : undefined,
                        illustrationURL : '',
                        label           : undefined,
                    },
                },
            };

            // Result state
            const action = updateEvent({
                uuid : event,
                data : {},
            });

            const resultState = reducer(state, action);

            // Assertion
            expect(resultState).toEqual(expectedState);
        });
    });
});
