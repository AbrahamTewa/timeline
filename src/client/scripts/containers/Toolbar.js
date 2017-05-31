// ******************** NodeJS packages ********************
import { connect } from 'react-redux';

import * as auth from '../auth';

// ******************** Action creators ********************
import { disconnect
       , disconnecting
       , loginUser}   from '../redux/authentication';

import { openFile
       , saveFileAs} from '../redux/document';

// ******************** Component ********************
import GoogleToolbar from '../components/GoogleToolbar';

// ******************** Complexe actions ********************
/**
 *
 * @param {function} dispatch
 */
function disconnectUser(dispatch) {
    dispatch(disconnecting());

    auth.disconnect().then(function() {
        dispatch(disconnect());
    });
}

// ******************** Redux ********************
function mapStateToProps(state) {
    let access_token;
    let document;
    let userProfile;

    access_token = state.authentication.user ? state.authentication.oauth.access_token : undefined;
    document     = { saved: state.document.saved
                   , url  : state.document.url};

    if (state.authentication.profile) {
        userProfile  = { fullName: state.authentication.profile.fullName
                       , image   : state.authentication.profile.image};
    }

    return { access_token
           , document
           , userProfile};
}

function mapDispatchProps(dispatch) {

    return { disconnect: ()   => disconnectUser(dispatch)
           , onFileOpen: file => dispatch(openFile({file}))
           , onLogin   : ()   => dispatch(loginUser())
           , onSaveAs  : file => dispatch(saveFileAs({file}))};
}

const Toolbar = connect(mapStateToProps, mapDispatchProps)(GoogleToolbar);

// ******************** Exports ********************
export default Toolbar;
