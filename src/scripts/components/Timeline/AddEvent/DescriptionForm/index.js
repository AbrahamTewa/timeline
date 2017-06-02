// ******************** Import NodeJS packages ********************
import React from 'react';

import TextEditor from '../../../TextEditor';

// ******************** Component ********************
class DescriptionForm extends React.Component {

    constructor(props) {
        super(props);
    }

    getValue() {
        return this.editor.getValue();
    }

    render() {
        return (<div className="form-group row">
                    <label htmlFor="description">Description</label>
                    <TextEditor className  = "form-control"
                                placeholder= "Description"
                                ref        = {editor => this.editor = editor}
                                rows       = {3}/>
                </div>);
    }

}

export default DescriptionForm;
