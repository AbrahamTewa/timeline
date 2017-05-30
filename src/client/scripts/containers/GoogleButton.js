import { connect } from 'react-redux';
import GoogleButton from '../components/GoogleButton';
import {loginGoogle} from '../redux/google';

function mapDispatchProps(dispatch) {
    initializeWindow(dispatch);
    return {onLogin: 'onGoogleLogin'};
}

function onGoogleLogin(dispatch, googleUser) {
    dispatch(loginGoogle(googleUser));
}

function initializeWindow(dispatch) {
    window.onGoogleLogin = onGoogleLogin.bind(undefined, dispatch);
}

const Button = connect(undefined, mapDispatchProps)(GoogleButton);

export default Button;
