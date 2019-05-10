/* global gapi */
// ============================================================
// Import modules
import { UserAlreadyAuthenticatedError } from '../errors';

import {
    authentication,
    getCurrentState,
} from '../redux';

// ============================================================
// Functions
function loginUser(dispatch) {
    if (getCurrentState().authentication.signedIn) {
        throw new UserAlreadyAuthenticatedError('User already authenticated');
    }

    const user = gapi.auth2.getAuthInstance().currentUser.get();

    const accessToken = user.getAuthResponse().access_token;
    const profile = user.getBasicProfile();

    const action = authentication.loginUser({
        accessToken,
        user : {
            email    : profile.getEmail(),
            fullName : profile.getName(),
            id       : profile.getId(),
            image    : profile.getImageUrl(),
        },
    });

    dispatch(action);
}

// ============================================================
// Exports
export {
    loginUser,
};
