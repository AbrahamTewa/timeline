// ============================================================
// Import modules
import globalReducer from './reducer';
import * as openFileAction from './openFile';
import * as renameFileAction from './renameFile';
import * as savingFileAction from './savingFile';
import * as savedFileAction from './savedFile';

// ============================================================
// Module's constants and variables
const reducers = {
    [openFileAction.ACTION_TYPE]   : openFileAction.reducer,
    [renameFileAction.ACTION_TYPE] : renameFileAction.reducer,
    [savingFileAction.ACTION_TYPE] : savingFileAction.reducer,
    [savedFileAction.ACTION_TYPE]  : savedFileAction.reducer,
};

const openFile = getActionCreator(openFileAction);
const renameFile = getActionCreator(renameFileAction);
const savingFile = getActionCreator(savingFileAction);
const savedFile = getActionCreator(savedFileAction);

// ============================================================
// Functions
function getActionCreator({ ACTION_TYPE, actionCreator }) {
    return (...args) => {
        const payload = actionCreator(...args);

        return {
            payload,
            type : ACTION_TYPE,
        };
    };
}

function reducer(
    state = {},
    action = {},
) {
    const nextState = globalReducer(state, action);

    const actionReducer = reducers[action.type];

    if (actionReducer) {
        return actionReducer(nextState, action.payload);
    }

    return nextState;
}

// ============================================================
// Exports
export {
    reducer,

    // Action creators
    openFile,
    renameFile,
    savingFile,
    savedFile,
};
