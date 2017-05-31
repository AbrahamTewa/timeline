/* global google */
let currentUser;

import FilePicker          from './components/GoogleToolbar/FilePicker';
import * as document       from './document';
import {getStore}          from './redux';
import * as documentAction from './redux/document';

async function forceSave() {

    let doc;
    /** @type {string} */
    let fileId;

    let filePicker;

    /** @type {string} */
    let parent;

    /** @type {ReduxStore} */
    let state;
    let store;
    let view;

    store = getStore();
    state = store.getState();

    fileId = state.document.fileId;

    if (fileId)
        return saveDocument();

    view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
    view.setIncludeFolders(true);
    view.setMode(google.picker.DocsViewMode.LIST);
    view.setSelectFolderEnabled(true);
    view.setParent('root');

    filePicker = new FilePicker({ access_token: state.authentication.oauth.access_token
                                , views       : [view]});

    // If the file hasn't been saved yet, then we ask the user to pick a folder where to create it

    parent = await filePicker.display();

    store.dispatch(documentAction.savingFile());

    if (typeof parent === 'undefined')
        return;

    doc = await document.create({ content : toSaveFormat(state)
                                , name    : state.document.name
                                , parentId: parent.parentId});

    debugger; // eslint-disable-line no-debugger
    store.dispatch(documentAction.savedFile({fileId: doc.fileId}));
}

/**
 *
 * @param {string} document
 * @returns {ReduxStore}
 */
function fromSaveFormat(document) {
    return {timeline: JSON.parse(document).data};
}

function getCurrentUser() {
    return currentUser;
}

async function saveDocument() {
    let content;
    let store;
    let state;

    store = getStore();

    store.dispatch(documentAction.savingFile());

    state = store.getState();
    content = toSaveFormat(state);

    await document.update({ content
                          , fileId: state.document.fileId});

    store.dispatch(documentAction.savedFile());
}

function setCurrentUser(user) {
    currentUser = user;
}

function toPromise(thenable) {

    let promise;
    let promiseHolder;

    promise = new Promise(function(onFulfill, onReject) {
        promiseHolder = {onFulfill, onReject};
    });

    thenable.then(promiseHolder.onFulfill, promiseHolder.onReject);

    return promise;
}

/**
 *
 * @param {ReduxStore} state
 * @returns {string}
 */
function toSaveFormat(state) {
    let document;

    document = { application: 'github.com/abrahamtewa/timeline'
               , version: '0.0.1'};

    document.data = state.timeline;

    return JSON.stringify(document);
}

export { forceSave
       , fromSaveFormat
       , getCurrentUser
       , saveDocument
       , setCurrentUser
       , toPromise
       , toSaveFormat};
