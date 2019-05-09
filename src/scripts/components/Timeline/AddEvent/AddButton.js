// ******************** NodeJS Packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Component ********************
function AddButton({ onClick }) {
    return (
        <button
            className="btn btn-outline-primary btn-sm"
            onClick={onClick}
            type="button"
        >
                + Évènement
        </button>
    );
}

AddButton.propTypes = { onClick : PropTypes.func.isRequired };

// ******************** Exports ********************
export default AddButton;
