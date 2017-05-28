// ******************** Imports ********************
import { default as EventSeries
       , eventsPropType} from './EventSeries';

import React from 'react';
import Time from './Time';

// ******************** Container ********************

/**
 *
 * @param {Timeline.Event[]} events
 * @param {string}           time
 * @param {string}           uuid
 * @returns {XML}
 * @constructor
 */
function Marker({events, time, uuid}) {

    return (<div className="timeline-wrapper">
                <Time time={time} />
                <EventSeries events={events}
                             uuid={uuid}/>
            </div>);

}

Marker.propTypes = { ...Time.propTypes
                   , events: eventsPropType};

// ******************** Export ********************
export default Marker;
