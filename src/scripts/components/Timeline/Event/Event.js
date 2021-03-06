import React     from 'react';
import ReactDOM  from 'react-dom';
import PropTypes from 'prop-types';

import TextMode  from './TextMode';
import EventForm from '../EventForm';

class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editionEnabled: undefined};

        this.disableEdition = this.disableEdition.bind(this);
        this.enableEdition  = this.enableEdition.bind(this);
        this.onCancel       = this.onCancel.bind(this);
        this.onSubmit       = this.onSubmit.bind(this);
        this.removeEvent    = this.removeEvent.bind(this);
    }

    disableEdition() {
        let state;

        state = { ...this.state
                , editionEnabled: false};

        this.setState(state);
    }

    enableEdition() {
        let state;

        state = { ...this.state
                , editionEnabled: true};

        this.setState(state);
    }

    removeEvent() {
        if (!window.confirm('Confirmer la suppression de l\'évènement ?'))
            return;

        this.props.onRemove({uuid: this.props.uuid});
    }

    // ***** Event handlers *****
    onCancel() {
        this.disableEdition();
    }

    onSubmit(data) {
        this.disableEdition();
        this.props.onChange( { data : {...data}
                             , uuid : this.props.uuid});
    }

    componentDidMount() {
        this.dom = this.node;
    }

    /**
     * If the edition mode has change, then we scroll to the element
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {

        if (this.state.editionEnabled === prevState.editionEnabled)
            return;

        // eslint-disable-next-line react/no-find-dom-node
        ReactDOM.findDOMNode(this).scrollIntoView();
    }

    // ***** React methods *****

    render() {
        if (this.state.editionEnabled)
            return <EventForm description     = {this.props.description}
                              illustrationURL = {this.props.illustrationURL}
                              label           = {this.props.label}
                              onCancel        = {this.disableEdition}
                              onSubmit        = {this.onSubmit}/>;
        else
            return <TextMode description     = {this.props.description}
                             enableEdition   = {this.enableEdition}
                             illustrationURL = {this.props.illustrationURL}
                             label           = {this.props.label}
                             removeEvent     = {this.removeEvent}/>;
    }
}

const eventAttributePropTypes = { illustrationURL : PropTypes.string
                                , label           : PropTypes.string.isRequired
                                , description     : PropTypes.string.isRequired
                                , uuid            : PropTypes.string.isRequired};

Event.propTypes = { ...eventAttributePropTypes
                  , onChange   : PropTypes.func.isRequired
                  , onRemove   : PropTypes.func.isRequired};

export default Event;

export {eventAttributePropTypes};
