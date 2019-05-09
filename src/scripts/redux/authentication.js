/* global gapi */
import ExtandableError from 'es6-error';
import { getCurrentState } from '.';

// ******************** Actions ********************
const DISCONNECT = 'authentication.DISCONNECT';
const DISCONNECTING = 'authentication.DISCONNECTING';
const LOGIN_USER = 'authentication.LOGIN';

const CONNECT_STATUS = {
    DISCONNECTED: 'disconnected',
    DISCONNECTING: 'disconnecting',
    LOGGED: 'logged',
};

// ******************** Action creators ********************

function disconnecting() {
    return { type: DISCONNECTING };
}

function disconnect() {
    return { type: DISCONNECT };
}

function loginUser() {
    if (getCurrentState().authentication.signedIn) { throw new UserAlreadyAuthenticatedError('User already authenticated'); }

    const user = gapi.auth2.getAuthInstance().currentUser.get();

    const accessToken = user.getAuthResponse().access_token;
    const profile = user.getBasicProfile();

    return {
        payload: {
            profile: {
                email: profile.getEmail(),
                fullName: profile.getName(),
                image: profile.getImageUrl(),
            },

            user: { id: profile.getId() },

            oauth: { access_token: accessToken },
        },

        type: LOGIN_USER,
    };
}

// ******************** Reducer ********************

function reducer(state = {}, action = {}) {
    switch (action.type) {
    case DISCONNECT:
        return {
            signedIn: false,
            status: CONNECT_STATUS.DISCONNECTED,
        };

    case DISCONNECTING:
        return {
            signedIn: false,
            status: CONNECT_STATUS.DISCONNECTING,
        };


    case LOGIN_USER: {
        const { oauth, profile, user } = action.payload;

        return {
            ...state,
            oauth: { ...oauth },
            profile: { ...profile },
            signedIn: true,
            status: CONNECT_STATUS.LOGGED,
            user: { ...user },
        };
    }

    default:
        return state;
    }
}

// ******************** Exceptions ********************
class UserAlreadyAuthenticatedError extends ExtandableError {
    constructor() {
        super('User already authenticated');
    }
}

// ******************** Exports ********************

export default reducer;
export { // Action creators
    disconnect
    , disconnecting
    , loginUser

    // Actions
    , DISCONNECT
    , DISCONNECTING
    , LOGIN_USER

    // Other constants
    , CONNECT_STATUS

    // Exceptions
    , UserAlreadyAuthenticatedError,
};
