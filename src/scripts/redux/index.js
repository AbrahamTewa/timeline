import { combineReducers
       , createStore } from 'redux';

import authentication from './authentication';
import document       from './document';
import timeline       from './timeline';

// ******************** Global variables and constants ********************
const reducers = combineReducers( { authentication
                                  , document
                                  , timeline} );
let store;

// ******************** Functions ********************
function configureStore(initialState) {
    store = createStore( reducers
                       , initialState
                       , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

function getStore() {
    return store;
}

function getCurrentState() {
    return store.getState();
}

// ******************** Exports ********************
export { configureStore
       , getCurrentState
       , getStore
       , reducers};
