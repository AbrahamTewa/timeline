/* global google */

// ============================================================
// Import modules
import { FilePicker } from './components';
import { document as documentController } from './controllers';
import {
    document as documentAction,
    getStore,
} from './redux';
import { FILE_FORMAT_VERSION } from './constants';

// ============================================================
// Module's constants and variables
let currentUser;

// ============================================================
// Functions
async function forceSave() {
    /** @type {ReduxStore} */
    const store = getStore();
    const state = store.getState();

    /** @type {string} */
    const fileId = state.document.fileId;

    if (fileId) {
        await saveDocument();
        return;
    }

    const view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
    view.setIncludeFolders(true);
    view.setMode(google.picker.DocsViewMode.LIST);
    view.setSelectFolderEnabled(true);
    view.setParent('root');

    const filePicker = new FilePicker({
        access_token : state.authentication.oauth.access_token,
        views        : [view],
    });

    // If the file hasn't been saved yet, then we ask the user to pick a folder where to create it

    /** @type {string} */
    const parent = await filePicker.display();

    store.dispatch(documentAction.savingFile());

    if (typeof parent === 'undefined') {
        return;
    }

    const doc = await documentController.create({
        content  : toSaveFormat(state),
        name     : state.document.name,
        parentId : parent.parentId,
    });

    store.dispatch(documentAction.savedFile({ fileId : doc.fileId }));
}

/**
 *
 * @param {string} doc
 * @returns {ReduxStore}
 */
function fromSaveFormat(doc) {
    const fileContent = JSON.parse(doc);

    const document = documentController.toLastVersion(fileContent);

    return { timeline : document.data };
}

function getCurrentUser() {
    return currentUser;
}

async function saveDocument() {
    const store = getStore();

    store.dispatch(documentAction.savingFile());

    const state = store.getState();
    const content = toSaveFormat(state);

    await documentController.update({
        content,
        fileId : state.document.fileId,
    });

    store.dispatch(documentAction.savedFile());
}

function setCurrentUser(user) {
    currentUser = user;
}

function disableEventDrag() {

}

function enableEventDrag() {

}

/**
 *
 * @param {ReduxStore} state
 * @returns {string}
 */
function toSaveFormat(state) {
    const doc = {
        application : 'github.com/abrahamtewa/timeline',
        version     : FILE_FORMAT_VERSION,
    };

    doc.data = state.timeline;

    return JSON.stringify(doc);
}

export {
    disableEventDrag
    , enableEventDrag
    , forceSave
    , fromSaveFormat
    , getCurrentUser
    , saveDocument
    , setCurrentUser
    , toSaveFormat,
};
