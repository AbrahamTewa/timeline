import React from 'react';
import PropTypes from 'prop-types';

import EventToolbar from './EventToolbar';

function TextMode({ bubbuleURL
                  , description
                  , enableEdition
                  , label
                  , removeEvent}) {

    let style;

    style = {backgroundImage: `url('${bubbuleURL}')` };

    return (<div className="timeline-event"
                 data-mode="text">
                <a className="event-label">{label}</a>
                <EventToolbar enableEdition={enableEdition}
                              removeEvent={removeEvent}/>
                <div className="event-content">
                    <div className="event-description"
                         dangerouslySetInnerHTML={{__html: description}}/>
                    <div className="bubbule"
                         style={style}>
                    </div>
                </div>
            </div>);
}

TextMode.propTypes = { bubbuleURL    : PropTypes.string
                     , description   : PropTypes.string.isRequired
                     , enableEdition : PropTypes.func.isRequired
                     , label         : PropTypes.string.isRequired
                     , removeEvent   : PropTypes.func.isRequired};

export default TextMode;
