// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ============================================================
// Import packages
import EditableText, { MODE_DIRECT } from '../components/EditableText';
import { renameFile } from '../redux/document';

// ============================================================
// Container
function Name({ name, onChange }) {
    return (
        <h1 className="title">
            <EditableText
                label={name}
                mode={MODE_DIRECT}
                onChange={onChange}
            />
        </h1>
    );
}

Name.propTypes = {
    name     : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        name : state.document.name,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChange : name => dispatch(renameFile(name)),
    };
}

const DocumentName = connect(mapStateToProps, mapDispatchToProps)(Name);

// ============================================================
// Exports
export default DocumentName;
