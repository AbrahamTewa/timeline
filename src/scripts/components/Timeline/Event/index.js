import React from 'react';
import PropTypes from 'prop-types';

import TextMode from './TextMode';
import EventForm from '../EventForm';

import {scrollIfNeeded} from '../../../utils';

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

    onSubmit({description, label}) {

        this.disableEdition();
        this.props.onChange( { description
                             , label
                             , uuid : this.props.uuid});
    }

    /**
     * If the edition mode has change, then we scroll to the element
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if (!this.dom)
            return;

        if (this.state.editionEnabled === prevState.editionEnabled)
            return;

        scrollIfNeeded(this.dom);
    }

    // ***** React methods *****

    render() {
        if (this.state.editionEnabled)
            return <EventForm description = {this.props.description}
                              label       = {this.props.label}
                              onCancel    = {this.disableEdition}
                              onSubmit    = {this.onSubmit}
                              ref         = {dom => this.dom = dom}/>;
        else
            return <TextMode description   = {this.props.description}
                             enableEdition = {this.enableEdition}
                             label         = {this.props.label}
                             ref           = {dom => this.dom = dom}
                             removeEvent   = {this.removeEvent} />;
    }

}

Event.propTypes = { description: PropTypes.string.isRequired
                  , label      : PropTypes.string.isRequired
                  , onChange   : PropTypes.func.isRequired
                  , onRemove   : PropTypes.func.isRequired
                  , uuid       : PropTypes.string.isRequired};

export default Event;
