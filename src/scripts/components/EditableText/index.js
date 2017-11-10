// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import components
import RenameButton from './RenameButton';

// ============================================================
// Component
const MODE_BUTTON = 'BUTTON';
const MODE_DIRECT = 'DIRECT';

/**
 * @property {Object}  state
 * @property {boolean} state.updatable
 */
class EditableText extends React.Component {

    /**
     *
     * @param {Object}           props
     * @param {string}           props.className
     * @param {string}           props.mode
     * @param {string}           props.label - Label to display
     * @param {function(string)} props.onChange
     */
    constructor(props) {
        super(props);

        this.enableUpdate  = this.enableUpdate.bind(this);
        this.disableUpdate = this.disableUpdate.bind(this);
        this.onChange      = this.onChange.bind(this);

        this.state = {updatable : this.props.mode === MODE_DIRECT};
    }

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    enableUpdate() {
        this.toggleUpdate(true);
        this.inputElement.focus();
    }

    disableUpdate(event) {
        event.preventDefault();
        this.toggleUpdate(false);
    }

    toggleUpdate(updatable) {
        if (this.props.mode !== MODE_BUTTON)
            return;

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
        let renameButton;

        if (this.props.mode === MODE_BUTTON) {
            renameButton =  <RenameButton onClick={this.enableUpdate}/>;
        }

        return (
            <form onSubmit={this.disableUpdate}
                  data-mode={this.props.mode}
                  className={`editable-text ${this.props.className}`}>
                <input disabled={!this.state.updatable}
                       onClick={this.onClick}
                       onChange={this.onChange}
                       onBlur={this.disableUpdate}
                       ref={input => { this.inputElement = input; }}
                       type="text"
                       value={this.props.label}/>
                {renameButton}
            </form>
        );
    }

}

EditableText.defaultProps = {mode: MODE_BUTTON};

EditableText.propTypes = { className : PropTypes.string
                         , label     : PropTypes.string.isRequired
                         , mode      : PropTypes.string
                         , onChange  : PropTypes.func.isRequired};

// ============================================================
// Exports
export default EditableText;

export { MODE_BUTTON
       , MODE_DIRECT};
