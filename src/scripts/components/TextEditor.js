/* global tinymce */
// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Component
class TextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // ==============================
    // React methods
    async componentDidMount() {
        const editor = await tinymce.init({
            plugins  : 'hr image imagetools link lists preview table textcolor visualblocks',
            selector : '.text-editor',

            // Editor Appearance
            branding  : false,
            menubar   : false,
            statusbar : false,
            toolbar   : 'preview undo redo removeformat | '
                       + 'formatselect fontselect fontsizeselect | '
                       + 'forecolor bold italic underline blockquote | '
                       + 'outdent indent | '
                       + 'alignleft aligncenter alignright alignjustify | '
                       + 'bullist numlist hr | '
                       + 'link unlink table | '
                       + 'image imageoptions | '
                       + 'visualblocks',
        });

        const state = {
            ...this.state,
            editor : editor[0],
        };

        this.setState(state);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // The component should not update at the end of the editor loading
        return !(this.state.editor === undefined && nextState.editor);
    }

    componentWillUnmount() {
        if (!this.state.editor) {
            return;
        }

        this.state.editor.remove();
    }

    // ==============================
    // Component methods
    getValue() {
        const { editor } = this.state;

        if (!editor) {
            return undefined;
        }

        return editor.getContent();
    }

    render() {
        return (
            <textarea
                className="text-editor"
                defaultValue={this.props.initialValue}
                placeholder={this.props.placeholder}
                ref={(input) => {
                    this.descriptionInput = input;
                }}
                rows={this.props.rows || 3}
            />
        );
    }
}

TextEditor.defaultProps = {
    initialValue : undefined,
    placeholder  : undefined,
    rows         : undefined,
};

TextEditor.propTypes = {
    initialValue : PropTypes.string,
    placeholder  : PropTypes.string,
    rows         : PropTypes.number,
};

// ============================================================
// Exports
export default TextEditor;
