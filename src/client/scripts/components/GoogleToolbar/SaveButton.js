/* global google */
// ******************** NodeJS packages ********************
import React from 'react';
import PropTypes from 'prop-types';

import FilePicker from './FilePicker';

// ******************** Component ********************
class SaveButton extends React.Component {

    constructor(props) {
        let view;

        super(props);

        view = new google.picker.View(google.picker.ViewId.FOLDERS);

        this.filePicker = new FilePicker({ access_token: this.props.access_token
                                         , views: [view]});
        this.onClick = this.onClick.bind(this);
    }

    async onClick() {
        let doc;
        let document;
        let url;

        document = await this.filePicker.display();

        if (!document) {
            return;
        }

        doc = document[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL];

        console.log('url');

        this.props.onSave(url);
    }

    render() {
        return (<button onClick={this.onClick}>
                    Enregistrer
                </button>);
    }

}

// ******************** Prop-types ********************
SaveButton.propTypes = { access_token : PropTypes.string.isRequired
                       , file_id      : PropTypes.string
                       , onSave       : PropTypes.func.isRequired};

// ******************** Exports ********************
export default SaveButton;
