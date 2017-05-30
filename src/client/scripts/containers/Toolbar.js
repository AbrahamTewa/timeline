import { connect } from 'react-redux';
import GoogleToolbar from '../components/GoogleToolbar';
import {loginGoogle} from '../redux/google';

function mapDispatchProps(dispatch) {
    return {onLogin: googleUser => dispatch(loginGoogle(googleUser))};
}

const Toolbar = connect(undefined, mapDispatchProps)(GoogleToolbar);

export default Toolbar;
