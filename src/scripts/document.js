/* global gapi */
// ============================================================
// Import modules
import { toPromise } from './helpers';
import { MIME_TYPE } from './settings';

// ============================================================
// Functions
/**
 * Create a new document
 * @param content
 * @param name
 * @param parentId
 * @returns {Promise.<*>}
 */
async function create({
    content,
    name,
    parentId,
}) {
    const param = {
        mimeType   : MIME_TYPE,
        name,
        parent     : [parentId],
        uploadType : 'media',
    };

    const { result } = await toPromise(gapi.client.drive.files.create(param));

    const fileId = result.id;

    await update({ content, fileId });

    return { fileId };
}

async function get({ fileId }) {
    const thenable = gapi.client.request({
        path   : `https://www.googleapis.com/drive/v3/files/${fileId}`,
        params : {
            alt      : 'media',
            mimeType : MIME_TYPE,
        },
        method : 'GET',
    }).then((r) => {
        window.result = r;
    });

    const document = await toPromise(thenable);

    return document.body;
}

async function rename({ fileId, name }) {
    const param = {
        fileId,
        name,
        uploadType : 'media',
    };

    await toPromise(gapi.client.drive.files.update(param));

    return undefined;
}

/**
 *
 * @param {string} content
 * @param {string} fileId
 * @returns {Promise}
 */
async function update({ content, fileId }) {
    const params = {
        mimeType   : 'text/plain',
        uploadType : 'multipart',
    };

    const thenable = gapi.client.request({
        path   : `https://www.googleapis.com/upload/drive/v3/files/${fileId}`,
        body   : content,
        method : 'PATCH',
        params,
    }).then(() => {});

    await toPromise(thenable);

    return undefined;
}

export {
    create
    , get
    , rename
    , update,
};
