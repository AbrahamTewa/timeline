import React from 'react';
import PropTypes from 'prop-types';

import TextEditor from '../TextEditor';

import {scrollIfNeeded} from '../../utils';

class EventForm extends React.Component {

    /**
     *
     * @param {Object} props
     * @param {boolean} props.autoScroll If true, the window will scroll to the component
     *                                   when mounted if needed
     */
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    getBubbuleURL() {
        return this.bubbuleInput.value;
    }

    getDescription() {
        return this.descriptionEditor.getValue();
    }

    getLabel() {
        return this.labelInput.value;
    }


    // ********** Event methods **********

    /**
     *
     * @param {Event} event
     */
    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit({ bubbuleURL : this.bubbuleInput.value
                            , description: this.descriptionEditor.getValue()
                            , label      : this.labelInput.value});
    }

    // ********** React methods **********

    componentDidMount() {
        if (this.props.autoScroll)
            scrollIfNeeded(this.form);
    }

    render() {
        return (<form className = "form-event"
                      onSubmit  = {this.onSubmit}
                      ref       = {form => this.form = form}>

                    <div className="form-group row no-gutters">
                        <label htmlFor="event">Évènement</label>
                        <input className    = "form-control"
                               defaultValue = {this.props.label}
                               id           = "event"
                               placeholder  = "Nom de l'évènement"
                               ref          = {input => this.labelInput = input}
                               type         = "text"/>
                    </div>

                    <div className="form-group row no-gutters">
                        <label htmlFor="event">Bubbule</label>
                        <input className    = "form-control"
                               defaultValue = {this.props.bubbuleURL}
                               id           = "event"
                               placeholder  = "Bubble"
                               ref          = {input => this.bubbuleInput = input}
                               type         = "text"/>
                    </div>

                    <div className="form-group row no-gutters">
                        <label htmlFor="description">Description</label>
                        <TextEditor className    = "form-control"
                                    initialValue = {this.props.description}
                                    placeholder  = "Description"
                                    ref          = {editor => this.descriptionEditor = editor}
                                    rows         = {5}/>
                    </div>

                    <div className="form-event_actions">
                        <input className="btn btn-primary btn-sm"
                               type="submit"
                               value="Ajouter évènement" />
                        <input className="btn btn-secondary btn-sm"
                               onClick={this.props.onCancel}
                               type="button"
                               value="Annuler" />
                    </div>
                </form>);
    }
}

EventForm.propTypes = { autoScroll : PropTypes.bool
                      , bubbuleURL : PropTypes.string
                      , description: PropTypes.string
                      , label      : PropTypes.string
                      , onCancel   : PropTypes.func.isRequired
                      , onSubmit   : PropTypes.func.isRequired};

export default EventForm;
