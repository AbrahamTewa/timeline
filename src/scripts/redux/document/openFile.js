// ============================================================
// Import modules
import { SAVE_STATUS } from '../constants';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'document.LOAD';

// ============================================================
// Functions
/**
 *
 * @param {string} fileId - ID of the file to open
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
