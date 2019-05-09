/* eslint-env node, jest */
import * as redux from './authentication';
import { default as reducer
       , UserAlreadyAuthenticatedError} from './authentication';

import { __mock__ as gapiMock} from '../../../__mocks__/gapi';
import gapi from '../../../__mocks__/gapi';
import {getStore, configureStore} from '.';
import {overrideStore} from './testHelpers';

describe('Authentication', () => {

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

    describe('Action type: DISCONNECT', () => {
        let action;
        let state;

        beforeEach(() => {
            action = redux.disconnect();
            state = { signedIn: true
                    , status  : redux.CONNECT_STATUS.LOGGED};
        });

        it ('should create an action to disconnect user', () => {
            expect(action).toEqual({type: redux.DISCONNECT});
        });

        it ('should disconnect the user', () => {
            let expectedState;

            expectedState = { signedIn:false
                            , status: redux.CONNECT_STATUS.DISCONNECTED};

            expect(reducer(state, action)).toEqual(expectedState);
        });
    });

    describe('Action type: DISCONNECTING', () => {
        let action;
        let state;

        beforeEach(() => {
            action = redux.disconnecting();
            state = { signedIn: true
                    , status  : redux.CONNECT_STATUS.LOGGED};
        });

        it ('should create an action starting the disconnection of the user', () => {
            expect(action).toEqual({type: redux.DISCONNECTING});
        });

        it ('should start disconnect the user', () => {
            let expectedState;

            expectedState = { signedIn: false
                            , status  : redux.CONNECT_STATUS.DISCONNECTING};

            expect(reducer(state, action)).toEqual(expectedState);
        });
    });

    describe('Action type: LOGIN', () => {
        let user;

        beforeEach(async () => {
            //jest.mock('gapi');
            global.gapi = gapi;

            user = (await gapiMock.loadUser('user01')).__mock__.data;
        });

        it('should create an action with user informations', ()=> {
            let action;
            let expectedAction;
            let initialState;

            // Initializing store
            initialState = {authentication: {signedIn: false}};
            overrideStore(initialState);

            // Creating actions
            action = redux.loginUser();

            expectedAction = { payload : { profile: { email    : user.profile.email
                                                    , fullName : user.profile.name
                                                    , image    : user.profile.imageURL}

                                         , oauth: { access_token : user.authResponse.access_token}

                                         , user: { id: user.profile.id}}

                              , type    : redux.LOGIN_USER};

            expect(action).toEqual(expectedAction);
        });

        it('should throw an error if an user is already connected', () => {
            let initialState;

            initialState = {authentication: {signedIn: true}};
            overrideStore(initialState);

            expect(() => redux.loginUser()).toThrow(UserAlreadyAuthenticatedError);
        });

        it('should throw an error if an user is disconnecting', () => {
            let initialState;

            initialState = {authentication: { signedIn : true
                                            , status   : redux.CONNECT_STATUS.DISCONNECTING}};
            overrideStore(initialState);

            expect(() => redux.loginUser()).toThrow(UserAlreadyAuthenticatedError);
        });

        it('should connect the user', () => {
            let action;
            let expectedState;
            let initialState;

            // Initializing state for action creator controls
            initialState = {authentication: { signedIn : false
                                            , status   : redux.CONNECT_STATUS.DISCONNECTED}};
            overrideStore(initialState);

            // Actions
            action = redux.loginUser();

            expectedState = { oauth   : {access_token: user.authResponse.access_token}
                            , profile : { email    : user.profile.email
                                        , fullName : user.profile.name
                                        , image    : user.profile.imageURL}
                            , signedIn: true
                            , status  : redux.CONNECT_STATUS.LOGGED
                            , user    : {id: user.profile.id}};

            expect(reducer({}, action)).toEqual(expectedState);
        });

    });
});
