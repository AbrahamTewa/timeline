// ******************** NodeJS Packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Components ********************
import AddButton from './AddButton';
import FormEvent from './FormEvent';

// ******************** Component ********************
class AddEvent extends React.Component {

    constructor(props) {
        super(props);

        this.onAdd      = this.onAdd.bind(this);
        this.onCancel   = this.onCancel.bind(this);
        this.onNewEvent = this.onNewEvent.bind(this);
        this.state    = { formDisplayed: false };
    }

    /**
     * Toggle the display of the form button
     * @param {boolean} display
     */
    toggleFormDisplay(display) {
        let state;

        state = { ...this.state
                , formDisplayed: display};

        this.setState(state);
    }

    // ***** Events *****

    /**
     * Callback triggered when the user click on the "Add" button
     */
    onAdd() {
        this.toggleFormDisplay(true);
    }

    /**
     * Callback triggered when the user cancel the event form.
     */
    onCancel() {
        this.toggleFormDisplay(false);
    }

    /**
     * Callback triggered when the user complete the event form
     * and add a new event
     * @param {string} description
     * @param {string} label
     */
    onNewEvent({description, label}) {
        this.toggleFormDisplay(false);
        this.props.onNewEvent({description, label});
    }

    render() {
        let button;
        let form;

        if (this.state.formDisplayed)
            form = <FormEvent onCancel={this.onCancel}
                              onNewEvent={this.onNewEvent}/>;
        else
            button = <AddButton onClick={this.onAdd}/>;

        return (<div className="add-event">
                    {button}
                    {form}
                </div>);
    }
}

AddEvent.propTypes = {onNewEvent : PropTypes.func.isRequired};

// ******************** Exports ********************
export default AddEvent;