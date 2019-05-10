// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'document.RENAME_FILE';

// ============================================================
// Functions
/**
 *
 * @param {string} fileId - ID of the file to open
 */
function actionCreator({ name }) {
    return { name };
}

/**
 *
 * @param {ReduxStore.Authentication} state
 * @param {string}                    fileId
 */
function reducer(state, { name }) {
    return {
        ...state,
        name,
    };
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
