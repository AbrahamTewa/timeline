/* eslint-env node, jest */

import '..';
import * as redux from '../timeline';
import {default as reducer} from '../timeline';
import {ActionCreatorError} from '../helpers';
import {getStore, configureStore} from '..';
import uuid from 'uuid/v4';
import { addEventToStore
       , addMarkerToStore
       , generateMarkerLabel
       , getNewEventData
       , overrideStore
       , resetStore} from './helpers';

/**
 * Create and return a new marker object.
 * @returns {ReduxStore.Timeline.Marker}
 */
function getNewMarker() {
    return { events: []
           , label : generateMarkerLabel()
           , uuid  : uuid()};
}

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
            it('Should create an action if marker exists', () => {
                let action;
                let marker;
                let eventData;
                let expectedAction;

                // Creating initial state
                {
                    marker = getNewMarker();
                    overrideStore({timeline: { events : {}
                                             , markers: [marker]}});
                }

                eventData = getNewEventData(marker.uuid);
                action = redux.addEvent(eventData);
                let eventUUID = action.payload.event.uuid;

                expect(typeof eventUUID).toBe('string');

                expectedAction = { payload: { event: { uuid: eventUUID
                                                     , ...eventData} }
                                 , type   : redux.ADD_EVENT};

                expect(action).toEqual(expectedAction);
            });

            it('Should throw an error if marker doesn\'t exists', () => {
                let eventData;

                // Creating initial state
                {
                    overrideStore({timeline: { events : {}
                                             , markers: []}});
                }

                eventData = getNewEventData(uuid());

                expect(() => redux.addEvent(eventData)).toThrowError(ActionCreatorError);
            })

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
                    action = redux.addMarker(generateMarkerLabel());
                    markerA = action.payload.marker;
                    initialState = reducer(initialState, action);
                    overrideStore({timeline: initialState});

                    // Adding an event to markerA
                    action  = redux.addEvent(getNewEventData(markerA.uuid));
                    initialState = reducer(initialState, action);
                    event = action.payload.event;

                    // Adding a second marker
                    action = redux.addMarker(generateMarkerLabel());
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

});
