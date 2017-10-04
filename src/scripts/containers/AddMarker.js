import { connect } from 'react-redux';
import FormMarker from '../components/FormMarker';
import {addMarker} from '../redux/timeline';

function mapDispatchToProps(dispatch) {
    return {onSubmit: (label) => { dispatch(addMarker({label})); }};
}

const AddMarker = connect(undefined, mapDispatchToProps)(FormMarker);

export default AddMarker;
