// ******************** Imports ********************
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import ListItem from './ListItem';
import { eventAttributePropTypes } from '../Event';

// ******************** Container ********************
class EventList extends React.Component {
    /**
     * @param {Object} props
     * @param {Array.<{label: string, description: string}>} props.events
     * @param {string} props.uuid
     * @returns {XML}
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = { dragEnabled : false };
    }

    // ============================================================
    // React lifecycle
    componentDidMount() {
        const sortableConfig = {
            axis        : 'y',
            connectWith : '.timeline-event-list',
            cursorAt    : {
                left : 5,
                top  : 0,
            },
            forcePlaceholderSize : true,
            handle               : 'div.reorder',
            helper               : 'clone',
            placeholder          : 'ui-sortable-placeholder',

            // Events jQuery
            deactivate : (event, ui) => {
                ui.item.attr('style', '');
            },
            stop : this.onStop.bind(this),
        };

        $(this.getNode()).sortable(sortableConfig);
    }

    componentWillUnmount() {
        $(this.getNode()).sortable('destroy');
    }

    // ============================================================
    // Event listeners
    onStop(event, { item }) {
        const eventNode = item.get(0);
        const marker = eventNode.parentElement.parentElement.id;
        const position = Array.prototype.slice.call(this.getNode().children).indexOf(eventNode);

        $(this.getNode()).sortable('cancel');
        this.props.onEventMoved({
            event : item.get(0).dataset.uuid,
            marker,
            position,
        });
    }

    // ============================================================
    // Getters
    getNode() {
        // eslint-disable-next-line react/no-find-dom-node
        return ReactDOM.findDOMNode(this);
    }

    // ============================================================
    // Renderer
    render() {
        const events = this.props.events.map(event => (
            <ListItem
                event={event}
                key={event.uuid}
                onEventChange={this.props.onEventChange}
                onEventRemove={this.props.onEventRemove}
            />
        ));

        return (
            <ul className="timeline-event-list">
                {events}
            </ul>
        );
    }
}

const eventsPropType = PropTypes.arrayOf(PropTypes.shape(eventAttributePropTypes)).isRequired;

EventList.defaultProps = {
    events : undefined,
};

EventList.propTypes = {
    events        : eventsPropType,
    onEventChange : PropTypes.func.isRequired,
    onEventMoved  : PropTypes.func.isRequired,
    onEventRemove : PropTypes.func.isRequired,
};

// ******************** Export ********************
export default EventList;
export { eventsPropType };
