import * as redux from '../redux';
import { overrideStore } from '../testHelpers';

import { UserAlreadyAuthenticatedError } from '../errors';
import * as authentication from './authentication';

describe('controller/authentication', () => {
    beforeEach(() => {
        redux.configureStore({});
    });

    it('should throw an error if an user is already connected', () => {
        const initialState = { authentication : { signedIn : true } };
        overrideStore(initialState);

        expect(() => authentication.loginUser()).toThrow(UserAlreadyAuthenticatedError);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should throw an error if an user is disconnecting', () => {
        const initialState = {
            authentication : {
                signedIn : true,
                status   : redux.CONNECT_STATUS.DISCONNECTING,
            },
        };
        overrideStore(initialState);

        expect(() => authentication.loginUser()).toThrow(UserAlreadyAuthenticatedError);
    });
});
