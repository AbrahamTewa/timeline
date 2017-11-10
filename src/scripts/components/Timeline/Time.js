// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import modules
import EditableText from '../EditableText';

// ============================================================
// Components

function Time({onChange, time}) {
    return (<EditableText className="timeline-time"
                          label={time}
                          onChange={onChange} />);
}

Time.propTypes = { onChange: PropTypes.func.isRequired
                 , time    : PropTypes.string.isRequired};

// ============================================================
// Exports
export default Time;
