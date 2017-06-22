// ******************** NodeJS packages ********************
import yaml from 'js-yaml';
import fs from 'mz/fs';

import UserBasicProfile from './UserBasicProfile';
import UserAuthResponse from './UserAuthResponse';

// ******************** Module constants and variables ********************
const mapUsers = {};

/**
 * @type {User}
 */
let currentUser;

// ******************** Class ********************
class User {

    /**
     * @param {MockData.User} data
     */
    constructor(data) {
        this.__mock__ = { data
                        , userAuthResponse: new UserAuthResponse(data)
                        , userBasicProfile: new UserBasicProfile(data) };
    }

    /**
     * @returns {UserAuthResponse}
     */
    getAuthResponse() {
        return this.__mock__.userAuthResponse;
    }

    /**
     * @returns {UserBasicProfile}
     */
    getBasicProfile() {
        return this.__mock__.userBasicProfile;
    }
}

// ******************** Functions ********************

function getCurrentUser() {
    return currentUser;
}

/**
 * Load the given user and define it as the current user.
 * If the user as already been loaded, the function will simply define it as current.
 * @param {string} name
 */
async function loadUser(name) {

    /**
     * type {Object}
     */
    let user;

    user = mapUsers[name];

    if (!user) {
        let content;
        let type;
        let filePath = `${__dirname}/../../__data__/users/${name}`;

        // Searching for either YAML or JSON file
        if (await fs.exists(filePath + '.yml')) {
            filePath += '.yml';
            type = 'YML';
        }
        else if (await fs.exists(filePath + '.json')) {
            filePath += '.json';
            type = 'JSON';
        }
        else
            throw new Error('User not found');

        content = await fs.readFile(filePath);

        switch(type) {
            case 'JSON':
                user = JSON.parse(content);
                break;

            case 'YAML':
                user = yaml.safeLoad(content);
                break;
        }

        mapUsers[name] = user;
    }

    currentUser = new User(user);

    return currentUser;
}

// ******************** Exports ********************

export default User;

export {loadUser,
        getCurrentUser};
