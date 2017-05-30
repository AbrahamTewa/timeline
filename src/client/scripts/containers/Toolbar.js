import { connect } from 'react-redux';
import GoogleToolbar from '../components/GoogleToolbar';
import {loginUser} from '../redux/authentication';

import { openFile
       , saveFileAs} from '../redux/document';

function mapStateToProps(state) {
    let access_token;
    let document;

    access_token = state.authentication.user ? state.authentication.oauth.access_token : undefined;
    document     = { saved: state.document.saved
                   , url  : state.document.url};

    return { access_token
           , document};
}

function mapDispatchProps(dispatch) {
    return { onFileOpen: file       => dispatch(openFile({file}))
           , onLogin   : googleUser => dispatch(loginUser(googleUser))
           , onSaveAs  : file       => dispatch(saveFileAs({file}))};
}

const Toolbar = connect(mapStateToProps, mapDispatchProps)(GoogleToolbar);

export default Toolbar;
