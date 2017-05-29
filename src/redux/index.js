import { combineReducers
       , createStore } from 'redux';
import timeline from './timeline';

// ******************** Global variables and constants ********************
const reducers = combineReducers( {timeline} );
let store;

// ******************** Functions ********************
function configureStore(initialState = {timeline: {events: {}, markers: []}}) {
    store = createStore( reducers
                       , initialState
                       , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

}

function getStore() {
    return store;
}

// ******************** Exports ********************
export { configureStore
       , getStore};
