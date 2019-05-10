// ============================================================
// Import modules
import { SAVE_STATUS } from '../constants';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'document.SAVING_FILE';

// ============================================================
// Functions
function actionCreator() {
    return undefined;
}

function reducer(state) {
    return {
        ...state,
        saveStatus : SAVE_STATUS.SAVING,
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
