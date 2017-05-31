/* global gapi */

/**
 * Indicate if a user is currently signed or not
 * @returns {boolean}
 */
function isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn();
}

function disconnect() {

    let user;
    user = gapi.auth2.getAuthInstance().currentUser.get();

    if (!user.isSignedIn())
        return;

    return user.disconnect();
}

export { disconnect
       , isSignedIn};
