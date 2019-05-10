// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Component
function RenameButton({ onClick }) {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            className="rename-button"
            href="#"
            onClick={onClick}
        >
            <i className="fa fa-pencil fa-fw" />
        </a>
    );
}

RenameButton.propTypes = { onClick : PropTypes.func.isRequired };

// ******************** Exports ********************
export default RenameButton;
