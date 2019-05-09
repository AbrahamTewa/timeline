// ******************** NodeJS packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ==================================================
function RenameButton({ onClick }) {
    return (
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
