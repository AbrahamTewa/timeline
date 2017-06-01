// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';

// ******************** Container ********************

function Time({onChange, time}) {
    return (<EditableText className="timeline-time"
                          label={time}
                          onChange={onChange} />);
}

Time.propTypes = { onChange: PropTypes.func.isRequired
                 , time    : PropTypes.string.isRequired};

// ******************** Export ********************
export default Time;
