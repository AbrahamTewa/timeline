/* global gapi */
import React from 'react';
import PropTypes from 'prop-types';

class GoogleButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /** @type {Object} */
        let params;

        params = { 'scope'    : 'profile email'
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

GoogleButton.propTypes = {onLogin : PropTypes.func.isRequired};

export default GoogleButton;
