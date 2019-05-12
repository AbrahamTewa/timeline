// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import components
import LoginButton from './LoginButton';
import OpenButton from './OpenButton';
import SaveButton from './SaveButton';
import UserDropdown from './UserDropdown';

// ============================================================
// Component
function Toolbar({
    access_token : accessToken,
    disconnect,
    document,
    loadDocument,
    onLogin,
    userProfile,
}) {
    let openButton;
    let saveButton;
    let userDropdown;

    if (accessToken) {
        openButton = (
            <OpenButton
                access_token={accessToken}
                document={document}
                loadDocument={loadDocument}
            />
        );

        saveButton = <SaveButton />;

        userDropdown = (
            <UserDropdown
                disconnect={disconnect}
                userProfile={userProfile}
            />
        );
    }

    return (
        <div className="toolbar">
            <LoginButton
                onLogin={onLogin}
                isAuthenticated={!!accessToken}
            />
            {userDropdown}
            {openButton}
            {saveButton}
        </div>
    );
}

Toolbar.defaultProps = {
    access_token : '',
    userProfile  : undefined,
};

Toolbar.propTypes = {
    access_token : PropTypes.string,
    disconnect   : PropTypes.func.isRequired,
    document     : PropTypes.shape({
        saved : PropTypes.bool.isRequired,
        url   : PropTypes.string,
    }).isRequired,
    loadDocument : PropTypes.func.isRequired,
    onLogin      : PropTypes.func.isRequired,
    userProfile  : UserDropdown.propTypes.userProfile,
};

// ============================================================
// Exports
export default Toolbar;
