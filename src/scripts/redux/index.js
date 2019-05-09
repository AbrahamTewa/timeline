// ============================================================
// Import packages
import {
    combineReducers,
    createStore,
} from 'redux';

// ============================================================
// Import modules
import authentication from './authentication';
import document from './document';
import timeline from './timeline';

// ============================================================
// Module's constants and variables
const reducers = combineReducers({
    authentication,
    document,
    timeline,
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

// ******************** Exports ********************
export {
    configureStore
    , getCurrentState
    , getStore
    , reducers,
};
