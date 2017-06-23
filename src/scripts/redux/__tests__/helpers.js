import {getStore} from '..';

function overrideStore(state) {

    let store;
    store = getStore();

    store.replaceReducer(function() {
        return state;
    });

    store.dispatch({type: 'reset'});
}

export {overrideStore};
