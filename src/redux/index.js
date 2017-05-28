import { combineReducers
       , createStore } from 'redux';
import timeline from './timeline';

// ******************** Global variables and constants ********************
const reducers = combineReducers( {timeline: timeline} );
let store;

// ******************** Functions ********************
function configureStore(initialState = {timeline: {events: {}, markers: []}}) {
    store = createStore( reducers
                       , initialState);

}

function getStore() {
    return store;
}

// ******************** Exports ********************
export { configureStore
       , getStore};
