// ============================================================
// Import packages
import { connect } from 'react-redux';

// ============================================================
// Import modules
import { FormMarker } from '../components';
import { timeline } from '../redux';

// ============================================================
// Functions
function mapDispatchToProps(dispatch) {
    return {
        onSubmit : (label) => {
            dispatch(timeline.addMarker({ label }));
        },
    };
}

const AddMarker = connect(undefined, mapDispatchToProps)(FormMarker);

// ============================================================
// Exports
export default AddMarker;
