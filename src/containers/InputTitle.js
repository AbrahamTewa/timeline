import { connect } from 'react-redux';
import Input from '../components/Input';
import {setTitle} from '../redux/actions';


function mapStateToProps (state) {
    return { title: state.action.title };
}

function mapDispatchToProps(dispatch) {
    return {onkeypress: (event) => { dispatch(setTitle(event.target.value)); }};
}

const CurrentTitle = connect(mapStateToProps, mapDispatchToProps)(Input);

export default CurrentTitle;
