// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import modules
import Marker from './Marker';

// ============================================================
// Component

/**
 * @property {Object} state
 * @property {boolean} state.pluginApplied - Indicate if the timeliner plugin
 *                                           has been applied (true) or not (false
 */
class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pluginApplied : false };
    }

    componentDidUpdate() {
        if (!this.state.pluginApplied && this.props.markers.length > 0) {
            this.applyPlugin();
        }
    }

    applyPlugin() {
        $.timeliner({ timelineContainer : `#${this.props.id}` });

        this.setState(prevState => ({
            ...prevState,
            pluginApplied : true,
        }));
    }

    render() {
        const { onNewEvent, onMarkerTimeUpdate } = this.props;

        const markerList = this.props.markers.map(({ events, time, uuid }) => (
            <Marker
                events={events}
                key={uuid}
                onEventChange={this.props.onEventChange}
                onEventMoved={this.props.onEventMoved}
                onEventRemove={this.props.onEventRemove}
                onNewEvent={onNewEvent}
                onTimeUpdate={onMarkerTimeUpdate}
                time={time}
                uuid={uuid}
            />
        ));

        const dragModeClass = this.props.dragModeEnabled ? 'dragMode' : '';

        return (
            <div
                className={`timeline ${dragModeClass}`}
                id={this.props.id}
            >
                <button
                    className="timeline-toggle"
                    type="button"
                >
                    + expand all
                </button>
                <br className="clear" />
                {markerList}
            </div>
        );
    }
}

Timeline.defaultProps = {
    markers : undefined,
};

Timeline.propTypes = {
    dragModeEnabled    : PropTypes.bool.isRequired,
    id                 : PropTypes.string.isRequired,
    onEventChange      : PropTypes.func.isRequired,
    onEventMoved       : PropTypes.func.isRequired,
    onEventRemove      : PropTypes.func.isRequired,
    onNewEvent         : PropTypes.func.isRequired,
    onMarkerTimeUpdate : PropTypes.func.isRequired,
    markers            : PropTypes.instanceOf(Array),
};

// ============================================================
// Export
export default Timeline;
