// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import modules
import TextEditor from '../TextEditor';

import { scrollIfNeeded } from '../../utils';

// ============================================================
// Exports
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

    // ==================================================
    // Lifecycle
    componentDidMount() {
        if (this.props.autoScroll) {
            scrollIfNeeded(this.form);
        }
    }

    // ==================================================
    // Event listeners

    /**
     *
     * @param {Event} event
     */
    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit({
            illustrationURL : this.bubbuleInput.value,
            description     : this.descriptionEditor.getValue(),
            label           : this.labelInput.value,
        });
    }

    // ==================================================
    // Getter
    getBubbuleURL() {
        return this.bubbuleInput.value;
    }

    getDescription() {
        return this.descriptionEditor.getValue();
    }

    getLabel() {
        return this.labelInput.value;
    }

    // ==================================================
    // Renderer

    render() {
        return (
            <form
                className="form-event"
                onSubmit={this.onSubmit}
                ref={(form) => {
                    this.form = form;
                }}
            >

                <div className="form-group row no-gutters">
                    <label htmlFor="event">Évènement</label>
                    <input
                        className="form-control"
                        defaultValue={this.props.label}
                        id="event"
                        placeholder="Nom de l'évènement"
                        ref={(input) => {
                            this.labelInput = input;
                        }}
                        type="text"
                    />
                </div>

                <div className="form-group row no-gutters">
                    <label htmlFor="event">Bubbule</label>
                    <input
                        className="form-control"
                        defaultValue={this.props.illustrationURL}
                        id="event"
                        placeholder="URL de l'image d'illustration"
                        ref={(input) => {
                            this.bubbuleInput = input;
                        }}
                        type="text"
                    />
                </div>

                <div className="form-group row no-gutters">
                    <label htmlFor="description">Description</label>
                    <TextEditor
                        id="description"
                        className="form-control"
                        initialValue={this.props.description}
                        placeholder="Description"
                        ref={(editor) => {
                            this.descriptionEditor = editor;
                        }}
                        rows={5}
                    />
                </div>

                <div className="form-event_actions">
                    <input
                        className="btn btn-primary btn-sm"
                        type="submit"
                        value="Ajouter évènement"
                    />
                    <input
                        className="btn btn-secondary btn-sm"
                        onClick={this.props.onCancel}
                        type="button"
                        value="Annuler"
                    />
                </div>
            </form>
        );
    }
}

EventForm.defaultProps = {
    autoScroll      : false,
    illustrationURL : '',
    description     : '',
    label           : '',
};

EventForm.propTypes = {
    autoScroll      : PropTypes.bool,
    illustrationURL : PropTypes.string,
    description     : PropTypes.string,
    label           : PropTypes.string,
    onCancel        : PropTypes.func.isRequired,
    onSubmit        : PropTypes.func.isRequired,
};

// ============================================================
// Exports
export default EventForm;
