/* global gapi */
// ******************** NodeJS packages ********************
import 'babel-polyfill';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

// ******************** Containers and redux ********************
import App from './containers/App';

import { configureStore
       , getStore} from './redux';

const initialState = { document: {name: 'Ma chronologie.timeline'}
                     , timeline: { events: {}
                                , markers: []}};

// ******************** Main ********************

/**
 * Initialize the application
 */
function initializeStore() {
    configureStore(initialState);

    ReactDOM.render( <Provider store={getStore()}>
                        <App />
                     </Provider>
                   , document.querySelector('#root'));
}

function loadPickerAPI() {
    let promise;
    let promiseHolder;

    promise = new Promise(function(onFulfill, onReject) {
        promiseHolder = {onFulfill, onReject};
    }.bind(this));

    gapi.load('picker', {'callback': promiseHolder.onFulfill});

    return promise;
}

function initialize() {
    loadPickerAPI().then(initializeStore);
}

document.addEventListener('DOMContentLoaded', initialize);
