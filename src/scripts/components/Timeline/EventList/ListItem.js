import React     from 'react';
import PropTypes from 'prop-types';

import Event           from '../Event';
import {eventAttributePropTypes} from '../Event';

class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    // ********** React methods **********

    render() {
        return  <li data-uuid={this.props.event.uuid}>
                    <div className = "reorder">
                        <i className="fa fa-reorder" />
                    </div>
                    <Event bubbuleURL  = {this.props.event.bubbuleURL}
                           description = {this.props.event.description}
                           label       = {this.props.event.label}
                           onChange    = {this.props.onEventChange}
                           onRemove    = {this.props.onEventRemove}
                           uuid        = {this.props.event.uuid}/>
                </li>;
    }
}


ListItem.propTypes = { event         : PropTypes.shape(eventAttributePropTypes)
                     , onEventChange : PropTypes.func.isRequired
                     , onEventRemove : PropTypes.func.isRequired};


export default ListItem;
