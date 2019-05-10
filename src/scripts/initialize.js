/* global gapi tinymce */
// ============================================================
// Import modules
import { configureStore } from './redux';
import {
    CLIENT_ID,
    scope,
} from './settings';

// ============================================================
// Functions

async function initialize() {
    await initializeAPI();
    initializeStore();
    initializeEditor();
}

/**
 * Initialize the text editor
 */
function initializeEditor() {
    tinymce.init({
        selector : '.text-editor',
    });
}

/**
 * Initialize the application
 */
function initializeStore() {
    let authentication;
    let accessToken;
    let profile;

    const user = gapi.auth2.getAuthInstance().currentUser.get();

    if (user.isSignedIn()) {
        accessToken = user.getAuthResponse().access_token;
        profile = user.getBasicProfile();

        authentication = {
            oauth : { access_token : accessToken },

            profile : {
                email    : profile.getEmail(),
                fullName : profile.getName(),
                image    : profile.getImageUrl(),
            },

            signedIn : true,
            user     : { id : profile.getId() },
        };
    }
    else {
        authentication = { signedIn : false };
    }

    /** @type {ReduxStore} */
    const initialState = {
        authentication,
        document : {
            name  : 'Ma chronologie.timeline',
            saved : true,
        },
        timeline : {
            events  : {},
            markers : [],
        },
    };

    configureStore(initialState);
}

async function initializeAPI() {
    await Promise.all([loadAPI('auth2'),
        loadAPI('client'),
        loadAPI('picker')]);

    return Promise.all([gapi.client.load('drive', 'v3'),
        gapi.client.init({
            clientId : CLIENT_ID,
            scope,
        })]);
}

function loadAPI(api) {
    let promiseHolder;

    const promise = new Promise(((onFulfill, onReject) => {
        promiseHolder = { onFulfill, onReject };
    }));

    gapi.load(api, { callback : promiseHolder.onFulfill });

    return promise;
}

// ============================================================
// Exports
export default initialize;
