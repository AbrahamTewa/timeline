import { connect } from 'react-redux';
import TimelineComponent from '../components/Timeline';
import { addEvent
       , moveEvent
       , removeEvent
       , renameMarker
       , updateEvent} from '../redux/timeline';

function mapDispatchToProps(dispatch) {
    return { onEventChange      : params => dispatch(updateEvent(params))
           , onEventMoved       : params => dispatch(moveEvent(params))
           , onEventRemove      : params => dispatch(removeEvent(params))
           , onMarkerTimeUpdate : params => dispatch(renameMarker(params))
           , onNewEvent         : params => dispatch(addEvent(params))};
}

/**
 *
 * @param {ReduxStore} state
 */
function mapStateToProps (state) {
    let props;

    props = {dragModeEnabled: false};

    props.markers = state.timeline.markers.map(function (marker) {
        let events;

        events = marker.events.map(function(uuid) {
            let event;

            event = state.timeline.events[uuid];

            return event;
        });

        return { dragModeEnabled : false
               , events
               , time : marker.label
               , uuid : marker.uuid};
    });

    return props;
}

const CurrentTimeline = connect(mapStateToProps, mapDispatchToProps)(TimelineComponent);

export default CurrentTimeline;
