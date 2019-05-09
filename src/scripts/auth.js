/* global gapi */
// ============================================================
// Import modules
import { toPromise } from './main';

// ============================================================
// Functions
/**
 * Indicate if a user is currently signed or not
 * @returns {boolean}
 */
function isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn();
}

async function disconnect() {
    const user = gapi.auth2.getAuthInstance().currentUser.get();

    if (!user.isSignedIn()) {
        return;
    }

    await toPromise(user.disconnect());
}

// ============================================================
// Exports
export {
    disconnect
    , isSignedIn,
};
