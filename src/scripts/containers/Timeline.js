import { connect } from 'react-redux';
import TimelineComponent from '../components/Timeline';
import {renameMarker} from '../redux/timeline';

function mapDispatchToProps(dispatch) {
    return {onMarkerTimeUpdate: ({uuid, label}) => { dispatch(renameMarker({uuid, label})); }};
}

/**
 *
 * @param {ReduxStore} state
 */
function mapStateToProps (state) {
    let props;

    props = {};

    props.markers = state.timeline.markers.map(function (marker) {
        let events;

        events = marker.events.map(function(uuid) {
            let event;

            event = state.timeline.events[uuid];

            return { description: event.description
                   , label      : event.label
                   , uuid       : event.uuid};
        });

        return { events
               , time : marker.label
               , uuid : marker.uuid};
    });

    return props;
}

const Timeline = connect(mapStateToProps, mapDispatchToProps)(TimelineComponent);

export default Timeline;
