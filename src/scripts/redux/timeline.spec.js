/* eslint-env node, jest */

// ============================================================
// Import packages
import uuid from 'uuid/v4';

// ============================================================
// Import modules

import '.';
import * as redux from './timeline';
import {default as reducer} from './timeline';
import {ActionCreatorError} from './helpers';
import {getStore, configureStore} from '.';
import { addEventToStore
       , addMarkerToStore
       , generateMarkerLabel
       , getNewEventData
       , overrideStore
       , resetStore} from './testHelpers';
import {addEvent} from "./timeline";

// ============================================================
// Tests

describe('Timeline', ()=> {

    // Creating store if it hasn't been created yet
    beforeAll(() => {
        let store = getStore();

        if (store)
            return;

        configureStore({});
    });

    describe('Action type: OTHER', () => {
        it('should not alter the state', () => {
            let state;
            let resultState;

            state = {};
            resultState = reducer(state, {type: 'OTHER'});

            expect(resultState).toBe(state);
            expect(JSON.stringify(resultState)).toBe(JSON.stringify({}));
        });
    });

    describe('Events', () => {
        beforeEach(resetStore);

        describe('Action creator: addEvent', () => {
            it('Should throw an error if marker doesn\'t exists', () => {
                let eventData;

                // Creating initial state
                {
                    overrideStore({timeline: { events : {}
                                             , markers: []}});
                }

                eventData = getNewEventData(uuid());

                expect(() => redux.addEvent(eventData)).toThrowError(ActionCreatorError);
            });

            it('Should throw an error if position is invalid', () => {
                let marker;
                let eventData;

                // Creating initial state
                {
                    marker    = addMarkerToStore();
                    addEventToStore(marker.uuid);
                    eventData = getNewEventData(marker.uuid);
                }

                expect(() => redux.addEvent(eventData, 10)).toThrowError(ActionCreatorError);
                expect(() => redux.addEvent(eventData, -10)).toThrowError(ActionCreatorError);
                expect(() => redux.addEvent(eventData, 'a')).toThrowError(ActionCreatorError);
                expect(() => redux.addEvent(eventData, 2)).toThrowError(ActionCreatorError);
            });

            it('Should create an action at the given position', () => {
                let action;
                let marker;
                let eventData;
                let expectedAction;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    eventData = getNewEventData(marker.uuid);
                    action = redux.addEvent(eventData);
                }

                let eventUUID = action.payload.event.uuid;

                expect(typeof eventUUID).toBe('string');

                expectedAction = { payload: { event: { uuid: eventUUID
                                                     , ...eventData} }
                                 , type   : redux.ADD_EVENT};

                expect(action).toEqual(expectedAction);
            });

            it('Should create an action if marker exists', () => {
                let action;
                let marker;
                let eventData;
                let expectedAction;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    eventData = getNewEventData(marker.uuid);
                    action = redux.addEvent(eventData);
                }

                let eventUUID = action.payload.event.uuid;

                expect(typeof eventUUID).toBe('string');

                expectedAction = { payload: { event: { uuid: eventUUID
                                                     , ...eventData} }
                                 , type   : redux.ADD_EVENT};

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action creator: moveEvent', () => {

            it('Should throw an error if the event don\'t exists', () => {
                let marker;

                // Initialize store
                marker = addMarkerToStore();

                expect(() => redux.moveEvent({ event   : uuid()
                                             , marker  : marker.uuid
                                             , position: 0}))
                    .toThrow(ActionCreatorError);
            });

            it('Should throw an error if marker don\'t exists', () => {

                let event;
                let marker;
                let fakeMarkerUUID;

                // Initializing store
                {
                    marker = addMarkerToStore();
                    event  = addEventToStore(marker.uuid);
                }

                fakeMarkerUUID = uuid();

                // Ensuring that the generated UUID is different from the marker
                expect(fakeMarkerUUID).not.toEqual(marker.uuid);

                // Testing error
                expect(() => redux.moveEvent({ event   : event.uuid
                                             , marker  : fakeMarkerUUID
                                             , position: 0}))
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

                    initialState = { events : {}
                                   , markers: []};
                    overrideStore({timeline: initialState});

                    // Adding a marker
                    action = redux.addMarker({label: generateMarkerLabel()});
                    markerA = action.payload.marker;
                    initialState = reducer(initialState, action);
                    overrideStore({timeline: initialState});

                    // Adding an event to markerA
                    action  = redux.addEvent(getNewEventData(markerA.uuid));
                    initialState = reducer(initialState, action);
                    event = action.payload.event;

                    // Adding a second marker
                    action = redux.addMarker({label: generateMarkerLabel()});
                    markerB = action.payload.marker;
                    initialState = reducer(initialState, action);
                    overrideStore({timeline: initialState});

                    // Adding an event to markerB
                    action  = redux.addEvent(getNewEventData(markerB.uuid));
                    initialState = reducer(initialState, action);

                    overrideStore({timeline: initialState});
                }

                // position is a number
                // noinspection JSCheckFunctionSignatures
                expect(() => redux.moveEvent({ event   : event.uuid
                                             , position: '0'}))
                    .toThrow(ActionCreatorError);

                // position === -1
                expect(() => redux.moveEvent({ event   : event.uuid
                                             , position: -1}))
                    .toThrow(ActionCreatorError);

                // position > marker.events.length
                    // Should raise an error if the position is superior to the event length
                expect(() => redux.moveEvent({ event   : event.uuid
                                             , position: 1}))
                    .toThrow(ActionCreatorError);

                expect(redux.moveEvent({ event   : event.uuid
                                       , position: 0}))
                    .toBeTruthy();

                // Moving inside another marker
                    // Should raise an error if the position is superior to the event length + 1
                expect(() => redux.moveEvent({ event   : event.uuid
                                             , marker  : markerB.uuid
                                             , position: 2}))
                    .toThrow(ActionCreatorError);

                expect(redux.moveEvent({ event   : event.uuid
                                       , marker  : markerB.uuid
                                       , position: 1}))
                    .toBeTruthy();
            });

            it('Should create an action if the event and marker exists', () => {
                let event;
                let expectedAction;
                let markerA;
                let markerB;

                // Initializing store
                markerA = addMarkerToStore('A');
                markerB = addMarkerToStore('B');
                event   = addEventToStore(markerA.uuid);

                // Moving in the same marker
                expectedAction = { payload: { event   : event.uuid
                                            , marker  : markerA.uuid
                                            , position: 0 }
                                 , type: redux.MOVE_EVENT };

                expect(redux.moveEvent({ event: event.uuid
                                       , position: 0})).toEqual(expectedAction);

                // Moving in another marker
                expectedAction = { payload: { event   : event.uuid
                                            , marker  : markerB.uuid
                                            , position: 0 }
                                 , type: redux.MOVE_EVENT };

                expect(redux.moveEvent({ event   : event.uuid
                                       , marker  : markerB.uuid
                                       , position: 0})).toEqual(expectedAction);
            });

        });

        describe('Action creator: removeEvent', () => {
            it('Should throw an error if the event don\'t exists', () => {
                expect(() => redux.removeEvent({ uuid: uuid() }))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action if the event exists', () => {
                let event;
                let expectedAction;
                let marker;

                marker = addMarkerToStore();
                event  = addEventToStore(marker.uuid);

                expectedAction = { type: redux.REMOVE_EVENT
                                 , payload: { uuid: event.uuid } };

                expect(redux.removeEvent({uuid : event.uuid})).toEqual(expectedAction);
            });
        });

        describe('Action creator: updateEvent', () => {
            it('Should throw an error if the event don\'t exists', () => {
                expect(() => redux.updateEvent({ uuid: uuid() }))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action if the event exists', () => {
                let event;
                let expectedAction;
                let marker;
                let updatedEvent;

                marker = addMarkerToStore();
                event  = addEventToStore(marker.uuid);

                updatedEvent = { description    : 'Some description'
                               , illustrationURL: 'http://mytimeline.com/event5/illustration.jpg'
                               , label          : 'Another label' };

                expectedAction = { type: redux.UPDATE_EVENT
                                 , payload: { data: {...updatedEvent}
                                            , uuid: event.uuid } };

                expect(redux.updateEvent({ data : updatedEvent
                                         , uuid : event.uuid})).toEqual(expectedAction);
            });
        });

        describe('Action: ADD_EVENT', () => {
            it('Add event to an empty marker', () => {
                let action;
                let expectedState;
                let initialState;
                let marker;
                let event;

                // Creating initial state
                {
                    marker = addMarkerToStore();

                    action = redux.addEvent(getNewEventData(marker.uuid));
                    event = action.payload.event;
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ ...marker
                                                           , events: [event.uuid]}]}};
                    expectedState.timeline.events[event.uuid] = event;

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Add event to a marker with events', () => {
                let action;
                let expectedState;
                let initialState;
                let marker;
                let eventA;
                let eventB;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    eventA = addEventToStore(marker.uuid);

                    action = redux.addEvent(getNewEventData(marker.uuid));
                    eventB = action.payload.event;
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ ...marker
                                                           , events: [ eventA.uuid
                                                                     , eventB.uuid]}]}};
                    expectedState.timeline.events[eventA.uuid] = eventA;
                    expectedState.timeline.events[eventB.uuid] = eventB;

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });
        });

        describe('Action: MOVE_EVENT', () => {

            it('Should move an event inside a marker', () => {
                let action;
                let expectedState;
                let initialState;
                let marker;
                let eventA;
                let eventB;
                let eventC;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    // Adding three events
                    eventA = addEventToStore(marker.uuid);
                    eventB = addEventToStore(marker.uuid);
                    eventC = addEventToStore(marker.uuid);

                    action = redux.moveEvent({ event: eventC.uuid
                                             , position: 0});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ ...marker
                                                           , events: [ eventC.uuid
                                                                     , eventA.uuid
                                                                     , eventB.uuid]}]}};
                    expectedState.timeline.events[eventA.uuid] = eventA;
                    expectedState.timeline.events[eventB.uuid] = eventB;
                    expectedState.timeline.events[eventC.uuid] = eventC;

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Should move an event to an empty marker', ()=> {
                let action;
                let expectedState;
                let initialState;
                let markerA;
                let markerB;
                let eventA;
                let eventB;
                let eventC;

                // Creating initial state
                {
                    markerA = addMarkerToStore('Marker A');
                    markerB = addMarkerToStore('Marker B');

                    // Adding three events
                    eventA = addEventToStore(markerA.uuid, 'Event A');
                    eventB = addEventToStore(markerA.uuid, 'Event B');
                    eventC = addEventToStore(markerA.uuid, 'Event C');

                    action = redux.moveEvent({ event   : eventA.uuid
                                             , marker  : markerB.uuid
                                             , position: 0});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [ { ...markerA
                                                          ,   events: [ eventB.uuid
                                                                      , eventC.uuid]}
                                                           , { ...markerB
                                                             , events: [eventA.uuid]} ]}};

                    expectedState.timeline.events[eventA.uuid] = {...eventA, marker: markerB.uuid};
                    expectedState.timeline.events[eventB.uuid] = eventB;
                    expectedState.timeline.events[eventC.uuid] = eventC;

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Should move an event to the given position in another marker', ()=> {
                let action;
                let expectedState;
                let initialState;
                let markerA;
                let markerB;
                let eventA;
                let eventB;
                let eventC;
                let eventD;
                let eventE;

                // Creating initial state
                {
                    markerA = addMarkerToStore('Marker A');
                    markerB = addMarkerToStore('Marker B');

                    // Adding three events
                    eventA = addEventToStore(markerA.uuid, 'Event A');
                    eventB = addEventToStore(markerA.uuid, 'Event B');
                    eventC = addEventToStore(markerA.uuid, 'Event C');
                    eventD = addEventToStore(markerB.uuid, 'Event D');
                    eventE = addEventToStore(markerB.uuid, 'Event E');

                    action = redux.moveEvent({ event   : eventB.uuid
                                             , marker  : markerB.uuid
                                             , position: 1});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [ { ...markerA
                                                          ,   events: [ eventA.uuid
                                                                      , eventC.uuid]}
                                                           , { ...markerB
                                                             , events: [ eventD.uuid
                                                                       , eventB.uuid
                                                                       , eventE.uuid]} ]}};

                    expectedState.timeline.events[eventA.uuid] = eventA;
                    expectedState.timeline.events[eventB.uuid] = {...eventB, marker: markerB.uuid};
                    expectedState.timeline.events[eventC.uuid] = eventC;
                    expectedState.timeline.events[eventD.uuid] = eventD;
                    expectedState.timeline.events[eventE.uuid] = eventE;

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });
        });

        describe('Action: REMOVE_EVENT', () => {

            it('Remove the an event from a list of events', () => {
                let action;
                let expectedState;
                let eventA, eventB, eventC;
                let initialState;
                let marker;
                let newState;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    eventA = addEventToStore(marker.uuid, 'A');
                    eventB = addEventToStore(marker.uuid, 'B');
                    eventC = addEventToStore(marker.uuid, 'C');

                    action = redux.removeEvent({ uuid: eventB.uuid });
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ ...marker
                                                           , events: [ eventA.uuid
                                                                     , eventC.uuid ]}]}};

                    expectedState.timeline.events[eventA.uuid] = eventA;
                    expectedState.timeline.events[eventC.uuid] = eventC;

                    newState = reducer(initialState.timeline, action);

                    expect(newState).toEqual(expectedState.timeline);
                }
            });

            it('Remove the first event', () => {
                let action;
                let expectedState;
                let eventA, eventB, eventC;
                let initialState;
                let marker;
                let newState;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    eventA = addEventToStore(marker.uuid, 'A');
                    eventB = addEventToStore(marker.uuid, 'B');
                    eventC = addEventToStore(marker.uuid, 'C');

                    action = redux.removeEvent({ uuid: eventA.uuid });
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ ...marker
                                                           , events: [ eventB.uuid
                                                                     , eventC.uuid ]}]}};

                    expectedState.timeline.events[eventB.uuid] = eventB;
                    expectedState.timeline.events[eventC.uuid] = eventC;

                    newState = reducer(initialState.timeline, action);

                    expect(newState).toEqual(expectedState.timeline);
                }
            });

            it('Remove the last event', () => {
                let action;
                let expectedState;
                let eventA, eventB, eventC;
                let initialState;
                let marker;
                let newState;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    eventA = addEventToStore(marker.uuid, 'A');
                    eventB = addEventToStore(marker.uuid, 'B');
                    eventC = addEventToStore(marker.uuid, 'C');

                    action = redux.removeEvent({ uuid: eventC.uuid });
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ ...marker
                                                           , events: [ eventA.uuid
                                                                     , eventB.uuid ]}]}};

                    expectedState.timeline.events[eventA.uuid] = eventA;
                    expectedState.timeline.events[eventB.uuid] = eventB;

                    newState = reducer(initialState.timeline, action);

                    expect(newState).toEqual(expectedState.timeline);
                }
            });

            it('Remove the remaining event', () => {
                let action;
                let expectedState;
                let eventA;
                let initialState;
                let marker;
                let newState;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    eventA = addEventToStore(marker.uuid, 'A');

                    action = redux.removeEvent({ uuid: eventA.uuid });
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ ...marker
                                                           , events: []}]}};

                    newState = reducer(initialState.timeline, action);

                    expect(newState).toEqual(expectedState.timeline);
                }
            });
        });

        describe('Action: UPDATE_EVENT', () => {
            it('Rename a simple event', () => {
                let action;
                let expectedState;
                let event;
                let initialState;
                let marker;
                let newState;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    event = addEventToStore(marker.uuid);

                    action = redux.updateEvent({ data: { description    : 'Some description'
                                                       , illustrationURL: 'http://mytimeline.org/event/illustration.png'
                                                       , label          : 'Event !' }
                                               , uuid: event.uuid });
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ ...marker
                                                           , events: [ event.uuid ]}]}};

                    expectedState.timeline.events[event.uuid] = { ...event
                                                                , ...action.payload.data };

                    newState = reducer(initialState.timeline, action);

                    expect(newState).toEqual(expectedState.timeline);
                }
            })
        });
    });

    describe('Markers', () => {
        beforeEach(resetStore);

        describe('Action creator: addMarker', () => {
            it('Should throw an error if position is invalid', () => {

                // The only valid position is 0 (0 marker in state)
                expect(() => redux.addMarker({label: 'Test marker', position: 0})).not.toThrowError();

                // The position 1 is invalid (0 marker in state)
                expect(() => redux.addMarker({label: 'Test marker', position: 1})).toThrowError(ActionCreatorError);

                // Position is negative
                expect(() => redux.addMarker({label: 'Test marker', position: -1})).toThrowError(ActionCreatorError);

                // Not a number
                expect(() => redux.addMarker({label: 'Test marker', position: 'a'})).toThrowError(ActionCreatorError);

                // Error because is not an integer
                expect(() => redux.addMarker({label: 'Test marker', position: 1.1})).toThrowError(ActionCreatorError);

                addMarkerToStore();

                // The valid positions are 0 and 1
                expect(() => redux.addMarker({label: 'Test marker', position: 0})).not.toThrowError();
                expect(() => redux.addMarker({label: 'Test marker', position: 1})).not.toThrowError();

                // The position 2 is invalid (1 marker in state)
                expect(() => redux.addMarker({label: 'Test marker', position: 2})).toThrowError(ActionCreatorError);
            });

            it('Should create an action at position 0 if no other marker', () => {
                let action;
                let expectedAction;
                let label;

                // Creating initial state
                label = generateMarkerLabel();
                action = redux.addMarker({label});

                let eventUUID = action.payload.marker.uuid;

                expect(typeof eventUUID).toBe('string');

                expectedAction = { payload: { marker: { uuid: eventUUID
                                                      , label: label},
                                              position: 0}
                                 , type   : redux.ADD_MARKER};

                expect(action).toEqual(expectedAction);
            });

            it('Should create an action at position 1 if 1 marker', () => {
                let action;
                let expectedAction;
                let label;

                addMarkerToStore();

                // Creating initial state
                label = generateMarkerLabel();
                action = redux.addMarker({label});

                let eventUUID = action.payload.marker.uuid;

                expect(typeof eventUUID).toBe('string');

                expectedAction = { payload: { marker: { uuid: eventUUID
                                                      , label: label},
                                              position: 1}
                                 , type   : redux.ADD_MARKER};

                expect(action).toEqual(expectedAction);
            });

            it('Should create an action at the right position if no other marker', () => {
                let action;
                let eventUUID;
                let expectedAction;
                let label;

                // Creating initial state
                label = generateMarkerLabel();
                action = redux.addMarker({label, position: 0});

                eventUUID = action.payload.marker.uuid;

                expect(typeof eventUUID).toBe('string');

                expectedAction = { payload: { marker: { uuid: eventUUID
                                                      , label: label},
                                              position: 0}
                                 , type   : redux.ADD_MARKER};

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
                {
                    label = generateMarkerLabel();
                    action = redux.addMarker({label, position: 0});

                    eventUUID = action.payload.marker.uuid;

                    expect(typeof eventUUID).toBe('string');

                    expectedAction = { payload: { marker: { uuid: eventUUID
                                                          , label: label},
                                                  position: 0}
                                     , type   : redux.ADD_MARKER};

                    expect(action).toEqual(expectedAction);
                }

                // Position 1
                {
                    label = generateMarkerLabel();
                    action = redux.addMarker({label, position: 1});

                    eventUUID = action.payload.marker.uuid;

                    expect(typeof eventUUID).toBe('string');

                    expectedAction = { payload: { marker: { uuid: eventUUID
                                                          , label: label},
                                                  position: 1}
                                     , type   : redux.ADD_MARKER};

                    expect(action).toEqual(expectedAction);
                }
            });
        });

        describe('Action creator: moveMarker', () => {
            it('Should throw an error if the marker don\'t exists', () => {
                expect(() => redux.moveMarker({ marker  : uuid()
                                              , position: 0}))
                    .toThrow(ActionCreatorError);
            });

            it('Should throw an error if position is invalid', () => {

                let marker;

                marker = addMarkerToStore().uuid;

                // The only valid position is 0 (0 marker in state)
                expect(() => redux.moveMarker({marker, position: 0})).not.toThrowError();

                // The position 1 is invalid (0 marker in state)
                expect(() => redux.moveMarker({marker, position: 1})).toThrowError(ActionCreatorError);

                // Position is negative
                expect(() => redux.moveMarker({marker, position: -1})).toThrowError(ActionCreatorError);

                // Not a number
                expect(() => redux.moveMarker({marker, position: 'a'})).toThrowError(ActionCreatorError);

                // Error because is not an integer
                expect(() => redux.moveMarker({marker, position: 1.1})).toThrowError(ActionCreatorError);

                addMarkerToStore();

                // The valid positions are 0 and 1
                expect(() => redux.moveMarker({marker, position: 0})).not.toThrowError();
                expect(() => redux.moveMarker({marker, position: 1})).not.toThrowError();

                // The position 2 is invalid (1 marker in state)
                expect(() => redux.moveMarker({marker, position: 2})).toThrowError(ActionCreatorError);
            });

            it('Should create an action', () => {
                let action;
                let expectedAction;
                let marker;

                marker = addMarkerToStore().uuid;
                action = redux.moveMarker({marker, position: 0});

                expectedAction = { payload: { marker,
                                              position: 0}
                                 , type   : redux.MOVE_MARKER};

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action creator: renameMarker', ()=> {
            it('Should throw an error if the marker don\'t exists', () => {
                expect(() => redux.renameMarker({ marker : uuid()
                                                , label  : generateMarkerLabel()}))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action', () => {
                let action;
                let expectedAction;
                let label;
                let marker;

                label = generateMarkerLabel();

                marker = addMarkerToStore().uuid;
                action = redux.renameMarker({marker, label});

                expectedAction = { payload: { marker, label}
                                 , type   : redux.RENAME_MARKER};

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action creator: removeMarker', ()=> {
            it('Should throw an error if the marker don\'t exists', () => {
                expect(() => redux.removeMarker({ marker : uuid() }))
                    .toThrow(ActionCreatorError);
            });

            it('Should create an action', () => {
                let action;
                let expectedAction;
                let label;
                let marker;

                marker = addMarkerToStore().uuid;
                action = redux.removeMarker({marker});

                expectedAction = { payload: { marker}
                                 , type   : redux.REMOVE_MARKER};

                expect(action).toEqual(expectedAction);
            });
        });

        describe('Action: ADD_MARKER', ()=> {
            it('Add marker to an empty store', () => {
                let action;
                let expectedState;
                let initialState;
                let label;

                // Creating initial state
                {
                    label  = generateMarkerLabel();
                    action = redux.addMarker({label});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ events: []
                                                           , label
                                                           , uuid: action.payload.marker.uuid }]}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Add marker in the beginning of markers', () => {
                let action;
                let expectedState;
                let initialState;
                let label;
                let marker;
                let markers;

                // Creating initial state
                {
                    addMarkerToStore();
                    addMarkerToStore();
                    addMarkerToStore();

                    label  = generateMarkerLabel();
                    action = redux.addMarker({label, position: 0});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    marker = { events: []
                             , label
                             , uuid: action.payload.marker.uuid };

                    markers = [marker, ...initialState.timeline.markers];

                    expectedState = {timeline: { events : {}
                                               , markers: markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Add marker in the middle of markers', () => {
                let action;
                let expectedState;
                let initialState;
                let label;
                let marker;
                let markers;

                // Creating initial state
                {
                    addMarkerToStore();
                    addMarkerToStore();
                    addMarkerToStore();

                    label  = generateMarkerLabel();
                    action = redux.addMarker({label, position: 1});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    marker = { events: []
                             , label
                             , uuid: action.payload.marker.uuid };

                    markers = initialState.timeline.markers.slice(0);
                    markers.splice(1, 0, marker);

                    expectedState = {timeline: { events : {}
                                               , markers: markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Add marker in the end of markers', () => {
                let action;
                let expectedState;
                let initialState;
                let label;
                let marker;
                let markers;

                // Creating initial state
                {
                    addMarkerToStore();
                    addMarkerToStore();
                    addMarkerToStore();

                    label  = generateMarkerLabel();
                    action = redux.addMarker({label, position: 3});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    marker = { events: []
                             , label
                             , uuid: action.payload.marker.uuid };

                    markers = initialState.timeline.markers.slice(0);
                    markers.push(marker);

                    expectedState = {timeline: { events : {}
                                               , markers: markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });
        });

        describe('Action: MOVE_MARKER', ()=> {
            it('Moving marker in a store with one marker', () => {
                let action;
                let expectedState;
                let initialState;
                let marker;

                // Creating initial state
                {
                    marker = addMarkerToStore();
                    action = redux.moveMarker({marker: marker.uuid, position: 0});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [marker]}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Moving marker at the beginning', () => {
                let action;
                let expectedState;
                let initialState;
                let marker;
                let markers;

                // Creating initial state
                {
                    addMarkerToStore();
                    addMarkerToStore();
                    marker = addMarkerToStore().uuid;
                    addMarkerToStore();
                    action = redux.moveMarker({marker, position: 0});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();
                    markers = initialState.timeline.markers.slice(0);
                    markers = [ markers[2], markers[0], markers[1], markers[3]];

                    expectedState = {timeline: { events : {}
                                               , markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Moving marker at the end', () => {
                let action;
                let expectedState;
                let initialState;
                let marker;
                let markers;

                // Creating initial state
                {
                    addMarkerToStore();
                    marker = addMarkerToStore().uuid;
                    addMarkerToStore();
                    addMarkerToStore();
                    action = redux.moveMarker({marker, position: 3});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();
                    markers = initialState.timeline.markers.slice(0);
                    markers = [markers[0], markers[2], markers[3], markers[1]];

                    expectedState = {timeline: { events : {}
                                               , markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Moving marker from the beginning', () => {
                let action;
                let expectedState;
                let initialState;
                let marker;
                let markers;

                // Creating initial state
                {
                    marker = addMarkerToStore().uuid;
                    addMarkerToStore();
                    addMarkerToStore();
                    addMarkerToStore();
                    action = redux.moveMarker({marker, position: 2});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();
                    markers = initialState.timeline.markers.slice(0);
                    markers = [markers[1], markers[2], markers[0], markers[3]];

                    expectedState = {timeline: { events : {}
                                               , markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Moving marker from the end', () => {
                let action;
                let expectedState;
                let initialState;
                let marker;
                let markers;

                // Creating initial state
                {
                    addMarkerToStore();
                    addMarkerToStore();
                    addMarkerToStore();
                    marker = addMarkerToStore().uuid;
                    action = redux.moveMarker({marker, position: 0});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();
                    markers = initialState.timeline.markers.slice(0);
                    markers = [markers[3], markers[0], markers[1], markers[2]];

                    expectedState = {timeline: { events : {}
                                               , markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });
        });

        describe('Action: RENAME_MARKER', ()=> {
            it('Rename a marker', ()=> {
                let action;
                let expectedState;
                let initialState;
                let label;
                let marker;

                // Creating initial state
                {
                    marker = addMarkerToStore().uuid;
                    label  = generateMarkerLabel();
                    action = redux.renameMarker({marker, label});
                }

                // Testing reducer
                {
                    initialState = getStore().getState();

                    expectedState = {timeline: { events : {}
                                               , markers: [{ events: []
                                                           , label
                                                           , uuid: marker }]}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });
        });

        describe('Action: REMOVE_MARKER', ()=> {
            it('Remove a marker', ()=> {
                let action;
                let expectedState;
                let initialState;
                let markerA, markerC, markerD;
                let markers;

                // Creating initial state
                {
                    markerA = addMarkerToStore().uuid;
                    addMarkerToStore();
                    markerC = addMarkerToStore().uuid;
                    markerD = addMarkerToStore().uuid;

                    initialState = getStore().getState();
                }

                // Removing center element
                {
                    action = redux.removeMarker({marker: markerC});

                    markers = initialState.timeline.markers;
                    markers = [markers[0], markers[1], markers[3]];

                    expectedState = {timeline: { events : {}
                                               , markers: markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }

                // Removing first element
                {
                    action = redux.removeMarker({marker: markerA});

                    initialState = getStore().getState();
                    markers = initialState.timeline.markers;
                    markers = [markers[1], markers[2], markers[3]];

                    expectedState = {timeline: { events : {}
                                               , markers: markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }

                // Removing last element
                {
                    action = redux.removeMarker({marker: markerD});

                    initialState = getStore().getState();
                    markers = initialState.timeline.markers;
                    markers = [markers[0], markers[1], markers[2]];

                    expectedState = {timeline: { events : {}
                                               , markers: markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Remove the only marker', ()=> {
                let action;
                let expectedState;
                let initialState;
                let marker;

                // Creating initial state
                {
                    marker = addMarkerToStore().uuid;

                    initialState = getStore().getState();
                }

                // Removing center element
                {
                    action = redux.removeMarker({marker: marker});

                    expectedState = {timeline: { events : {}
                                               , markers: []}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });

            it('Removing a marker remove all it\'s events', ()=>{
                let action;
                let events;
                let eventAA, eventAB;
                let expectedState;
                let initialState;
                let markers;
                let markerA, markerB;

                // Creating initial state
                {
                    markerA = addMarkerToStore().uuid;
                    eventAA = addEventToStore(markerA).uuid;
                    eventAB = addEventToStore(markerA).uuid;

                    markerB = addMarkerToStore().uuid;
                    addEventToStore(markerB);
                    addEventToStore(markerB);

                    initialState = getStore().getState();
                }

                // Removing center element
                {
                    events = { ...initialState.timeline.events};
                    markers = initialState.timeline.markers;

                    markers = [markers[1]];
                    delete events[eventAA];
                    delete events[eventAB];

                    action = redux.removeMarker({marker: markerA});

                    expectedState = {timeline: { events, markers}};

                    expect(reducer(initialState.timeline, action)).toEqual(expectedState.timeline);
                }
            });
        });
    });
});
