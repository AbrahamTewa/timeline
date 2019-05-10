// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import modules
import EventToolbar from './EventToolbar';

// ============================================================
// Component
function TextMode({
    illustrationURL,
    description,
    enableEdition,
    label,
    removeEvent,
    uuid,
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
            <a className="event-label" href={`#event-${uuid}`}>{label}</a>
            <EventToolbar
                enableEdition={enableEdition}
                removeEvent={removeEvent}
            />
            <div className="event-content">
                <div
                    className="event-description"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html : description }}
                />
                {bubbule}
            </div>
        </div>
    );
}

TextMode.defaultProps = {
    illustrationURL : undefined,
};

TextMode.propTypes = {
    illustrationURL : PropTypes.string,
    label           : PropTypes.string.isRequired,
    description     : PropTypes.string.isRequired,
    uuid            : PropTypes.string.isRequired,
    enableEdition   : PropTypes.func.isRequired,
    removeEvent     : PropTypes.func.isRequired,
};

// ============================================================
// Exports
export default TextMode;
