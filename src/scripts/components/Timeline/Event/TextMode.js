import React     from 'react';
import PropTypes from 'prop-types';

import EventToolbar from './EventToolbar';
import {eventAttributePropTypes} from './Event';

function TextMode({ bubbuleURL
                  , description
                  , enableEdition
                  , label
                  , removeEvent}) {

    let bubbule;
    let style;

    style = {backgroundImage: `url('${bubbuleURL}')` };

    if (bubbuleURL)
        bubbule = <div className="bubbule"
                       style={style}>
                  </div>;

    return (<div className   = "timeline-event"
                 data-mode   = "text">
                <a className = "event-label">{label}</a>
                <EventToolbar enableEdition={enableEdition}
                              removeEvent={removeEvent}/>
                <div className="event-content">
                    <div className="event-description"
                         dangerouslySetInnerHTML={{__html: description}}/>
                    {bubbule}
                </div>
            </div>);
}

TextMode.propTypes = { ...eventAttributePropTypes
                     , enableEdition : PropTypes.func.isRequired
                     , removeEvent   : PropTypes.func.isRequired};

export default TextMode;
