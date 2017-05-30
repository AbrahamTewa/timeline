/* global google */
// ******************** NodeJS packages ********************
import React from 'react';
import PropTypes from 'prop-types';
import FilePicker from './FilePicker';

// ******************** Component ********************
class OpenButton extends React.Component {

    constructor(props) {
        let view;
        super(props);
        this.onClick = this.onClick.bind(this);

        view = new google.picker.View(google.picker.ViewId.DOCS);
        // view.setMimeTypes('text/timeline');

        this.picker = new FilePicker({ access_token: this.props.access_token
                                     , views       : [view]});
    }

    async onClick() {
        let doc;
        let document;
        let url;

        if (!this.props.document.url && !this.props.document.saved) {
            if (!window.confirm('La timeline actuelle n\'a pas été sauvegardée. Continuer ?')) {
                return;
            }
        }

        document = await this.picker.display();

        if (!document)
            return;

        doc = document[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL];

        this.props.onOpen(url);
    }

    render() {
        return (<button onClick={this.onClick}>
                    Ouvrir...
                </button>);
    }

}

// ******************** Prop-types ********************
OpenButton.propTypes = { access_token : PropTypes.string
                       , document     : PropTypes.shape({ saved: PropTypes.bool.isRequired
                                                        , url  : PropTypes.string}).isRequired
                       , onOpen       : PropTypes.func.isRequired};

// ******************** Exports ********************
export default OpenButton;
