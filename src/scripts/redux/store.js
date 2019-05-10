// ============================================================
// Import packages
import {
    combineReducers,
    createStore,
} from 'redux';

import * as authentication from './authentication';
import * as document from './document';
import * as timeline from './timeline';

// ============================================================
// Module's constants and variables
const reducers = combineReducers({
    authentication : authentication.reducer,
    document       : document.reducer,
    timeline       : timeline.reducer,
});
let store;

// ============================================================
// Functions
function configureStore(initialState) {
    store = createStore(reducers,
        initialState,
        // eslint-disable-next-line no-underscore-dangle
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

function getStore() {
    return store;
}

function getCurrentState() {
    return store.getState();
}

export {
    configureStore,
    getStore,
    getCurrentState,
    reducers,
};
