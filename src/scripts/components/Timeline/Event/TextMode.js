// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import modules
import EventToolbar from './EventToolbar';
import { eventAttributePropTypes } from './Event';

// ============================================================
// Component
function TextMode({
    illustrationURL,
    description,
    enableEdition,
    label,
    removeEvent,
}) {
    let bubbule;

    const style = { backgroundImage : `url('${illustrationURL}')` };

    if (illustrationURL) {
        bubbule = (
            <div
                className="bubbule"
                style={style}
            />
        );
    }

    return (
        <div
            className="timeline-event"
            data-mode="text"
        >
            <a className="event-label">{label}</a>
            <EventToolbar
                enableEdition={enableEdition}
                removeEvent={removeEvent}
            />
            <div className="event-content">
                <div
                    className="event-description"
                    dangerouslySetInnerHTML={{ __html : description }}
                />
                {bubbule}
            </div>
        </div>
    );
}

TextMode.propTypes = {
    ...eventAttributePropTypes,
    enableEdition : PropTypes.func.isRequired,
    removeEvent   : PropTypes.func.isRequired,
};

// ============================================================
// Exports
export default TextMode;
