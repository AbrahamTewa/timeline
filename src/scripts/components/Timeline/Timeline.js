// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

import Marker from './Marker';

// ******************** Container ********************

/**
 *
 * @param {function(object)}        onMarkerTimeUpdate
 * @param {string}                  id
 * @param {Props.Timeline.Marker[]} markers
 * @returns {XML}
 * @constructor
 */
function Timeline({ onMarkerTimeUpdate
                  , id      = 'timeliner'
                  , markers = []}) {

    let markerList;

    markerList = markers.map(function({events, time, uuid}) {
        return (<Marker events       = {events}
                        key          = {uuid}
                        onTimeUpdate = {onMarkerTimeUpdate}
                        time         = {time}
                        uuid         = {uuid}/>);
    });

    return (<div id={id}>
                {markerList}
            </div>);

}

Timeline.propTypes = { id                 : PropTypes.string.isRequired
                     , onMarkerTimeUpdate : PropTypes.func.isRequired
                     , markers            : PropTypes.array};

// ******************** Export ********************
export default Timeline;
