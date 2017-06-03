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
        let dragModeClass;
        let markerList;

        let {onNewEvent, onMarkerTimeUpdate} = this.props;

        markerList = this.props.markers.map(function({events, time, uuid}) {
            return (<Marker events        = {events}
                            key           = {uuid}
                            onEventChange = {this.props.onEventChange}
                            onEventMoved  = {this.props.onEventMoved}
                            onEventRemove = {this.props.onEventRemove}
                            onNewEvent    = {onNewEvent}
                            onTimeUpdate  = {onMarkerTimeUpdate}
                            time          = {time}
                            uuid          = {uuid}/>);
        }.bind(this));

        dragModeClass = this.props.dragModeEnabled ? 'dragMode' : '';

        return (<div className={`timeline ${dragModeClass}`}
                     id={this.props.id}>
                    <button className="timeline-toggle">+ expand all</button>
                    <br className="clear"/>
                    {markerList}
                </div>);
    }

}

Timeline.propTypes = { dragModeEnabled    : PropTypes.bool.isRequired
                     , id                 : PropTypes.string.isRequired
                     , onEventChange      : PropTypes.func.isRequired
                     , onEventMoved       : PropTypes.func.isRequired
                     , onEventRemove      : PropTypes.func.isRequired
                     , onNewEvent         : PropTypes.func.isRequired
                     , onMarkerTimeUpdate : PropTypes.func.isRequired
                     , markers            : PropTypes.array};

// ******************** Export ********************
export default Timeline;
