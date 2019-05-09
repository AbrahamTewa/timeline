// ******************** NodeJS packages ********************
import { connect } from 'react-redux';

import * as auth from '../auth';
import * as document from '../document';

// ******************** Action creators ********************
import {
    disconnect,
    disconnecting,
    loginUser,
} from '../redux/authentication';

import { openFile } from '../redux/document';

import { loadTimeline } from '../redux/timeline';

import {
    fromSaveFormat,
    saveDocument,
} from '../main';

// ******************** Component ********************
import GoogleToolbar from '../components/GoogleToolbar';

// ******************** Complexe actions ********************
/**
 *
 * @param {function} dispatch
 */
function disconnectUser(dispatch) {
    dispatch(disconnecting());

    auth.disconnect().then(() => {
        dispatch(disconnect());
    });
}

async function loadDocument(dispatch, { fileId }) {
    dispatch(openFile({ fileId }));
    const content = await document.get({ fileId });

    const timeline = fromSaveFormat(content);

    dispatch(loadTimeline(timeline));
}

// ******************** Redux ********************
function mapStateToProps(state) {
    let userProfile;

    const accessToken = state.authentication.user ? state.authentication.oauth.access_token : undefined;
    const doc = {
        saved : state.document.saved,
        url   : state.document.url,
    };

    if (state.authentication.profile) {
        userProfile = {
            fullName : state.authentication.profile.fullName,
            image    : state.authentication.profile.image,
        };
    }

    return {
        access_token : accessToken,
        document     : doc,
        userProfile,
    };
}

function mapDispatchProps(dispatch) {
    return {
        disconnect   : () => disconnectUser(dispatch),
        loadDocument : ({ fileId }) => loadDocument(dispatch, { fileId }),
        onLogin      : () => dispatch(loginUser()),
        saveDocument : () => saveDocument,
    };
}

const Toolbar = connect(mapStateToProps, mapDispatchProps)(GoogleToolbar);

// ******************** Exports ********************
export default Toolbar;
