// ******************** Imports ********************
import React     from 'react';
import PropTypes from 'prop-types';

import Event from './Event';

// ******************** Container ********************

class EventList extends React.Component {

    /**
     * @param {Object} props
     * @param {Array.<{label: string, description: string}>} props.events
     * @param {string} props.uuid
     * @returns {XML}
     * @constructor
     */
    constructor(props) {
        super(props);
    }

    render() {
        let events;

        events = this.props.events.map(function(event) {
            return <li key = {event.uuid}>
                       <Event bubbuleURL  = {event.bubbuleURL}
                              description = {event.description}
                              label       = {event.label}
                              onChange    = {this.props.onEventChange}
                              onRemove    = {this.props.onEventRemove}
                              uuid        = {event.uuid}/>;
                    </li>;
        }.bind(this));

        return (<ul className="timeline-event-list">
                    {events}
                </ul>);
    }

}

const eventPropType = PropTypes.shape({ label       : PropTypes.string.isRequired
                                      , description : PropTypes.string.isRequired
                                      , uuid        : PropTypes.string.isRequired});

const eventsPropType = PropTypes.arrayOf(eventPropType).isRequired;

EventList.propTypes = { events        : eventsPropType
                      , onEventChange : PropTypes.func.isRequired
                      , onEventRemove : PropTypes.func.isRequired};

// ******************** Export ********************
export default EventList;
export {eventsPropType};
