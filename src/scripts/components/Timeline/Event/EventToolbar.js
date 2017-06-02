import React from 'react';
import PropTypes from 'prop-types';


function EventToolbar({enableEdition, removeEvent}) {
    return (<div className="event-toolbar">
                <button className="btn btn-outline-primary btn-sm"
                        onClick={enableEdition}
                        type="button">
                    Modifier
                </button>
                <button className="btn btn-outline-secondary btn-sm"
                        onClick={removeEvent}
                        type="button">
                    Supprimer
                </button>
            </div>);

}

EventToolbar.propTypes = { enableEdition: PropTypes.func.isRequired
                         , removeEvent  : PropTypes.func.isRequired};

export default EventToolbar;
