import { connect } from 'react-redux';
import TimelineComponent from '../components/Timeline';
import { addEvent
       , moveEvent
       , removeEvent
       , renameMarker
       , updateEvent} from '../redux/timeline';

function mapDispatchToProps(dispatch) {
    return { onEventChange      : data => dispatch(updateEvent(data))
           , onEventMoved       : data => dispatch(moveEvent(data))
           , onEventRemove      : data => dispatch(removeEvent(data))
           , onMarkerTimeUpdate : data => dispatch(renameMarker(data))
           , onNewEvent         : data => dispatch(addEvent(data))};
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
