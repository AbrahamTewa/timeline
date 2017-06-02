import { connect } from 'react-redux';
import TimelineComponent from '../components/Timeline';
import {addEvent,
        removeEvent,
        renameMarker,
        updateEvent} from '../redux/timeline';

function mapDispatchToProps(dispatch) {
    return { onEventChange      : data     => dispatch(updateEvent(data))
           , onEventRemove      : ({uuid}) => dispatch(removeEvent({uuid}))
           , onMarkerTimeUpdate : data     => dispatch(renameMarker(data))
           , onNewEvent         : data     => dispatch(addEvent(data))};
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

            return { description: event.description
                   , label      : event.label
                   , uuid       : event.uuid};
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
