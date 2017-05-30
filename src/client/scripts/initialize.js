/* global gapi */
// ******************** Containers and redux ********************
import { configureStore} from './redux';

/**
 *
 * @type {ReduxStore}
 */
const initialState = { document: { name : 'Ma chronologie.timeline'
                                 , saved: true}
                     , timeline: { events : {}
                                 , markers: []}};

// ******************** Main ********************

/**
 * Initialize the application
 */
function initializeStore() {
    configureStore(initialState);
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

async function initializeAPI() {
    await Promise.all([loadAPI('client')
                      ,loadAPI('picker')]);

    return gapi.client.load('drive', 'v3');
}

async function initialize() {
    await initializeAPI();

    initializeStore();
}

export default initialize;
