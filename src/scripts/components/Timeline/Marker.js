// ******************** Imports ********************
import { default as EventList
       , eventsPropType} from './EventList';

import PropTypes from 'prop-types';
import React     from 'react';
import Time      from './Time';
import AddEvent from './AddEvent';

// ******************** Container ********************

class Marker extends React.Component {

    /**
     * @param {Object}                 props
     * @param {Timeline.Event[]}       props.events
     * @param {function(label:string)} props.onTimeUpdate - Callback to execute when the
     *                                                      user change the time of the marker
     * @param {string}                 props.time
     * @param {string}                 props.uuid
     * @returns {XML}
     * @constructor
     */
    constructor(props) {
        super(props);

        this.onNewEvent   = this.onNewEvent.bind(this);
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
    }

    /**
     * Called when the time is updated by the update
     * @param {string} time
     */
    onTimeUpdate(time) {
        this.props.onTimeUpdate({ label: time
                                , uuid : this.props.uuid});
    }

    /**
     *
     * @param {string} description
     * @param {string} label
     */
    onNewEvent({description, label}) {
        let event;

        event = { description
                , label
                , marker : this.props.uuid};

        this.props.onNewEvent(event);
    }

    render() {
        return (<div className="timeline-marker" id={this.props.uuid}>
                    <Time onChange={this.onTimeUpdate}
                          time={this.props.time}/>
                    <EventList events        = {this.props.events}
                               onEventChange = {this.props.onEventChange}
                               onEventRemove = {this.props.onEventRemove}/>
                    <AddEvent onNewEvent={this.onNewEvent}/>
                </div>);
    }

}

Marker.propTypes = { events        : eventsPropType
                   , onEventChange : PropTypes.func.isRequired
                   , onEventRemove : PropTypes.func.isRequired
                   , onNewEvent    : PropTypes.func.isRequired
                   , onTimeUpdate  : PropTypes.func.isRequired
                   , time          : PropTypes.string.isRequired
                   , uuid          : PropTypes.string.isRequired};

// ******************** Export ********************
export default Marker;
