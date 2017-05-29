// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Container ********************

/**
 * @property {Object}  state
 * @proeprty {boolean} state.updatable
 */
class Time extends React.Component {

    /**
     *
     * @param {Object}           props
     * @param {string}           props.time - Time to display
     * @param {function(string)} props.onChange
     */
    constructor(props) {
        super(props);

        this.enableUpdate  = this.enableUpdate.bind(this);
        this.disableUpdate = this.disableUpdate.bind(this);
        this.onChange      = this.onChange.bind(this);
        this.state = {updatable: false};
    }

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    /**
     *
     * @param {Event} event
     */
    enableUpdate() {
        this.toggleUpdate(true);
        this.inputElement.focus();
    }

    disableUpdate(event) {
        event.preventDefault();
        this.toggleUpdate(false);
    }

    toggleUpdate(updatable) {
        this.setState({...this.setState
                      , updatable: updatable});
    }

    componentDidMount() {
        this.inputElement.focus();
    }

    componentDidUpdate() {
        if (this.state.updatable)
            this.inputElement.focus();
    }

    render() {
        return (
            <form onSubmit={this.disableUpdate}
                  className="timeline-time">
                <input autoFocus
                       disabled={!this.state.updatable}
                       onChange={this.onChange}
                       onBlur={this.disableUpdate}
                       ref={input => { this.inputElement = input; }}
                       type="text"
                       value={this.props.time}/>
                <input onClick={this.enableUpdate}
                       type="button"
                       value="Rename"/>
            </form>
        );
    }

}
Time.propTypes = { onChange: PropTypes.func.isRequired
                 , time    : PropTypes.string.isRequired};

// ******************** Export ********************
export default Time;
