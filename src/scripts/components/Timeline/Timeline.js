// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

import Marker from './Marker';

// ******************** Container ********************

/**
 *
 * @param {function(object)}        onMarkerTimeUpdate
 * @param {function(object)}        onNewEvent
 * @param {string}                  id
 * @param {Props.Timeline.Marker[]} markers
 * @returns {XML}
 * @constructor
 */
function Timeline({ onMarkerTimeUpdate
                  , onNewEvent
                  , id      = 'timeliner'
                  , markers = []}) {

    let markerList;

    markerList = markers.map(function({events, time, uuid}) {
        return (<Marker events       = {events}
                        key          = {uuid}
                        onNewEvent   = {onNewEvent}
                        onTimeUpdate = {onMarkerTimeUpdate}
                        time         = {time}
                        uuid         = {uuid}/>);
    });

    return (<div id={id} className="timeline-container">
                {markerList}
            </div>);

}

Timeline.propTypes = { id                 : PropTypes.string.isRequired
                     , onNewEvent         : PropTypes.func.isRequired
                     , onMarkerTimeUpdate : PropTypes.func.isRequired
                     , markers            : PropTypes.array};

// ******************** Export ********************
export default Timeline;
