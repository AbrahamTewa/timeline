// ============================================================
// Import packages
import { connect } from 'react-redux';

// ============================================================
// Import modules
import FormMarker from '../components/FormMarker';
import { addMarker } from '../redux/timeline';

// ============================================================
// Functions
function mapDispatchToProps(dispatch) {
    return {
        onSubmit : (label) => {
            dispatch(addMarker({ label }));
        },
    };
}

const AddMarker = connect(undefined, mapDispatchToProps)(FormMarker);

// ============================================================
// Exports
export default AddMarker;
