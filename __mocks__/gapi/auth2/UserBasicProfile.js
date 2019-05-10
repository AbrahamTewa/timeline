/* eslint-disable no-underscore-dangle */
class UserBasicProfile {
    /**
     *
     * @param {MockData.User} user
     */
    constructor(user) {
        this.user = user;
        this.__mock__ = { ...user.profile };
    }

    getEmail() {
        return this.__mock__.email;
    }

    getId() {
        return this.__mock__.id;
    }

    getImageUrl() {
        return this.__mock__.imageURL;
    }

    getName() {
        return this.__mock__.name;
    }
}

export default UserBasicProfile;
