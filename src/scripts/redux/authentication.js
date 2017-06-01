/* global gapi */

// ******************** Actions ********************
const DISCONNECT    = 'authentication.DISCONNECT';
const DISCONNECTING = 'authentication.DISCONNECTING';
const LOGIN_USER    = 'authentication.LOGIN';

const CONNECT_STATUS = { DISCONNECT   : 'disconnect'
                       , DISCONNECTING: 'disconnecting'
                       , LOGGED       : 'logged'};

// ******************** Action creators ********************

function disconnecting() {
    return {type: DISCONNECTING};
}

function disconnect() {
    return {type: DISCONNECT};
}

function loginUser() {
    let access_token;
    let profile;
    let user;

    user = gapi.auth2.getAuthInstance().currentUser.get();
    profile = user.getBasicProfile();
    access_token = user.getAuthResponse().access_token;

    return { payload : { profile: { email    : profile.getEmail()
                                  , fullName : profile.getName()
                                  , image    : profile.getImageUrl()}

                       , user: { id: profile.getId()}

                       , oauth: { access_token : access_token}}

           , type    : LOGIN_USER};
}

// ******************** Reducer ********************

function reducer(state={}, action={}) {

    switch(action.type) {
        case DISCONNECT:
            return { signedIn: false
                   , status  : CONNECT_STATUS.DISCONNECT};

        case DISCONNECTING:
            return { signedIn: false
                   , status: CONNECT_STATUS.DISCONNECTING};


        case LOGIN_USER: {
            let {oauth, profile, user} = action.payload;

            return { ...state
                   , oauth   : {...oauth}
                   , profile : {...profile}
                   , signedIn: true
                   , status  : CONNECT_STATUS.LOGGED
                   , user    : {...user}};
        }

        default:
            return state;
    }

}

// ******************** Exports ********************

export default reducer;
export { disconnect
       , disconnecting
       , loginUser};
