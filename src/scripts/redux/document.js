import {LIST_MODIFIERS} from './timeline';

// ******************** Actions ********************
const OPEN_FILE    = 'document.LOAD';
const RENAME_FILE  = 'document.RENAME_FILE';
const SAVING_FILE  = 'document.SAVING_FILE';
const SAVED_FILE   = 'document.SAVED_FILE';

const SAVE_STATUS = { SAVED  : 'All changes as been saved'
                    , NEEDED : 'Saving is needed'
                    , SAVING : 'The saving is currently performed'};

// ******************** Action creators ********************

function openFile({fileId}) {
    return { payload : {fileId}
           , type    : OPEN_FILE};
}

function renameFile({name}) {
    return { payload : {name}
           , type    : RENAME_FILE};
}

/**
 *
 * @param {string} [fileId]
 * @returns {{type: string, url: *}}
 */
function savedFile({fileId}={}) {
    return { payload: {fileId}
           , type   : SAVED_FILE};
}

function savingFile() {
    return {type: SAVING_FILE};
}

// ******************** Reducer ********************

function reducer(state={}, action={}) {

    if (LIST_MODIFIERS.includes(action.type)) {
        return { ...state
               , saveStatus : SAVE_STATUS.NEEDED};
    }

    switch(action.type) {

        case OPEN_FILE:
            return { fileId    : action.payload.fileId
                   , saveStatus: SAVE_STATUS.SAVED };

        case RENAME_FILE:
            return { ...state
                   , name: action.payload.name};

        case SAVED_FILE: {
            let fileId;

            fileId = action.payload.fileId || state.fileId;

            return { ...state
                   , fileId
                   , saveStatus: SAVE_STATUS.SAVED};
        }

        case SAVING_FILE:
            return { ...state
                   , saveStatus: SAVE_STATUS.SAVING};

        default:
            return state;
    }

}

// ******************** Exports ********************

export default reducer;
export { // Action creators
         openFile
       , renameFile
       , savedFile
       , savingFile

         // Action type
       , OPEN_FILE
       , RENAME_FILE
       , SAVING_FILE
       , SAVED_FILE

        // Enums
       , SAVE_STATUS};
