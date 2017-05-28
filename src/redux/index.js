import { combineReducers
       , createStore } from 'redux';
import actionReducer from './actions';

// ******************** Global variables and constants ********************
const reducers = combineReducers( {action: actionReducer} );
let store;

// ******************** Functions ********************
function configureStore(initialState = {}) {
    store = createStore( reducers
                       , initialState);

}

function getStore() {
    return store;
}

// ******************** Exports ********************
export { configureStore
       , getStore};
