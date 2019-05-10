// ============================================================
// Import packages
import { connect } from 'react-redux';

// ============================================================
// Import modules
import { Timeline as TimelineComponent } from '../components';
import {
    timeline,
} from '../redux';

// ============================================================
// Functions
function mapDispatchToProps(dispatch) {
    return {
        onEventChange      : params => dispatch(timeline.updateEvent(params)),
        onEventMoved       : params => dispatch(timeline.moveEvent(params)),
        onEventRemove      : params => dispatch(timeline.removeEvent(params)),
        onMarkerTimeUpdate : params => dispatch(timeline.renameMarker(params)),
        onNewEvent         : params => dispatch(timeline.addEvent(params)),
    };
}

/**
 *
 * @param {ReduxStore} state
 */
function mapStateToProps(state) {
    const props = { dragModeEnabled : false };

    props.markers = state.timeline.markers.map((marker) => {
        const events = marker.events.map(uuid => state.timeline.events[uuid]);

        return {
            dragModeEnabled : false,
            events,
            time            : marker.label,
            uuid            : marker.uuid,
        };
    });

    return props;
}

const CurrentTimeline = connect(mapStateToProps, mapDispatchToProps)(TimelineComponent);

// ============================================================
// Exports
export default CurrentTimeline;
