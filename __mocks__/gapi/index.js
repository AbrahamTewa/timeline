console.log('xx');

import * as auth2 from './auth2';
import {loadUser} from './auth2/User';

const gapi = {
    auth2
};

const __mock__ = {
    loadUser
};

export default gapi;
export {__mock__};
