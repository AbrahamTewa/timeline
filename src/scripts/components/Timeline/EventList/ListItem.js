// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import modules
import Event, { eventAttributePropTypes } from '../Event';

// ============================================================
// Component
function ListItem({
    event,
    onEventChange,
    onEventRemove,
}) {
    return (
        <li data-uuid={event.uuid}>
            <div className="reorder">
                <i className="fa fa-reorder" />
            </div>
            <Event
                description={event.description}
                illustrationURL={event.illustrationURL}
                label={event.label}
                onChange={onEventChange}
                onRemove={onEventRemove}
                uuid={event.uuid}
            />
        </li>
    );
}

ListItem.defaultProps = {
    event : {},
};

ListItem.propTypes = {
    event         : PropTypes.shape(eventAttributePropTypes),
    onEventChange : PropTypes.func.isRequired,
    onEventRemove : PropTypes.func.isRequired,
};

// ============================================================
// Exports
export default ListItem;
