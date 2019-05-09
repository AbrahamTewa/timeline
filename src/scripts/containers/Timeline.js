// ============================================================
// Import packages
import { connect } from 'react-redux';

// ============================================================
// Import modules
import TimelineComponent from '../components/Timeline';
import {
    addEvent,
    moveEvent,
    removeEvent,
    renameMarker,
    updateEvent,
} from '../redux/timeline';

// ============================================================
// Functions
function mapDispatchToProps(dispatch) {
    return {
        onEventChange      : params => dispatch(updateEvent(params)),
        onEventMoved       : params => dispatch(moveEvent(params)),
        onEventRemove      : params => dispatch(removeEvent(params)),
        onMarkerTimeUpdate : params => dispatch(renameMarker(params)),
        onNewEvent         : params => dispatch(addEvent(params)),
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
