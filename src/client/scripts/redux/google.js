// ******************** Actions ********************
const LOGON_GOOGLE = 'google.LOGIN';
const OPEN_FILE    = 'google.OPEN_FILE';

// ******************** Action creators ********************

/**
 *
 * @param googleUser
 */
function loginGoogle(googleUser) {
    console.log('logon !');
    let profile = googleUser.getBasicProfile();

    debugger; // eslint-disable-line no-debugger

    return { fullName     : profile.getName()
           , id           : profile.getId()
           , id_token     : googleUser.getAuthResponse().id_token
           , access_token : googleUser.getAuthResponse().access_token
           , type         : LOGON_GOOGLE};
}

function openFile(url) {
    return { type: OPEN_FILE
           , url};
}

// ******************** Reducer ********************

function reducer(state={}, action={}) {

    switch(action.type) {
        case LOGON_GOOGLE:
            return { ...state
                   , user: { id: action.id
                           , profile: { familyName: action.familyName
                                      , fullName  : action.fullName}
                           , oauth : { access_token: action.access_token
                                     , id_token    : action.id_token}}};

        case OPEN_FILE:
            return { ...state
                   , document: action.url};

        default:
            return state;
    }

}

// ******************** Exports ********************

export default reducer;
export { openFile
       , loginGoogle};
