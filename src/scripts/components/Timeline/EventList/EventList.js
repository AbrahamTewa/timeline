// ******************** Imports ********************
import PropTypes from 'prop-types';
import React     from 'react';
import ReactDOM  from 'react-dom';

import ListItem from './ListItem';
import {eventAttributePropTypes} from '../Event';

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

        this.state = {dragEnabled : false};
    }

    getNode() {
        // eslint-disable-next-line react/no-find-dom-node
        return ReactDOM.findDOMNode(this);
    }

    onStop(event, {item}) {
        let eventNode;
        let marker;
        let position;

        eventNode = item.get(0);
        marker    = eventNode.parentElement.parentElement.id;
        position  = Array.prototype.slice.call(this.getNode().children).indexOf(eventNode);

        $(this.getNode()).sortable('cancel');
        console.log('onStop');
        this.props.onEventMoved({ event : item.get(0).dataset.uuid
                                , marker
                                , position});
    }

    // ***** React methods *****
    componentDidMount() {
        let sortableConfig;
        sortableConfig = { axis                 : 'y'
                         , connectWith          : '.timeline-event-list'
                         , cursorAt             : { left: 5
                                                  , top : 0}
                         , forcePlaceholderSize : true
                         , handle               : 'div.reorder'
                         , helper               : 'clone'
                         , placeholder          : 'ui-sortable-placeholder'

                           // Events jQuery
                         , deactivate           : (event, ui) => {ui.item.attr('style', ''); }
                         , stop                 : this.onStop.bind(this)};

        console.log('componentDidMount');
        $(this.getNode()).sortable(sortableConfig);
    }

    componentWillUnmount() {
        $(this.getNode()).sortable('destroy');
    }

    // Event listeners
    render() {
        let events;

        events = this.props.events.map(function(event) {
            return  <ListItem event         = {event}
                              key           = {event.uuid}
                              onEventChange = {this.props.onEventChange}
                              onEventRemove = {this.props.onEventRemove}/>;
        }.bind(this));

        return (<ul className="timeline-event-list">
                    {events}
                </ul>);
    }

}

const eventsPropType = PropTypes.arrayOf(PropTypes.shape(eventAttributePropTypes)).isRequired;

EventList.propTypes = { events        : eventsPropType
                      , onEventChange : PropTypes.func.isRequired
                      , onEventMoved  : PropTypes.func.isRequired
                      , onEventRemove : PropTypes.func.isRequired};

// ******************** Export ********************
export default EventList;
export {eventsPropType};
