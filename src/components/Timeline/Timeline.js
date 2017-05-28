// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

import Marker from './Marker';

// ******************** Container ********************

/**
 *
 * @param {string}                  id
 * @param {Store.Timeline.Marker[]} markers
 * @returns {XML}
 * @constructor
 */
function Timeline({id, markers = []}) {

    let markerList;

    markerList = markers.map(function({events, label}, index) {
        return (<Marker events={events}
                        label={label}
                        key={index}
                        uuid={'timeline.' + id}/>);
    });

    return (<div id={id}>
                {markerList}
            </div>);

}

Timeline.propTypes = { id      : PropTypes.string.isRequired
                     , markers : PropTypes.array};

// ******************** Export ********************
export default Timeline;
