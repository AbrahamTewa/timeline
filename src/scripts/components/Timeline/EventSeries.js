// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

import EventLabel from './EventLabel';
import EventDescription from './EventDescription';

// ******************** Container ********************

class EventSeries extends React.Component {

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

    /**
     *
     * @param {string} uuid
     * @param {string} label
     */
    onLabelChange(uuid, label) {
        this.props.onEventLabelChange({label, uuid});
    }

    /**
     *
     * @param {string} uuid
     * @param {string} description
     */
    onDescriptionChange(uuid, description) {
        this.props.onEventDescriptionChange({description, uuid});
    }

    render() {
        let reducer;

        reducer = function(eventList, event) {
            let onChange;

            onChange = this.onLabelChange.bind(this, event.uuid);

            eventList.push(<EventLabel label    = {event.label}
                                       key      = {event.uuid}
                                       onChange = {onChange}
                                       uuid     = {event.uuid} />);

            eventList.push(<EventDescription description = {event.description}
                                             key         = {event.uuid + 'EX'}
                                             uuid        = {event.uuid}/>);

            return eventList;
        }.bind(this);

        return (<dl className="timeline-series">
                    {this.props.events.reduce(reducer, [])}
                </dl>);
    }

}

const eventPropType = PropTypes.shape({ label             : PropTypes.string.isRequired
                                      , description       : PropTypes.string.isRequired});

const eventsPropType = PropTypes.arrayOf(eventPropType).isRequired;

EventSeries.propTypes = { events                  : eventsPropType
                        , onEventDescriptionChange: PropTypes.func.isRequired
                        , onEventLabelChange      : PropTypes.func.isRequired};

// ******************** Export ********************
export default EventSeries;
export {eventsPropType};
