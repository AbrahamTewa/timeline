/* eslint-env node, jest */
import reducer, * as redux from './authentication';

import gapi, { __mock__ as gapiMock } from '../../../__mocks__/gapi';

import { getStore, configureStore } from '.';
import { overrideStore } from './testHelpers';

const UserAlreadyAuthenticatedError = redux.UserAlreadyAuthenticatedError;

describe('Authentication', () => {
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
            const resultState = reducer(state, { type: 'OTHER' });

            expect(resultState).toBe(state);
            expect(JSON.stringify(resultState)).toBe(JSON.stringify({}));
        });
    });

    describe('Action type: DISCONNECT', () => {
        let action;
        let state;

        beforeEach(() => {
            action = redux.disconnect();
            state = {
                signedIn: true,
                status: redux.CONNECT_STATUS.LOGGED,
            };
        });

        it('should create an action to disconnect user', () => {
            expect(action).toEqual({ type: redux.DISCONNECT });
        });

        it('should disconnect the user', () => {
            const expectedState = {
                signedIn: false,
                status: redux.CONNECT_STATUS.DISCONNECTED,
            };

            expect(reducer(state, action)).toEqual(expectedState);
        });
    });

    describe('Action type: DISCONNECTING', () => {
        let action;
        let state;

        beforeEach(() => {
            action = redux.disconnecting();
            state = {
                signedIn: true,
                status: redux.CONNECT_STATUS.LOGGED,
            };
        });

        it('should create an action starting the disconnection of the user', () => {
            expect(action).toEqual({ type: redux.DISCONNECTING });
        });

        it('should start disconnect the user', () => {
            const expectedState = {
                signedIn: false,
                status: redux.CONNECT_STATUS.DISCONNECTING,
            };

            expect(reducer(state, action)).toEqual(expectedState);
        });
    });

    describe('Action type: LOGIN', () => {
        let user;

        beforeEach(async () => {
            // jest.mock('gapi');
            global.gapi = gapi;

            // eslint-disable-next-line no-underscore-dangle
            user = (await gapiMock.loadUser('user01')).__mock__.data;
        });

        it('should create an action with user informations', () => {
            // Initializing store
            const initialState = { authentication: { signedIn: false } };
            overrideStore(initialState);

            // Creating actions
            const action = redux.loginUser();

            const expectedAction = {
                payload: {
                    profile: {
                        email: user.profile.email,
                        fullName: user.profile.name,
                        image: user.profile.imageURL,
                    },

                    oauth: { access_token: user.authResponse.access_token },

                    user: { id: user.profile.id },
                },

                type: redux.LOGIN_USER,
            };

            expect(action).toEqual(expectedAction);
        });

        it('should throw an error if an user is already connected', () => {
            const initialState = { authentication: { signedIn: true } };
            overrideStore(initialState);

            expect(() => redux.loginUser()).toThrow(UserAlreadyAuthenticatedError);
        });

        it('should throw an error if an user is disconnecting', () => {
            const initialState = {
                authentication: {
                    signedIn: true,
                    status: redux.CONNECT_STATUS.DISCONNECTING,
                },
            };
            overrideStore(initialState);

            expect(() => redux.loginUser()).toThrow(UserAlreadyAuthenticatedError);
        });

        it('should connect the user', () => {
            // Initializing state for action creator controls
            const initialState = {
                authentication: {
                    signedIn: false,
                    status: redux.CONNECT_STATUS.DISCONNECTED,
                },
            };
            overrideStore(initialState);

            // Actions
            const action = redux.loginUser();

            const expectedState = {
                oauth: { access_token: user.authResponse.access_token },
                profile: {
                    email: user.profile.email,
                    fullName: user.profile.name,
                    image: user.profile.imageURL,
                },
                signedIn: true,
                status: redux.CONNECT_STATUS.LOGGED,
                user: { id: user.profile.id },
            };

            expect(reducer({}, action)).toEqual(expectedState);
        });
    });
});
