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
 * Component that will represent an editable text.
 * In normal state, it will display the {label} text.
 * In edit state, it will display an <input> to edit that text.
 *
 * Their is two edit mode :
 *  - MODE_DIRECT: the edit mode is triggered simply by clicking on the text
 *  - MODE_BUTTON: a "Edit" button is displayed near the text and will trigger the edit mode
 *
 * @property {Object}  state
 * @property {boolean} state.updatable
 */
class EditableText extends React.Component {
    /**
     *
     * @param {Object}           props
     * @param {string}           props.className
     * @param {string}           [props.mode=MODE_BUTTON]
     * @param {string}           props.label - Label to display
     * @param {function(string)} props.onChange
     */
    constructor(props) {
        super(props);

        this.enableUpdate = this.enableUpdate.bind(this);
        this.disableUpdate = this.disableUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { updatable : this.mode === MODE_DIRECT };
    }

    // ==================================================
    // Lifecycle

    componentDidMount() {
        this.focus();
    }

    componentDidUpdate() {
        if (!this.state.updatable) {
            return;
        }

        this.focus();
    }

    // ==================================================
    // Event listeners

    /**
     * Listener trigger each time the input change
     * @param {Event} event
     * @private
     */
    onChange(event) {
        this.props.onChange(event.target.value);
    }

    /**
     * Listener trigger each time the form is submit
     * @param {Event} event
     * @private
     */
    onSubmit(event) {
        event.preventDefault();
        this.disableUpdate();
    }

    // ==================================================
    // Controllers

    /**
     * Disable the edit mode
     * @public
     */
    disableUpdate() {
        this.toggleUpdate(false);
    }

    /**
     * Enable the edit mode
     * @public
     */
    enableUpdate() {
        this.toggleUpdate(true);
        this.focus();
    }

    /**
     * Focus on the component
     * @public
     */
    focus() {
        this.inputElement.focus();
    }

    /**
     * Toggle the edit mode
     * @param {boolean} [updatable]
     * @public
     */
    toggleUpdate(updatable) {
        if (this.props.mode !== MODE_BUTTON) {
            return;
        }

        this.setState((prevState) => {
            const isUpdatable = typeof updatable === 'undefined'
                ? !prevState.updatable
                : updatable;

            return {
                ...prevState,
                updatable : isUpdatable,
            };
        });
    }

    render() {
        let renameButton;

        if (this.props.mode === MODE_BUTTON) {
            renameButton = <RenameButton onClick={this.enableUpdate} />;
        }

        return (
            <form
                onSubmit={this.onSubmit}
                data-mode={this.props.mode}
                className={`editable-text ${this.props.className}`}
            >
                <input
                    disabled={!this.state.updatable}
                    onChange={this.onChange}
                    onBlur={this.disableUpdate}
                    ref={(input) => {
                        this.inputElement = input;
                    }}
                    type="text"
                    value={this.props.label}
                />
                {renameButton}
            </form>
        );
    }
}

EditableText.defaultProps = {
    className : undefined,
    mode      : MODE_BUTTON,
    label     : '',
};

EditableText.propTypes = {
    className : PropTypes.string,
    label     : PropTypes.string,
    mode      : PropTypes.string,
    onChange  : PropTypes.func.isRequired,
};

// ============================================================
// Exports
export default EditableText;

export {
    MODE_BUTTON,
    MODE_DIRECT,
};
