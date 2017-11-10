// ============================================================
// Import packages

import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Container

class FormMarker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: ''};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    empty() {
        this.inputElement.value = '';
    }

    getValue() {
        return this.state.value;
    }

    onChange({target}) {
        this.setState({value: target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.getValue());
    }

    componentDidMount() {
        this.inputElement.focus();
    }

    render() {
        return (
            <form
                className="addMarker form-inline"
                onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="addMarkerInput">Ajouter un marqueur</label>
                    <input
                        className="form-control"
                        id="addMarkerInput"
                        autoFocus={this.props.autoFocus}
                        onChange={this.onChange}
                        ref={input => this.inputElement = input}
                        type="text"/>
                </div>

                <input
                    className="btn btn-primary"
                    type="submit"
                    value="Ajouter" />
            </form>);
    }

}

FormMarker.propTypes = {autoFocus: PropTypes.bool.isRequired,
                        onSubmit: PropTypes.func.isRequired};

// ******************** Export ********************
export default FormMarker;
