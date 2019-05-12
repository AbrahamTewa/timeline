// ============================================================
// Import packages
import { connect } from 'react-redux';

// ============================================================
// Import modules
import * as auth from '../auth';

// ============================================================
// Action creators
import {
    authentication,
    document as documentAction,
    timeline,
    SAVE_STATUS,
} from '../redux';

import {
    authentication as authController,
    document as documentController,
} from '../controllers';

import {
    fromSaveFormat,
    saveDocument,
} from '../main';

// ============================================================
// Import components
import { GoogleToolbar } from '../components';

// ============================================================
// Functions
/**
 *
 * @param {function} dispatch
 */
function disconnectUser(dispatch) {
    dispatch(authentication.disconnecting());

    auth.disconnect().then(() => {
        dispatch(authentication.disconnect());
    });
}

async function loadDocument(dispatch, { fileId }) {
    dispatch(documentAction.openFile({ fileId }));
    const content = await documentController.get({ fileId });

    const data = fromSaveFormat(content);

    dispatch(timeline.loadTimeline(data));
}

// ============================================================
// Redux
function mapStateToProps(state) {
    let userProfile;

    const accessToken = state.authentication.user
        ? state.authentication.oauth.access_token
        : undefined;

    const doc = {
        saved : state.document.saveStatus === SAVE_STATUS.SAVED,
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
        onLogin      : () => authController.loginUser(dispatch),
        saveDocument : () => saveDocument,
    };
}

const Toolbar = connect(mapStateToProps, mapDispatchProps)(GoogleToolbar);

// ============================================================
// Exports
export default Toolbar;
