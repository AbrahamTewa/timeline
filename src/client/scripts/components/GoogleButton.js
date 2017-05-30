import React from 'react';
import PropTypes from 'prop-types';

function GoogleButton({onLogin}) {
    return (<div className="g-signin2" data-onsuccess={onLogin} data-theme="dark">
            </div>);
}

GoogleButton.propTypes = {onLogin: PropTypes.string.isRequired};

export default GoogleButton;
