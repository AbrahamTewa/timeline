// ******************** NodeJS Packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Component ********************
function AddButton({onClick}) {

    return ( <button className="btn btn-primary btn-sm"
                     onClick={onClick}>
                + Évènement
            </button>);

}

AddButton.propTypes = {onClick: PropTypes.func.isRequired};

// ******************** Exports ********************
export default AddButton;
