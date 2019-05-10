// ============================================================
// Import modules
import { CONNECT_STATUS } from '../constants';

// ============================================================
// Module's constants and variables

const ACTION_TYPE = 'authentication.DISCONNECT';

// ============================================================
// Functions
function actionCreator() {
    return undefined;
}

function reducer() {
    return {
        signedIn : false,
        status   : CONNECT_STATUS.DISCONNECTED,
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
