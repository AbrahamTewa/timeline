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
function Timeline({ id      = 'timeline'
                  , markers = []}) {

    let markerList;

    markerList = markers.map(function({events, label, uuid}) {
        return (<Marker events={events}
                        label={label}
                        key={uuid}
                        uuid={uuid}/>);
    });

    return (<div id={id}>
                {markerList}
            </div>);

}

Timeline.propTypes = { id      : PropTypes.string.isRequired
                     , markers : PropTypes.array};

// ******************** Export ********************
export default Timeline;
