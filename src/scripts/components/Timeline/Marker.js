// ============================================================
// Imports packages
import PropTypes from 'prop-types';
import React     from 'react';

// ============================================================
// Modules
import { default as EventList
       , eventsPropType} from './EventList';

import Time      from './Time';
import AddEvent  from './AddEvent';

// ============================================================
// Component

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

    // ==============================
    // Event listeners
    /**
     * Called when the time is updated by the update
     * @param {string} time
     */
    onTimeUpdate(time) {
        this.props.onTimeUpdate({ label: time
                                , marker : this.props.uuid});
    }

    onNewEvent(data) {
        let event;

        event = { ...data
                , marker : this.props.uuid};

        this.props.onNewEvent(event);
    }

    // ==============================
    // React methods
    render() {

        let classNoEvents;

        classNoEvents = this.props.events.length === 0 ? 'empty' : '';

        return (<div className={'timeline-marker ' + classNoEvents}
                     data-uuid={this.props.uuid}
                     id={this.props.uuid}>
                    <Time onChange={this.onTimeUpdate}
                          time={this.props.time}/>
                    <EventList events        = {this.props.events}
                               onEventChange = {this.props.onEventChange}
                               onEventMoved  = {this.props.onEventMoved}
                               onEventRemove = {this.props.onEventRemove}/>
                    <AddEvent onNewEvent={this.onNewEvent}/>
                </div>);
    }

}

Marker.propTypes = { events        : eventsPropType
                   , onEventChange : PropTypes.func.isRequired
                   , onEventMoved  : PropTypes.func.isRequired
                   , onEventRemove : PropTypes.func.isRequired
                   , onNewEvent    : PropTypes.func.isRequired
                   , onTimeUpdate  : PropTypes.func.isRequired
                   , time          : PropTypes.string.isRequired
                   , uuid          : PropTypes.string.isRequired};

// ============================================================
// Exports
export default Marker;
