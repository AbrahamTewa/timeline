// ============================================================
// Import modules
import { CONNECT_STATUS } from '../constants';

// ============================================================
// Module's constants and variables

const ACTION_TYPE = 'authentication.LOGIN';

// ============================================================
// Functions
/**
 *
 * @param {string} accessToken - Access token to use for connection
 * @param {string} email       - Email of the user
 * @param {string} fullName    - Name of the user
 * @param {string} id          - ID of the user
 * @param {string} image       - URL of the avatar image of the user
 */
function actionCreator({
    accessToken,
    user : {
        email,
        fullName,
        id,
        image,
    },
}) {
    return {
        profile : {
            email,
            fullName,
            image,
        },

        user : {
            id,
        },

        oauth : { access_token : accessToken },
    };
}

function reducer(state, { oauth, profile, user }) {
    return {
        ...state,
        oauth    : { ...oauth },
        profile  : { ...profile },
        signedIn : true,
        status   : CONNECT_STATUS.LOGGED,
        user     : { ...user },
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
