import {LIST_MODIFIERS} from './timeline';

// ******************** Actions ********************
const OPEN_FILE    = 'document.OPEN_FILE';
const RENAME_FILE  = 'document.RENAME_FILE';
const SAVE_FILE_AS = 'document.SAVE_FILE_AS';

// ******************** Action creators ********************

function openFile({url}) {
    return { type: OPEN_FILE
           , url};
}

function renameFile(name) {
    return { name
           , type: RENAME_FILE};
}

function saveFileAs({url}) {
    return { type: SAVE_FILE_AS
           , url};
}

// ******************** Reducer ********************

function reducer(state={}, action={}) {

    if (LIST_MODIFIERS.includes(action.type)) {
        return { ...state
               , saved: false};
    }

    switch(action.type) {

        case OPEN_FILE:
            return { ...state
                   , url: action.url};

        case RENAME_FILE:
            return { ...state
                   , name: action.name};

        case SAVE_FILE_AS:
            return { ...state
                   , url: action.url};

        default:
            return state;
    }

}

// ******************** Exports ********************

export default reducer;
export { openFile
       , renameFile
       , saveFileAs};
