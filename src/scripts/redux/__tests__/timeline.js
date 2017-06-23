/* eslint-env node, jest */
import * as redux from '../timeline';
import { default as reducer} from '../timeline';
import {getStore, configureStore} from '..';
import faker from 'faker';
import uuid from 'uuid/v4';
import {overrideStore} from './helpers';

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

    describe('Action type: ADD_EVENT', () => {

        function getNewEvent(position) {
            return { description     : faker.lorem.text(faker.random.number(4))
                   , illustrationURL : faker.internet.avatar()
                   , label           : faker.lorem.words(faker.random.number(5))
                   , marker          : uuid()
                   , position};
        }

        function createMarker(marker) {
        }

        describe('should add an event', () => {

            /**
             *
             * @param {ReduxStore.Timeline.Marker} marker
             */
            function setState(marker) {
                /** @type {ReduxStore} */
                let state;

                state = {timeline: {markers: [marker]}};
                overrideStore(state);
            }

            it('if data is correct', ()=> {

                let action;
                let expectedState;
                let fileId;
                let initialState;
                let actionData;

                fileId = '1234596789746543546354312';

                // Testing action creator
                action = redux.addEvent();

                expect(action).toEqual({ payload: {fileId}
                                       , type   : redux.OPEN_FILE});

                // Testing reducer
                initialState = { fileId: 'XXXXXXXXXXXXXXXXXXXXX'
                               , name  : 'A fake name'};

                expectedState = { fileId
                                , saveStatus: redux.SAVE_STATUS.SAVED};

                expect(reducer(initialState, action)).toEqual(expectedState);

            });

        });
    });

});
