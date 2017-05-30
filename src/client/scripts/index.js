// ******************** NodeJS packages ********************
import 'babel-polyfill';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

// ******************** Containers and redux ********************
import App from './containers/App';

import { getStore} from './redux';

import initialize from './initialize';

// ******************** Main ********************

function start() {
    initialize().then(function() {
        ReactDOM.render( <Provider store={getStore()}>
                            <App />
                         </Provider>
                       , document.querySelector('#root'));
    });
}

document.addEventListener('DOMContentLoaded', start);
