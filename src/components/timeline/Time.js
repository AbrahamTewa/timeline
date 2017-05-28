// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Container ********************

/**
 *
 * @param {string} time
 * @returns {XML}
 * @constructor
 */
function Time({time}) {

    return (<h2 className="timeline-time">
                {time}
            </h2>);

}

Time.propTypes = { time : PropTypes.string.isRequired};

// ******************** Export ********************
export default Time;
