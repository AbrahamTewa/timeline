import { connect } from 'react-redux';
import AddMarkerComponent from '../components/AddMarker';
import {addMarker} from '../redux/timeline';

function mapDispatchToProps(dispatch) {
    return {onSubmit: (label) => { dispatch(addMarker(label)); }};
}

const AddMarker = connect(undefined, mapDispatchToProps)(AddMarkerComponent);

export default AddMarker;
