/* global google */
// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';

// ============================================================
// Import modules
import FilePicker from '../FilePicker';
import { MIME_TYPE } from '../../settings';

// ============================================================
// Component
class OpenButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

        const view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
        view.setParent('root');
        view.setMimeTypes(MIME_TYPE);

        this.picker = new FilePicker({
            access_token : this.props.access_token,
            views        : [view],
        });
    }

    async onClick() {
        if (!this.props.document.url && !this.props.document.saved) {
            // eslint-disable-next-line no-alert
            if (!window.confirm('La timeline actuelle n\'a pas été sauvegardée. Continuer ?')) {
                return;
            }
        }

        const document = await this.picker.display();

        if (!document) {
            return;
        }

        const fileId = document[0][google.picker.Document.ID];

        this.props.loadDocument({ fileId });
    }

    render() {
        return (
            <button
                className="btn btn-primary"
                onClick={this.onClick}
                type="button"
            >
                    Ouvrir...
            </button>
        );
    }
}

OpenButton.propTypes = {
    access_token : PropTypes.string,
    document     : PropTypes.shape({
        saved : PropTypes.bool.isRequired,
        url   : PropTypes.string,
    }).isRequired,
    loadDocument : PropTypes.func.isRequired,
};

OpenButton.defaultProps = {
    access_token : undefined,
};

// ******************** Exports ********************
export default OpenButton;
