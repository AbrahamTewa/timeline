import { connect } from 'react-redux';
import GoogleToolbar from '../components/GoogleToolbar';
import { openFile
       , loginGoogle} from '../redux/google';

function mapStateToProps(state) {
    return {access_token: state.google.user ? state.google.user.oauth.access_token : undefined};
}

function mapDispatchProps(dispatch) {
    return { onFileOpen: file       => dispatch(openFile(file))
           , onLogin   : googleUser => dispatch(loginGoogle(googleUser))};
}

const Toolbar = connect(mapStateToProps, mapDispatchProps)(GoogleToolbar);

export default Toolbar;
