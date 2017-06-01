/* global gapi */
import {toPromise} from './main';
import {MIME_TYPE} from './settings';

/**
 * Create a new document
 * @param content
 * @param name
 * @param parentId
 * @returns {Promise.<*>}
 */
async function create({ content
                      , name
                      , parentId}) {
    let fileId;
    let param;

    param = { mimeType  : MIME_TYPE
            , name
            , parent    : [parentId]
            , uploadType:'media'};

    let {result} = await toPromise(gapi.client.drive.files.create(param));

    fileId = result.id;

    await update({ content, fileId});

    return {fileId};
}

async function get({fileId}) {
    let document;
    let thenable;

    thenable = gapi.client.request({ path: `https://www.googleapis.com/drive/v3/files/${fileId}`
                                   , params : { alt      : 'media'
                                              , mimeType : MIME_TYPE}
                                   , method: 'GET'}).then(r => window.result = r);

    document = await toPromise(thenable);

    return document.body;
}

async function rename({fileId, name}) {
    let param;

    param = { fileId
            , name
            , uploadType:'media'};

    await toPromise(gapi.client.drive.files.update(param));

    return undefined;
}

/**
 *
 * @param {string} content
 * @param {string} fileId
 * @returns {Promise}
 */
async function update({content, fileId}) {
    let params;
    let thenable;

    params = { mimeType   : 'text/plain'
             , uploadType : 'multipart'};

    thenable = gapi.client.request({ path: `https://www.googleapis.com/upload/drive/v3/files/${fileId}`
                                   , body : content
                                   , method: 'PATCH'
                                   , params}).then(() => {});

    await toPromise(thenable);

    return undefined;
}

export { create
       , get
       , rename
       , update};
