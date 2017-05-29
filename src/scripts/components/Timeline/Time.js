// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';
import EditableLabel from '../EditableLabel';

// ******************** Container ********************

function Time({onChange, time}) {
    return (<EditableLabel className="timeline-time"
                           label={time}
                           onChange={onChange} />);
}

Time.propTypes = { onChange: PropTypes.func.isRequired
                 , time    : PropTypes.string.isRequired};

// ******************** Export ********************
export default Time;
