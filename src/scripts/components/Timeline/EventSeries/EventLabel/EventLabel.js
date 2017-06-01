// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from './InputLabel';

// ******************** Container ********************

class EventLabel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isEditionEnabled: false};

        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick  = this.onClick.bind(this);
    }

    disableEdit() {
        this.toggleEdition(false);
    }

    enableEdit() {
        this.toggleEdition(true);
    }

    onCancel() {
        this.disableEdit();
    }

    onChange(label) {
        this.disableEdit();
        this.props.onChange({ label
                            , uuid: this.props.uuid});
    }

    onClick() {
        this.enableEdit();
    }

    toggleEdition(enable) {
        let state;

        state = { ...this.state
                , isEditionEnabled: enable};

        this.setState(state);
    }

    render() {

        let button;
        let form;
        let label;

        if (this.state.isEditionEnabled) {
            form = <InputLabel label={this.props.label}
                               onCancel={this.onCancel}
                               onChange={this.onChange}/>;
        }
        else {
            label = <a>{this.props.label}</a>;

            button = <div className="edit-button"
                          onClick={this.onClick}>
                        <i className="fa fa-pencil fa-fw" aria-hidden="true">
                        </i>
                     </div>;
        }

        return (<dt className="timeline-event"
                    id={this.props.uuid}>
                    {form}
                    {label}
                    {button}
                </dt>);
    }

}

EventLabel.propTypes = { label    : PropTypes.string.isRequired
                       , onChange : PropTypes.func.isRequired
                       , uuid     : PropTypes.string.isRequired};

// ******************** Export ********************
export default EventLabel;
