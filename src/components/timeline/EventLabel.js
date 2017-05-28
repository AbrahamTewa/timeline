// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Container ********************

/**
 *
 * @param {string} label
 * @param {string} uuid
 * @returns {XML}
 * @constructor
 */
function EventLabel({label, uuid}) {

    return (<dt className="timeline-event"
                id={uuid}>
                <a>{label}</a>
            </dt>);

}

EventLabel.propTypes = { label : PropTypes.string.isRequired
                       , uuid  : PropTypes.string.isRequired};

// ******************** Export ********************
export default EventLabel;
