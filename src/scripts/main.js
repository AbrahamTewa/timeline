/* global google */

// ============================================================
// Import modules
import { FilePicker } from './components';
import * as document from './document';
import {
    document as documentAction,
    getStore,
} from './redux';

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

    const doc = await document.create({
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
    return { timeline : JSON.parse(doc).data };
}

function getCurrentUser() {
    return currentUser;
}

async function saveDocument() {
    const store = getStore();

    store.dispatch(documentAction.savingFile());

    const state = store.getState();
    const content = toSaveFormat(state);

    await document.update({
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
        version     : '0.0.1',
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
