// ******************** Imports ********************
import { default as EventSeries
       , eventsPropType} from './EventSeries';

import PropTypes from 'prop-types';
import React     from 'react';
import Time      from './Time';

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

    render() {
        return (<div className="timeline-wrapper" id={this.props.uuid}>
                    <Time onChange={this.onTimeUpdate}
                          time={this.props.time}/>
                    <EventSeries events={this.props.events}/>
                </div>);
    }

}

Marker.propTypes = { events       : eventsPropType
                   , onTimeUpdate : PropTypes.func.isRequired
                   , time         : PropTypes.string.isRequired
                   , uuid         : PropTypes.string.isRequired};

// ******************** Export ********************
export default Marker;
