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
        this.props.onSubmit({ label      : this.labelInput.value
                            , description: this.descriptionInput.value});
    }

    render() {
        return (<form className="form-event"
                      onSubmit={this.onSubmit}>
                    <input placeholder="Évènement"
                           ref={input => { this.labelInput = input; }}
                           type="text"/>
                    <textarea placeholder="Description"
                              ref={input => { this.descriptionInput = input; }}>
                    </textarea>
                    <input type="submit"
                           value="Ajouter évènement" />
                </form>);
    }
}

FormEvent.propTypes = {onSubmit: PropTypes.func};

export default FormEvent;
