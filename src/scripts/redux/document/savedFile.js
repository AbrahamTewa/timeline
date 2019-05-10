// ============================================================
// Import modules
import { SAVE_STATUS } from '../constants';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'document.SAVED_FILE';

// ============================================================
// Functions
/**
 *
 * @param {string} fileId - ID of the file
 * @returns {{fileId: string}}
 */
function actionCreator({ fileId }) {
    return { fileId };
}

/**
 *
 * @param {ReduxStore.Authentication} state
 * @param {string}                    fileId
 */
function reducer(state, { fileId }) {
    return {
        ...state,
        fileId,
        saveStatus : SAVE_STATUS.SAVED,
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
