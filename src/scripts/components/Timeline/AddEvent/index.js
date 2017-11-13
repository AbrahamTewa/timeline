// ******************** Import Packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Import Components ********************
import AddButton from './AddButton';
import EventForm from '../EventForm';

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
     * @param {Object} data
     * @param {string} data.bubbuleURL
     * @param {string} data.description
     * @param {string} data.label
     */
    onNewEvent(data) {
        this.toggleFormDisplay(false);
        this.props.onNewEvent(data);
    }

    render() {
        let button;
        let form;

        if (this.state.formDisplayed)
            form = <EventForm onCancel={this.onCancel}
                              onSubmit={this.onNewEvent}/>;
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
