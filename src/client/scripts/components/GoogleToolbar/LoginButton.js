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

        params = { 'scope'    : 'https://www.googleapis.com/auth/drive.readonly'
                 , 'longtitle': false
                 , 'theme'    : 'dark'
                 , 'onsuccess': this.props.onLogin};

        gapi.signin2.render(this.buttonElement, params);
    }

    render() {
        return (<div ref={input => this.buttonElement = input }>
                </div>);
    }

}

// ******************** Prop-types ********************
LoginButton.propTypes = {onLogin : PropTypes.func.isRequired};

// ******************** Exports ********************
export default LoginButton;
