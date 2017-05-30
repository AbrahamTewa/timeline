import React from 'react';
import PropTypes from 'prop-types';
import GoogleButton from './GoogleButton';

function Toolbar({onLogin}) {
    return (<div>
                <GoogleButton onLogin = {onLogin} />
            </div>);
}

Toolbar.propTypes = { onLogin : PropTypes.func.isRequired};

export default Toolbar;
