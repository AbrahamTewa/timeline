import { connect } from 'react-redux';
import TimelineComponent from '../components/Timeline';
import {addEvent,
        renameMarker} from '../redux/timeline';

function mapDispatchToProps(dispatch) {

    function onMarkerTimeUpdate({label, uuid}) {
        let action;

        action = renameMarker({ label
                              , uuid});

        dispatch(action);
    }

    /**
     *
     * @param {string} description
     * @param {string} label
     * @param position
     * @param {string} marker
     */
    function onNewEvent({ description
                        , label
                        , position=-1
                        , marker}) {
        let action;

        action = addEvent({ description
                          , label
                          , marker
                          , position});

        dispatch(action);
    }

    return { onMarkerTimeUpdate
           , onNewEvent};
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

const CurrentTimeline = connect(mapStateToProps, mapDispatchToProps)(TimelineComponent);

export default CurrentTimeline;
