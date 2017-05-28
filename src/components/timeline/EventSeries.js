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
function EventSeries({events, uuid}) {

    let reducer;

    reducer = function(eventList, event, index) {
        let eventUUID;

        eventUUID = uuid + '.' + index;

        eventList.push(<EventLabel label= {event.label}
                                   uuid = {uuid} />);

        eventList.push(<EventDescription description={event.description}
                                         uuid={eventUUID}/>);

    };

    return (<dl className="timeline-series">
                {events.reduce(reducer)}
            </dl>);

}

const eventPropType = { label: PropTypes.string.isRequired
                      , description: PropTypes.string.isRequired};

const eventsPropType = PropTypes.arrayOf(eventPropType).isRequired;

EventSeries.propTypes = { events : eventsPropType
                        , uuid   : PropTypes.string.isRequired};

// ******************** Export ********************
export default EventSeries;
export {eventsPropType};
