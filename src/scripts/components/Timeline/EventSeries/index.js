// ******************** Imports ********************
import React     from 'react';
import PropTypes from 'prop-types';

import Label       from './Label';
import Description from './Description';

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

    render() {
        let reducer;

        reducer = function(eventList, event) {
            eventList.push(<span className="tick tick-after"
                                 key={event.uuid + '.tick.before'}> </span>);
            eventList.push(<Label label    = {event.label}
                                  key      = {event.uuid}
                                  onChange = {this.props.onEventLabelChange}
                                  uuid     = {event.uuid} />);
            eventList.push(<span className="tick tick-after"
                                 key={event.uuid + '.tick.after'}> </span>);

            eventList.push(<Description description = {event.description}
                                        key         = {event.uuid + 'EX'}
                                        onChange    = {this.props.onEventDescriptionChange}
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
