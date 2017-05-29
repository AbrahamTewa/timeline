import App from './containers/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore
       , getStore} from './redux';

/**
 * Initialize the application
 */
function initialize() {
    configureStore();

    ReactDOM.render( <Provider store={getStore()}>
                        <App />
                     </Provider>
                   , document.querySelector('#root'));
}

document.addEventListener('DOMContentLoaded', initialize);
