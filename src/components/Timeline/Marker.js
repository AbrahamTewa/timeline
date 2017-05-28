// ******************** Imports ********************
import { default as EventSeries
       , eventsPropType} from './EventSeries';

import PropTypes from 'prop-types';
import React     from 'react';
import Time      from './Time';

// ******************** Container ********************

/**
 *
 * @param {Timeline.Event[]} events
 * @param {string}           label
 * @param {string}           uuid
 * @returns {XML}
 * @constructor
 */
function Marker({events, label, uuid}) {

    return (<div className="timeline-wrapper" id={uuid}>
                <Time time={label} />
                <EventSeries events={events}/>
            </div>);

}

Marker.propTypes = { ...Time.propTypes
                   , events: eventsPropType
                   , uuid  : PropTypes.string.isRequired};

// ******************** Export ********************
export default Marker;
