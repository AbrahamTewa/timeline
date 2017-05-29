// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

import EventLabel from './EventLabel';
import EventDescription from './EventDescription';

// ******************** Container ********************

/**
 *
 * @param {Array.<{label: string, description: string}>} events
 * @param {string} uuid
 * @returns {XML}
 * @constructor
 */
function EventSeries({events}) {
    let reducer;

    reducer = function(eventList, event) {
        eventList.push(<EventLabel label= {event.label}
                                   key={event.uuid}
                                   uuid = {event.uuid} />);

        eventList.push(<EventDescription description={event.description}
                                         key={event.uuid + 'EX'}
                                         uuid={event.uuid + 'EX'}/>);

    };

    return (<dl className="timeline-series">
                {events.reduce(reducer)}
            </dl>);

}

const eventPropType = { label: PropTypes.string.isRequired
                      , description: PropTypes.string.isRequired};

const eventsPropType = PropTypes.arrayOf(eventPropType).isRequired;

EventSeries.propTypes = {events : eventsPropType};

// ******************** Export ********************
export default EventSeries;
export {eventsPropType};
