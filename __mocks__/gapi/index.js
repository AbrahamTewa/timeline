import * as auth2 from './auth2';

const gapi = {
    auth2,
};

// eslint-disable-next-line no-underscore-dangle
const __mock__ = {
    loadUser : auth2.loadUser,
};

export default gapi;
export { __mock__ };
