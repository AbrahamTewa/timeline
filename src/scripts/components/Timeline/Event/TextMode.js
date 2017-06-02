import React from 'react';
import PropTypes from 'prop-types';

import EventToolbar from './EventToolbar';

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

    return (<div className="timeline-event"
                 data-mode="text">
                <a className="event-label">{label}</a>
                <EventToolbar enableEdition={enableEdition}
                              removeEvent={removeEvent}/>
                <div className="event-content">
                    <div className="event-description"
                         dangerouslySetInnerHTML={{__html: description}}/>
                    {bubbule}
                </div>
            </div>);
}

TextMode.propTypes = { bubbuleURL    : PropTypes.string
                     , description   : PropTypes.string.isRequired
                     , enableEdition : PropTypes.func.isRequired
                     , label         : PropTypes.string.isRequired
                     , removeEvent   : PropTypes.func.isRequired};

export default TextMode;
