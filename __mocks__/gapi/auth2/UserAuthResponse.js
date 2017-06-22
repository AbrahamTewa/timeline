class UserAuthResponse {

    constructor(user) {
        this.user     = user;
        Object.assign(this, user.authResponse);
    }

}

export default UserAuthResponse;
