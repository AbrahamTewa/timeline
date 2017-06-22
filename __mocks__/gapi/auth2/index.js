import {getCurrentUser} from './User';

function getAuthInstance() {
    return {currentUser: {get: getCurrentUser}};
}

export {getAuthInstance};
