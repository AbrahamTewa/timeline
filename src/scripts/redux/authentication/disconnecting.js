// ============================================================
// Import modules
import { CONNECT_STATUS } from '../constants';

// ============================================================
// Module's constants and variables

const ACTION_TYPE = 'authentication.DISCONNECTING';

// ============================================================
// Functions
function actionCreator() {
    return undefined;
}

function reducer() {
    return {
        signedIn : false,
        status   : CONNECT_STATUS.DISCONNECTING,
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
