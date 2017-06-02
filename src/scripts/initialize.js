/* global gapi tinymce */
// ******************** Containers and redux ********************
import { configureStore} from './redux';
import { CLIENT_ID
       , scope} from './settings';

// ******************** Main ********************

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
        selector: '.text-editor'
    });
}

/**
 * Initialize the application
 */
function initializeStore() {

    /** @type {ReduxStore} */
    let initialState;
    let authentication;
    let access_token;
    let profile;
    let user;

    user = gapi.auth2.getAuthInstance().currentUser.get();

    if (user.isSignedIn()) {
        access_token = user.getAuthResponse().access_token;
        profile      = user.getBasicProfile();

        authentication = { oauth  : {access_token}

                         , profile: { email   : profile.getEmail()
                                    , fullName: profile.getName()
                                    , image   : profile.getImageUrl()}

                         , signedIn: true
                         , user     : { id: profile.getId()}};
    }
    else {
        authentication = {signedIn: false};
    }

    initialState = { authentication
                   , document: { name : 'Ma chronologie.timeline'
                               , saved: true}
                   , timeline: { events : {}
                               , markers: []}};

    configureStore(initialState);
}

async function initializeAPI() {

    await Promise.all([loadAPI('auth2')
                      ,loadAPI('client')
                      ,loadAPI('picker')]);

    return Promise.all([gapi.client.load('drive', 'v3')
                       ,gapi.client.init({ clientId : CLIENT_ID
                                         , scope    : scope})]);
}

function loadAPI(api) {
    let promise;
    let promiseHolder;

    promise = new Promise(function(onFulfill, onReject) {
        promiseHolder = {onFulfill, onReject};
    }.bind(this));

    gapi.load(api, {'callback': promiseHolder.onFulfill});

    return promise;
}

export default initialize;
