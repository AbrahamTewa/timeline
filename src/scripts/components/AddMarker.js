// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Container ********************

class AddMarker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: ''};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     *
     * @param {Event} event
     */
    onChange(event) {
        this.setState({value: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.getValue());
    }

    getValue() {
        return this.state.value;
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}
                  className="addMarker">
                <label> Ajouter un marker :
                    <input type="text"
                            onChange={this.onChange}/>
                </label>
                <input type="submit"
                       value="Ajouter" />
            </form>);
    }

}

AddMarker.propTypes = {onSubmit: PropTypes.func};

// ******************** Export ********************
export default AddMarker;
