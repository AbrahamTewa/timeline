/* global gapi */
// ******************** NodeJS packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Component ********************
class LoginButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /** @type {Object} */
        let params;

        params = { longtitle : true
                 , onsuccess : this.onLoginSuccess.bind(this)
                 , scope     : 'https://www.googleapis.com/auth/drive.readonly'
                 , theme     : 'dark'};

        gapi.signin2.render(this.buttonElement, params);
    }

    async onLoginSuccess(user) {
        let oauth;

        oauth = user.getAuthResponse();

        if (!oauth.access_token)
            await user.reloadAuthResponse();

        this.props.onLogin();
    }

    render() {
        return (<div className={'login-button' + (this.props.isAuthenticated ? ' hidden': '')}
                     ref={input => this.buttonElement = input }>
                </div>);
    }

}

// ******************** Prop-types ********************
LoginButton.propTypes = { isAuthenticated: PropTypes.bool.isRequired
                        , onLogin        : PropTypes.func.isRequired};

// ******************** Exports ********************
export default LoginButton;
