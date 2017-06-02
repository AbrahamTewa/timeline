// ******************** NodeJS ********************
import React     from 'react';
import PropTypes from 'prop-types';

import TextEditor from '../../../TextEditor';

// ******************** Component ********************
class DescriptionForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onChange(this.editor.getValue());
    }

    render() {
        return (<form className="description-form"
                      onSubmit={this.onSubmit}>
                    <TextEditor initialValue={this.props.description}
                                ref={editor => this.editor = editor}
                                rows={5}/>
                    <div className="action-buttons">
                        <button className="btn btn-sm btn-outline-primary"
                                type="submit">
                            Enregistrer
                        </button>
                        <button className="btn btn-sm btn-outline-secondary"
                                onClick={this.props.onCancel}>
                            Annuler
                        </button>
                    </div>
                </form>);
    }
}

DescriptionForm.propTypes = { description: PropTypes.string.isRequired
                            , onCancel   : PropTypes.func.isRequired
                            , onChange   : PropTypes.func.isRequired};

// ******************** Exports ********************
export default DescriptionForm;
