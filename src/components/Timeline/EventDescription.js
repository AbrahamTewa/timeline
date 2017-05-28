// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Container ********************

/**
 *
 * @param {string} description
 * @param {string} uuid
 * @returns {XML}
 * @constructor
 */
function EventDescription({description, uuid}) {

    return (<dd className="timeline-event-content"
                id={uuid + 'EX'}>
                <p>{description}</p>
            </dd>);

}

EventDescription.propTypes = { description : PropTypes.string.isRequired
                             , uuid        : PropTypes.string.isRequired};

// ******************** Export ********************
export default EventDescription;
