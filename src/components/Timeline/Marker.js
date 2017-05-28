// ******************** Imports ********************
import { default as EventSeries
       , eventsPropType} from './EventSeries';

import React from 'react';
import Time from './Time';

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

    return (<div className="timeline-wrapper">
                <Time time={label} />
                <EventSeries events={events}
                             uuid={uuid}/>
            </div>);

}

Marker.propTypes = { ...Time.propTypes
                   , events: eventsPropType};

// ******************** Export ********************
export default Marker;
