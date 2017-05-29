// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

import Marker from './Marker';

// ******************** Container ********************

/**
 *
 * @param {string}                  id
 * @param {Props.Timeline.Marker[]} markers
 * @returns {XML}
 * @constructor
 */
function Timeline({ id      = 'timeliner'
                  , markers = []}) {

    let markerList;

    markerList = markers.map(function({events, time, uuid}) {
        return (<Marker events = {events}
                        time   = {time}
                        key    = {uuid}
                        uuid   = {uuid}/>);
    });

    return (<div id={id}>
                {markerList}
            </div>);

}

Timeline.propTypes = { id      : PropTypes.string.isRequired
                     , markers : PropTypes.array};

// ******************** Export ********************
export default Timeline;
