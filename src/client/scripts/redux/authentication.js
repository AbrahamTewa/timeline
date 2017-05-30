// ******************** Actions ********************
const LOGIN_USER = 'authentication.LOGIN';

// ******************** Action creators ********************

/**
 *
 * @param googleUser
 */
function loginUser(googleUser) {
    console.log('logon !');
    let profile = googleUser.getBasicProfile();

    return { fullName     : profile.getName()
           , id           : profile.getId()
           , id_token     : googleUser.getAuthResponse().id_token
           , access_token : googleUser.getAuthResponse().access_token
           , type         : LOGIN_USER};
}

// ******************** Reducer ********************

function reducer(state={}, action={}) {

    switch(action.type) {
        case LOGIN_USER:
            return { ...state
                   , user: { id: action.id }
                   , profile: { familyName: action.familyName
                              , fullName  : action.fullName}
                   , oauth : { access_token: action.access_token
                             , id_token    : action.id_token}};

        default:
            return state;
    }

}

// ******************** Exports ********************

export default reducer;
export {loginUser};
