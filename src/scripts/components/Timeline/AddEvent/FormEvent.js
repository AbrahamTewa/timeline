// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Container ********************
class FormEvent extends React.Component {

    /**
     *
     * @param {Object} props
     * @param {function({label: string, description: string})} props.onSubmit
     */
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     *
     * @param {Event} event
     */
    onSubmit(event) {
        event.preventDefault();
        this.props.onNewEvent({ label      : this.labelInput.value
                              , description: this.descriptionInput.value});
    }

    render() {
        return (<form className="form-event"
                      onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label htmlFor="event">Évènement</label>
                        <input className="form-control"
                               id="event"
                               placeholder="Nom de l'évènement"
                               ref={input => { this.labelInput = input; }}
                               type="text"/>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control"
                                  id="description"
                                  placeholder="Description"
                                  ref={input => { this.descriptionInput = input; }}
                                  rows="3">
                        </textarea>
                    </div>
                    <div className="form-event_actions">
                        <input className="btn btn-primary"
                               type="submit"
                               value="Ajouter évènement" />
                        <input className="btn btn-secondary"
                               onClick={this.props.onCancel}
                               type="button"
                               value="Annuler" />
                    </div>
                </form>);
    }
}

FormEvent.propTypes = { onCancel  : PropTypes.func.isRequired
                      , onNewEvent: PropTypes.func.isRequired};

// ******************** Exports ********************
export default FormEvent;
