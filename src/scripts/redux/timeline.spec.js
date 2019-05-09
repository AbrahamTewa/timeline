/* eslint-env node, jest */

// ============================================================
// Import packages
import uuid from 'uuid/v4';

// ============================================================
// Import modules
import reducer, * as redux from './timeline';
import { ActionCreatorError } from './helpers';
import { getStore, configureStore } from '.';
import {
    addEventToStore,
    addMarkerToStore,
    generateMarkerLabel,
    getNewEventData,
    overrideStore,
    resetStore,
} from './testHelpers';

// ============================================================
// Tests

describe('Timeline', () => {
    // Creating store if it hasn't been created yet
    beforeAll(() => {
        const store = getStore();

        if (store) {
            return;
        }

        configureStore({});
    });

    describe('Action type: OTHER', () => {
        it('should not alter the state', () => {
            const state = {};
            const resultState = reducer(state, { type : 'OTHER' });

            expect(resultState).toBe(state);
            expect(JSON.stringify(resultState)).toBe(JSON.stringify({}));
        });
    });

    describe('Events', () => {
        beforeEach(resetStore);

        describe('Action creator: addEvent', () => {
            it('Should throw an error if marker doesn\'t exists', () => {
                // Creating initial state
                overrideStore({
                    timeline : {
                        events  : {},
                        markers : [],
                    },
                });

                const eventData = getNewEventData(uuid());

                expect(() => redux.addEvent(eventData)).toThrow(ActionCreatorError);
            });

            it('Should throw an error if position is invalid', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                addEventToStore(marker.uuid);
                const eventData = getNewEventData(marker.uuid);

                expect(() => redux.addEvent(eventData, 10)).toThrow(ActionCreatorError);
                expect(() => redux.addEvent(eventData, -10)).toThrow(ActionCreatorError);
                expect(() => redux.addEvent(eventData, 'a')).toThrow(ActionCreatorError);
                expect(() => redux.addEvent(eventData, 2)).toThrow(ActionCreatorError);
            });

            it('Should create an action at the given position', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const eventData = getNewEventData(marker.uuid);
                const action = redux.addEvent(eventData);

                const eventUUID = action.payload.event.uuid;

                expect(typeof eventUUID).toBe('string');

                const expectedAction = {
                    payload : {
                        event : {
                            uuid : eventUUID,
                            ...eventData,
                        },
                    },
                    type : redux.ADD_EVENT,
                };

                expect(action).toEqual(expectedAction);
            });

            it('Should create an action if marker exists', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const eventData = getNewEventData(marker.uuid);
                const action = redux.addEvent(eventData);

                const eventUUID = action.payload.event.uuid;

                expect(typeof eventUUID).toBe('string');

                const expectedAction = {
                    payload : {
                        event : {
                            uuid : eventUUID,
                            ...eventData,
                        },
                    },
                    type : redux.ADD_EVENT,
                };

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action creator: moveEvent', () => {
            it('Should throw an error if the event don\'t exists', () => {
                // Initialize store
                const marker = addMarkerToStore();

                expect(() => redux.moveEvent({
                    event    : uuid(),
                    marker   : marker.uuid,
                    position : 0,
                }))
                    .toThrow(ActionCreatorError);
            });

            it('Should throw an error if marker don\'t exists', () => {
                // Initializing store
                const marker = addMarkerToStore();
                const event = addEventToStore(marker.uuid);

                const fakeMarkerUUID = uuid();

                // Ensuring that the generated UUID is different from the marker
                expect(fakeMarkerUUID).not.toEqual(marker.uuid);

                // Testing error
                expect(() => redux.moveEvent({
                    event    : event.uuid,
                    marker   : fakeMarkerUUID,
                    position : 0,
                }))
                    .toThrow(ActionCreatorError);
            });

            it('Should throw an error if position is invalid', () => {
                /*
                Creating two markers : markerA and markerB.
                Each of these markers have one event.
                The test will consist of moving the event of A to B. */

                let event;
                let markerA;
                let markerB;

                // Initializing store
                {
                    let initialState;
                    let action;

                    initialState = {
                        events  : {},
                        markers : [],
                    };
                    overrideStore({ timeline : initialState });

                    // Adding a marker
                    action = redux.addMarker({ label : generateMarkerLabel() });
                    markerA = action.payload.marker;
                    initialState = reducer(initialState, action);
                    overrideStore({ timeline : initialState });

                    // Adding an event to markerA
                    action = redux.addEvent(getNewEventData(markerA.uuid));
                    initialState = reducer(initialState, action);
                    event = action.payload.event;

                    // Adding a second marker
                    action = redux.addMarker({ label : generateMarkerLabel() });
                    markerB = action.payload.marker;
                    initialState = reducer(initialState, action);
                    overrideStore({ timeline : initialState });

                    // Adding an event to markerB
                    action = redux.addEvent(getNewEventData(markerB.uuid));
                    initialState = reducer(initialState, action);

                    overrideStore({ timeline : initialState });
                }

                // position is a number
                // noinspection JSCheckFunctionSignatures
                expect(() => redux.moveEvent({
                    event    : event.uuid,
                    position : '0',
                }))
                    .toThrow(ActionCreatorError);

                // position === -1
                expect(() => redux.moveEvent({
                    event    : event.uuid,
                    position : -1,
                }))
                    .toThrow(ActionCreatorError);

                // position > marker.events.length
                // Should raise an error if the position is superior to the event length
                expect(() => redux.moveEvent({
                    event    : event.uuid,
                    position : 1,
                }))
                    .toThrow(ActionCreatorError);

                expect(redux.moveEvent({
                    event    : event.uuid,
                    position : 0,
                }))
                    .toBeTruthy();

                // Moving inside another marker
                // Should raise an error if the position is superior to the event length + 1
                expect(() => redux.moveEvent({
                    event    : event.uuid,
                    marker   : markerB.uuid,
                    position : 2,
                }))
                    .toThrow(ActionCreatorError);

                expect(redux.moveEvent({
                    event    : event.uuid,
                    marker   : markerB.uuid,
                    position : 1,
                }))
                    .toBeTruthy();
            });

            it('Should create an action if the event and marker exists', () => {
                let expectedAction;

                // Initializing store
                const markerA = addMarkerToStore('A');
                const markerB = addMarkerToStore('B');
                const event = addEventToStore(markerA.uuid);

                // Moving in the same marker
                expectedAction = {
                    payload : {
                        event    : event.uuid,
                        marker   : markerA.uuid,
                        position : 0,
                    },
                    type : redux.MOVE_EVENT,
                };

                expect(redux.moveEvent({
                    event    : event.uuid,
                    position : 0,
                })).toEqual(expectedAction);

                // Moving in another marker
                expectedAction = {
                    payload : {
                        event    : event.uuid,
                        marker   : markerB.uuid,
                        position : 0,
                    },
                    type : redux.MOVE_EVENT,
                };

                expect(redux.moveEvent({
                    event    : event.uuid,
                    marker   : markerB.uuid,
                    position : 0,
                })).toEqual(expectedAction);
            });
        });

        describe('Action creator: removeEvent', () => {
            it('Should throw an error if the event don\'t exists', () => {
                expect(() => redux.removeEvent({ uuid : uuid() }))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action if the event exists', () => {
                const marker = addMarkerToStore();
                const event = addEventToStore(marker.uuid);

                const expectedAction = {
                    type    : redux.REMOVE_EVENT,
                    payload : { uuid : event.uuid },
                };

                expect(redux.removeEvent({ uuid : event.uuid })).toEqual(expectedAction);
            });
        });

        describe('Action creator: updateEvent', () => {
            it('Should throw an error if the event don\'t exists', () => {
                expect(() => redux.updateEvent({ uuid : uuid() }))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action if the event exists', () => {
                const marker = addMarkerToStore();
                const event = addEventToStore(marker.uuid);

                const updatedEvent = {
                    description     : 'Some description',
                    illustrationURL : 'http://mytimeline.com/event5/illustration.jpg',
                    label           : 'Another label',
                };

                const expectedAction = {
                    type    : redux.UPDATE_EVENT,
                    payload : {
                        data : { ...updatedEvent },
                        uuid : event.uuid,
                    },
                };

                expect(redux.updateEvent({
                    data : updatedEvent,
                    uuid : event.uuid,
                })).toEqual(expectedAction);
            });
        });

        describe('Action: ADD_EVENT', () => {
            it('Add event to an empty marker', () => {
                // Creating initial state
                const marker = addMarkerToStore();

                const action = redux.addEvent(getNewEventData(marker.uuid));
                const event = action.payload.event;

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...marker,
                            events : [event.uuid],
                        }],
                    },
                };
                expectedState.timeline.events[event.uuid] = event;

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Add event to a marker with events', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const eventA = addEventToStore(marker.uuid);

                const action = redux.addEvent(getNewEventData(marker.uuid));
                const eventB = action.payload.event;

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...marker,
                            events : [eventA.uuid,
                                eventB.uuid],
                        }],
                    },
                };
                expectedState.timeline.events[eventA.uuid] = eventA;
                expectedState.timeline.events[eventB.uuid] = eventB;

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });
        });

        describe('Action: MOVE_EVENT', () => {
            it('Should move an event inside a marker', () => {
                // Creating initial state
                const marker = addMarkerToStore();

                // Adding three events
                const eventA = addEventToStore(marker.uuid);
                const eventB = addEventToStore(marker.uuid);
                const eventC = addEventToStore(marker.uuid);

                const action = redux.moveEvent({
                    event    : eventC.uuid,
                    position : 0,
                });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...marker,
                            events : [eventC.uuid,
                                eventA.uuid,
                                eventB.uuid],
                        }],
                    },
                };

                expectedState.timeline.events[eventA.uuid] = eventA;
                expectedState.timeline.events[eventB.uuid] = eventB;
                expectedState.timeline.events[eventC.uuid] = eventC;

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Should move an event to an empty marker', () => {
                // Creating initial state
                const markerA = addMarkerToStore('Marker A');
                const markerB = addMarkerToStore('Marker B');

                // Adding three events
                const eventA = addEventToStore(markerA.uuid, 'Event A');
                const eventB = addEventToStore(markerA.uuid, 'Event B');
                const eventC = addEventToStore(markerA.uuid, 'Event C');

                const action = redux.moveEvent({
                    event    : eventA.uuid,
                    marker   : markerB.uuid,
                    position : 0,
                });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...markerA,
                            events : [eventB.uuid,
                                eventC.uuid],
                        },
                        {
                            ...markerB,
                            events : [eventA.uuid],
                        }],
                    },
                };

                expectedState.timeline.events[eventA.uuid] = { ...eventA, marker : markerB.uuid };
                expectedState.timeline.events[eventB.uuid] = eventB;
                expectedState.timeline.events[eventC.uuid] = eventC;

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Should move an event to the given position in another marker', () => {
                // Creating initial state
                const markerA = addMarkerToStore('Marker A');
                const markerB = addMarkerToStore('Marker B');

                // Adding three events
                const eventA = addEventToStore(markerA.uuid, 'Event A');
                const eventB = addEventToStore(markerA.uuid, 'Event B');
                const eventC = addEventToStore(markerA.uuid, 'Event C');
                const eventD = addEventToStore(markerB.uuid, 'Event D');
                const eventE = addEventToStore(markerB.uuid, 'Event E');

                const action = redux.moveEvent({
                    event    : eventB.uuid,
                    marker   : markerB.uuid,
                    position : 1,
                });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...markerA,
                            events : [eventA.uuid,
                                eventC.uuid],
                        },
                        {
                            ...markerB,
                            events : [eventD.uuid,
                                eventB.uuid,
                                eventE.uuid],
                        }],
                    },
                };

                expectedState.timeline.events[eventA.uuid] = eventA;
                expectedState.timeline.events[eventB.uuid] = { ...eventB, marker : markerB.uuid };
                expectedState.timeline.events[eventC.uuid] = eventC;
                expectedState.timeline.events[eventD.uuid] = eventD;
                expectedState.timeline.events[eventE.uuid] = eventE;

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });
        });

        describe('Action: REMOVE_EVENT', () => {
            it('Remove the an event from a list of events', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const eventA = addEventToStore(marker.uuid, 'A');
                const eventB = addEventToStore(marker.uuid, 'B');
                const eventC = addEventToStore(marker.uuid, 'C');

                const action = redux.removeEvent({ uuid : eventB.uuid });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...marker,
                            events : [eventA.uuid,
                                eventC.uuid],
                        }],
                    },
                };

                expectedState.timeline.events[eventA.uuid] = eventA;
                expectedState.timeline.events[eventC.uuid] = eventC;

                const newState = reducer(initialState.timeline, action);

                expect(newState).toEqual(expectedState.timeline);
            });

            it('Remove the first event', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const eventA = addEventToStore(marker.uuid, 'A');
                const eventB = addEventToStore(marker.uuid, 'B');
                const eventC = addEventToStore(marker.uuid, 'C');

                const action = redux.removeEvent({ uuid : eventA.uuid });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...marker,
                            events : [eventB.uuid,
                                eventC.uuid],
                        }],
                    },
                };

                expectedState.timeline.events[eventB.uuid] = eventB;
                expectedState.timeline.events[eventC.uuid] = eventC;

                const newState = reducer(initialState.timeline, action);

                expect(newState).toEqual(expectedState.timeline);
            });

            it('Remove the last event', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const eventA = addEventToStore(marker.uuid, 'A');
                const eventB = addEventToStore(marker.uuid, 'B');
                const eventC = addEventToStore(marker.uuid, 'C');

                const action = redux.removeEvent({ uuid : eventC.uuid });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...marker,
                            events : [eventA.uuid,
                                eventB.uuid],
                        }],
                    },
                };

                expectedState.timeline.events[eventA.uuid] = eventA;
                expectedState.timeline.events[eventB.uuid] = eventB;

                const newState = reducer(initialState.timeline, action);

                expect(newState).toEqual(expectedState.timeline);
            });

            it('Remove the remaining event', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const eventA = addEventToStore(marker.uuid, 'A');

                const action = redux.removeEvent({ uuid : eventA.uuid });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...marker,
                            events : [],
                        }],
                    },
                };

                const newState = reducer(initialState.timeline, action);

                expect(newState).toEqual(expectedState.timeline);
            });
        });

        describe('Action: UPDATE_EVENT', () => {
            it('Rename a simple event', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const event = addEventToStore(marker.uuid);

                const action = redux.updateEvent({
                    data : {
                        description     : 'Some description',
                        illustrationURL : 'http://mytimeline.org/event/illustration.png',
                        label           : 'Event !',
                    },
                    uuid : event.uuid,
                });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            ...marker,
                            events : [event.uuid],
                        }],
                    },
                };

                expectedState.timeline.events[event.uuid] = {
                    ...event,
                    ...action.payload.data,
                };

                const newState = reducer(initialState.timeline, action);

                expect(newState).toEqual(expectedState.timeline);
            });
        });
    });

    describe('Markers', () => {
        beforeEach(resetStore);

        describe('Action creator: addMarker', () => {
            it('Should throw an error if position is invalid', () => {
                // The only valid position is 0 (0 marker in state)
                expect(() => redux.addMarker({ label : 'Test marker', position : 0 })).not.toThrow();

                // The position 1 is invalid (0 marker in state)
                expect(() => redux.addMarker({ label : 'Test marker', position : 1 })).toThrow(ActionCreatorError);

                // Position is negative
                expect(() => redux.addMarker({ label : 'Test marker', position : -1 })).toThrow(ActionCreatorError);

                // Not a number
                expect(() => redux.addMarker({ label : 'Test marker', position : 'a' })).toThrow(ActionCreatorError);

                // Error because is not an integer
                expect(() => redux.addMarker({ label : 'Test marker', position : 1.1 })).toThrow(ActionCreatorError);

                addMarkerToStore();

                // The valid positions are 0 and 1
                expect(() => redux.addMarker({ label : 'Test marker', position : 0 })).not.toThrow();
                expect(() => redux.addMarker({ label : 'Test marker', position : 1 })).not.toThrow();

                // The position 2 is invalid (1 marker in state)
                expect(() => redux.addMarker({ label : 'Test marker', position : 2 })).toThrow(ActionCreatorError);
            });

            it('Should create an action at position 0 if no other marker', () => {
                // Creating initial state
                const label = generateMarkerLabel();
                const action = redux.addMarker({ label });

                const eventUUID = action.payload.marker.uuid;

                expect(typeof eventUUID).toBe('string');

                const expectedAction = {
                    payload : {
                        marker : {
                            uuid : eventUUID,
                            label,
                        },
                        position : 0,
                    },
                    type : redux.ADD_MARKER,
                };

                expect(action).toEqual(expectedAction);
            });

            it('Should create an action at position 1 if 1 marker', () => {
                addMarkerToStore();

                // Creating initial state
                const label = generateMarkerLabel();
                const action = redux.addMarker({ label });

                const eventUUID = action.payload.marker.uuid;

                expect(typeof eventUUID).toBe('string');

                const expectedAction = {
                    payload : {
                        marker : {
                            uuid : eventUUID,
                            label,
                        },
                        position : 1,
                    },
                    type : redux.ADD_MARKER,
                };

                expect(action).toEqual(expectedAction);
            });

            it('Should create an action at the right position if no other marker', () => {
                // Creating initial state
                const label = generateMarkerLabel();
                const action = redux.addMarker({ label, position : 0 });

                const eventUUID = action.payload.marker.uuid;

                expect(typeof eventUUID).toBe('string');

                const expectedAction = {
                    payload : {
                        marker : {
                            uuid : eventUUID,
                            label,
                        },
                        position : 0,
                    },
                    type : redux.ADD_MARKER,
                };

                expect(action).toEqual(expectedAction);
            });

            it('Should create an action at the right position if one marker', () => {
                let action;
                let eventUUID;
                let expectedAction;
                let label;

                // Creating initial state
                addMarkerToStore();

                // Position 0
                label = generateMarkerLabel();
                action = redux.addMarker({ label, position : 0 });

                eventUUID = action.payload.marker.uuid;

                expect(typeof eventUUID).toBe('string');

                expectedAction = {
                    payload : {
                        marker : {
                            uuid : eventUUID,
                            label,
                        },
                        position : 0,
                    },
                    type : redux.ADD_MARKER,
                };

                expect(action).toEqual(expectedAction);

                // Position 1
                label = generateMarkerLabel();
                action = redux.addMarker({ label, position : 1 });

                eventUUID = action.payload.marker.uuid;

                expect(typeof eventUUID).toBe('string');

                expectedAction = {
                    payload : {
                        marker : {
                            uuid : eventUUID,
                            label,
                        },
                        position : 1,
                    },
                    type : redux.ADD_MARKER,
                };

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action creator: moveMarker', () => {
            it('Should throw an error if the marker don\'t exists', () => {
                expect(() => redux.moveMarker({
                    marker   : uuid(),
                    position : 0,
                }))
                    .toThrow(ActionCreatorError);
            });

            it('Should throw an error if position is invalid', () => {
                const marker = addMarkerToStore().uuid;

                // The only valid position is 0 (0 marker in state)
                expect(() => redux.moveMarker({ marker, position : 0 }))
                    .not.toThrow();

                // The position 1 is invalid (0 marker in state)
                expect(() => redux.moveMarker({ marker, position : 1 }))
                    .toThrow(ActionCreatorError);

                // Position is negative
                expect(() => redux.moveMarker({ marker, position : -1 }))
                    .toThrow(ActionCreatorError);

                // Not a number
                expect(() => redux.moveMarker({ marker, position : 'a' }))
                    .toThrow(ActionCreatorError);

                // Error because is not an integer
                expect(() => redux.moveMarker({ marker, position : 1.1 }))
                    .toThrow(ActionCreatorError);

                addMarkerToStore();

                // The valid positions are 0 and 1
                expect(() => redux.moveMarker({ marker, position : 0 }))
                    .not.toThrow();
                expect(() => redux.moveMarker({ marker, position : 1 }))
                    .not.toThrow();

                // The position 2 is invalid (1 marker in state)
                expect(() => redux.moveMarker({ marker, position : 2 }))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action', () => {
                const marker = addMarkerToStore().uuid;
                const action = redux.moveMarker({ marker, position : 0 });

                const expectedAction = {
                    payload : {
                        marker,
                        position : 0,
                    },
                    type : redux.MOVE_MARKER,
                };

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action creator: renameMarker', () => {
            it('Should throw an error if the marker don\'t exists', () => {
                expect(() => redux.renameMarker({
                    marker : uuid(),
                    label  : generateMarkerLabel(),
                }))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action', () => {
                const label = generateMarkerLabel();

                const marker = addMarkerToStore().uuid;
                const action = redux.renameMarker({ marker, label });

                const expectedAction = {
                    payload : { marker, label },
                    type    : redux.RENAME_MARKER,
                };

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action creator: removeMarker', () => {
            it('Should throw an error if the marker don\'t exists', () => {
                expect(() => redux.removeMarker({ marker : uuid() }))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action', () => {
                const marker = addMarkerToStore().uuid;
                const action = redux.removeMarker({ marker });

                const expectedAction = {
                    payload : { marker },
                    type    : redux.REMOVE_MARKER,
                };

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action: ADD_MARKER', () => {
            it('Add marker to an empty store', () => {
                // Creating initial state
                const label = generateMarkerLabel();
                const action = redux.addMarker({ label });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            events : [],
                            label,
                            uuid   : action.payload.marker.uuid,
                        }],
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Add marker in the beginning of markers', () => {
                // Creating initial state
                addMarkerToStore();
                addMarkerToStore();
                addMarkerToStore();

                const label = generateMarkerLabel();
                const action = redux.addMarker({ label, position : 0 });

                // Testing reducer
                const initialState = getStore().getState();

                const marker = {
                    events : [],
                    label,
                    uuid   : action.payload.marker.uuid,
                };

                const markers = [marker, ...initialState.timeline.markers];

                const expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Add marker in the middle of markers', () => {
                // Creating initial state
                addMarkerToStore();
                addMarkerToStore();
                addMarkerToStore();

                const label = generateMarkerLabel();
                const action = redux.addMarker({ label, position : 1 });

                // Testing reducer
                const initialState = getStore().getState();

                const marker = {
                    events : [],
                    label,
                    uuid   : action.payload.marker.uuid,
                };

                const markers = initialState.timeline.markers.slice(0);
                markers.splice(1, 0, marker);

                const expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Add marker in the end of markers', () => {
                // Creating initial state
                addMarkerToStore();
                addMarkerToStore();
                addMarkerToStore();

                const label = generateMarkerLabel();
                const action = redux.addMarker({ label, position : 3 });

                // Testing reducer
                const initialState = getStore().getState();

                const marker = {
                    events : [],
                    label,
                    uuid   : action.payload.marker.uuid,
                };

                const markers = initialState.timeline.markers.slice(0);
                markers.push(marker);

                const expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });
        });

        describe('Action: MOVE_MARKER', () => {
            it('Moving marker in a store with one marker', () => {
                // Creating initial state
                const marker = addMarkerToStore();
                const action = redux.moveMarker({ marker : marker.uuid, position : 0 });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [marker],
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Moving marker at the beginning', () => {
                // Creating initial state
                addMarkerToStore();
                addMarkerToStore();
                const marker = addMarkerToStore().uuid;
                addMarkerToStore();
                const action = redux.moveMarker({ marker, position : 0 });

                // Testing reducer
                const initialState = getStore().getState();
                let markers = initialState.timeline.markers.slice(0);
                markers = [markers[2], markers[0], markers[1], markers[3]];

                const expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Moving marker at the end', () => {
                // Creating initial state
                addMarkerToStore();
                const marker = addMarkerToStore().uuid;
                addMarkerToStore();
                addMarkerToStore();
                const action = redux.moveMarker({ marker, position : 3 });

                // Testing reducer
                const initialState = getStore().getState();
                let markers = initialState.timeline.markers.slice(0);
                markers = [markers[0], markers[2], markers[3], markers[1]];

                const expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Moving marker from the beginning', () => {
                // Creating initial state
                const marker = addMarkerToStore().uuid;
                addMarkerToStore();
                addMarkerToStore();
                addMarkerToStore();
                const action = redux.moveMarker({ marker, position : 2 });

                // Testing reducer
                const initialState = getStore().getState();
                let markers = initialState.timeline.markers.slice(0);
                markers = [markers[1], markers[2], markers[0], markers[3]];

                const expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Moving marker from the end', () => {
                // Creating initial state
                addMarkerToStore();
                addMarkerToStore();
                addMarkerToStore();
                const marker = addMarkerToStore().uuid;
                const action = redux.moveMarker({ marker, position : 0 });

                // Testing reducer
                const initialState = getStore().getState();
                let markers = initialState.timeline.markers.slice(0);
                markers = [markers[3], markers[0], markers[1], markers[2]];

                const expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });
        });

        describe('Action: RENAME_MARKER', () => {
            it('Rename a marker', () => {
                // Creating initial state
                const marker = addMarkerToStore().uuid;
                const label = generateMarkerLabel();
                const action = redux.renameMarker({ marker, label });

                // Testing reducer
                const initialState = getStore().getState();

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [{
                            events : [],
                            label,
                            uuid   : marker,
                        }],
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });
        });

        describe('Action: REMOVE_MARKER', () => {
            it('Remove a marker', () => {
                // Creating initial state
                const markerA = addMarkerToStore().uuid;
                addMarkerToStore();
                const markerC = addMarkerToStore().uuid;
                const markerD = addMarkerToStore().uuid;

                let initialState = getStore().getState();

                // Removing center element
                let action = redux.removeMarker({ marker : markerC });

                let markers = initialState.timeline.markers;
                markers = [markers[0], markers[1], markers[3]];

                let expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);

                // Removing first element
                action = redux.removeMarker({ marker : markerA });

                initialState = getStore().getState();
                markers = initialState.timeline.markers;
                markers = [markers[1], markers[2], markers[3]];

                expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);

                // Removing last element
                action = redux.removeMarker({ marker : markerD });

                initialState = getStore().getState();
                markers = initialState.timeline.markers;
                markers = [markers[0], markers[1], markers[2]];

                expectedState = {
                    timeline : {
                        events : {},
                        markers,
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Remove the only marker', () => {
                // Creating initial state
                const marker = addMarkerToStore().uuid;

                const initialState = getStore().getState();

                // Removing center element
                const action = redux.removeMarker({ marker });

                const expectedState = {
                    timeline : {
                        events  : {},
                        markers : [],
                    },
                };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });

            it('Removing a marker remove all it\'s events', () => {
                // Creating initial state
                const markerA = addMarkerToStore().uuid;
                const eventAA = addEventToStore(markerA).uuid;
                const eventAB = addEventToStore(markerA).uuid;

                const markerB = addMarkerToStore().uuid;
                addEventToStore(markerB);
                addEventToStore(markerB);

                const initialState = getStore().getState();

                // Removing center element
                const events = { ...initialState.timeline.events };
                let markers = initialState.timeline.markers;

                markers = [markers[1]];
                delete events[eventAA];
                delete events[eventAB];

                const action = redux.removeMarker({ marker : markerA });

                const expectedState = { timeline : { events, markers } };

                expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
            });
        });
    });
});
