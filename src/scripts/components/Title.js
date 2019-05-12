// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import packages
import EditableText, { MODE_DIRECT } from './EditableText';

// ============================================================
// Container
function Title({ name, onChange }) {
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

Title.defaultProps = {
    name : '',
};

Title.propTypes = {
    name     : PropTypes.string,
    onChange : PropTypes.func.isRequired,
};

// ============================================================
// Exports
export default Title;
