import React from 'react';
import PropTypes from 'prop-types';

import EventToolbar from './EventToolbar';

function TextMode({ description
                  , enableEdition
                  , label
                  , removeEvent}) {
    return (<div className="timeline-event"
                 data-mode="text">
                <a className="event-label">{label}</a>
                <EventToolbar enableEdition={enableEdition}
                              removeEvent={removeEvent}/>
                <div className="event-description"
                     dangerouslySetInnerHTML={{__html: description}}/>
            </div>);
}

TextMode.propTypes = { description   : PropTypes.string.isRequired
                     , enableEdition : PropTypes.func.isRequired
                     , label         : PropTypes.string.isRequired
                     , removeEvent   : PropTypes.func.isRequired};

export default TextMode;
