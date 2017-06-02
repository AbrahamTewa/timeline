/* global tinymce */
// ******************** Import NodeJS packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Component ********************
class TextEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    getValue() {
        if (!this.state.editor)
            return undefined;

        return this.state.editor.getContent();
    }

    async componentDidMount() {
        let editor;
        let state;

        editor = await tinymce.init({
            selector: '.text-editor'

            // Editor Appearance
          , branding : false
          , menubar  : false
          , statusbar: false
        });

        state = {...this.state
                , editor: editor[0]};

        this.setState(state);
    }

    componentWillUnmount() {
        if (!this.state.editor)
            return;

        this.state.editor.remove();
    }

    shouldComponentUpdate(nextProps, nextState) {
        // The component should not update at the end of the editor loading
        return !(this.state.editor === undefined && nextState.editor);
    }

    render() {
        return ( <textarea className    = "text-editor"
                           defaultValue = {this.props.initialValue}
                           placeholder  = {this.props.placeholder}
                           ref          = {input => { this.descriptionInput = input; }}
                           rows         = {this.props.rows || 3}>
                 </textarea>);
    }

}

TextEditor.propTypes = { initialValue : PropTypes.string
                       , placeholder  : PropTypes.string
                       , rows         : PropTypes.number};

export default TextEditor;
