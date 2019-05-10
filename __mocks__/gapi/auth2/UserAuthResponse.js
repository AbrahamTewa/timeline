// ============================================================
// Class
class UserAuthResponse {
    constructor(user) {
        this.user = user;
        Object.assign(this, user.authResponse);
    }
}

// ============================================================
// Exports
export default UserAuthResponse;
