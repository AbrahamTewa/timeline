import {
    getCurrentUser,
    loadUser,
} from './User';

function getAuthInstance() {
    return { currentUser : { get : getCurrentUser } };
}

export {
    getAuthInstance,
    loadUser,
};
