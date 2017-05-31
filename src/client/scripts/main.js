let currentUser;

function getCurrentUser() {
    return currentUser;
}

function setCurrentUser(user) {
    currentUser = user;
}

export { getCurrentUser
       , setCurrentUser};
