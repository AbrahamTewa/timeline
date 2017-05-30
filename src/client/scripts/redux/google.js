// ******************** Actions ********************
const LOGON_GOOGLE = 'google.LOGIN';

// ******************** Action creators ********************

/**
 *
 * @param googleUser
 */
function loginGoogle(googleUser) {
    console.log('logon !');
    let profile = googleUser.getBasicProfile();

    return { fullName : profile.getName()
           , id       : profile.getId()
           , token    : googleUser.getAuthResponse().id_token
           , type     : LOGON_GOOGLE};
}

// ******************** Reducer ********************

function reducer(state={}, action={}) {

    switch(action.type) {
        case LOGON_GOOGLE:
            return {...state
                   , user: { id: action.id
                           , profile: { familyName: action.familyName
                                      , fullName  : action.fullName}
                           , token : action.token }};

        default:
            return state;
    }

}

// ******************** Exports ********************

export default reducer;
export {loginGoogle};
