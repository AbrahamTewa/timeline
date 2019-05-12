// ============================================================
// Import packages
import { connect } from 'react-redux';

// ============================================================
// Import packages
import { Title } from '../components';
import { document } from '../redux';

// ============================================================
// Container
function mapStateToProps(state) {
    return {
        name : state.document.name,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChange : name => dispatch(document.renameFile(name)),
    };
}

const DocumentName = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Title);

// ============================================================
// Exports
export default DocumentName;
