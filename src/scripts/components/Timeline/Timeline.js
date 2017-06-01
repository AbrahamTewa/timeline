// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

import Marker from './Marker';

// ******************** Container ********************

/**
 * @property {Object} state
 * @property {boolean} state.pluginApplied - Indicate if the timeliner plugin
 *                                           has been applied (true) or not (false
 */
class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pluginApplied : false};
    }

    applyPlugin() {
        $.timeliner({timelineContainer: '#' + this.props.id});

        this.setState({ ...this.state
                      , pluginApplied: true});
    }

    componentDidUpdate() {
        if (!this.state.pluginApplied && this.props.markers.length > 0)
            this.applyPlugin();
    }

    render() {
        let markerList;

        let {onNewEvent, onMarkerTimeUpdate} = this.props;

        markerList = this.props.markers.map(function({events, time, uuid}) {
            return (<Marker events       = {events}
                            key          = {uuid}
                            onNewEvent   = {onNewEvent}
                            onTimeUpdate = {onMarkerTimeUpdate}
                            time         = {time}
                            uuid         = {uuid}/>);
        });

        return (<div id={this.props.id} className="timeline-container">
                    {markerList}
                </div>);
    }

}

Timeline.propTypes = { id                 : PropTypes.string.isRequired
                     , onNewEvent         : PropTypes.func.isRequired
                     , onMarkerTimeUpdate : PropTypes.func.isRequired
                     , markers            : PropTypes.array};

// ******************** Export ********************
export default Timeline;
