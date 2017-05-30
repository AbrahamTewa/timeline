// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Container ********************

function Input({onkeypress, title}) {

    return (<input
                type="text"
                value={title}
                onChange={onkeypress} />);

}

Input.propTypes = { onkeypress: PropTypes.func
                  , title     : PropTypes.string.isRequired};

// ******************** Export ********************
export default Input;
