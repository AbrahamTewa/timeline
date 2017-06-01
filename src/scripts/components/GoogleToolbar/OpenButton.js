/* global google */
// ******************** NodeJS packages ********************
import React from 'react';
import PropTypes from 'prop-types';
import FilePicker from './FilePicker';

import {MIME_TYPE} from '../../settings';

// ******************** Component ********************
class OpenButton extends React.Component {

    constructor(props) {
        let view;
        super(props);
        this.onClick = this.onClick.bind(this);

        view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
        view.setParent('root');
        view.setMimeTypes(MIME_TYPE);

        this.picker = new FilePicker({ access_token: this.props.access_token
                                     , views       : [view]});
    }

    async onClick() {
        let document;
        let fileId;

        if (!this.props.document.url && !this.props.document.saved) {
            if (!window.confirm('La timeline actuelle n\'a pas été sauvegardée. Continuer ?')) {
                return;
            }
        }

        document = await this.picker.display();

        if (!document)
            return;

        fileId = document[0][google.picker.Document.ID];

        this.props.loadDocument({fileId});
    }

    render() {
        return (<button className="btn btn-primary"
                        onClick={this.onClick}>
                    Ouvrir...
                </button>);
    }

}

// ******************** Prop-types ********************
OpenButton.propTypes = { access_token : PropTypes.string
                       , document     : PropTypes.shape({ saved: PropTypes.bool.isRequired
                                                        , url  : PropTypes.string}).isRequired
                       , loadDocument : PropTypes.func.isRequired};

// ******************** Exports ********************
export default OpenButton;
