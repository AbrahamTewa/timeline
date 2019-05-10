import ExtandableError from 'es6-error';

class UserAlreadyAuthenticatedError extends ExtandableError {
    constructor() {
        super('User already authenticated');
    }
}

export default UserAlreadyAuthenticatedError;
