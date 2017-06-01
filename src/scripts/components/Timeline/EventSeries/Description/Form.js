// ******************** NodeJS ********************
import React     from 'react';
import PropTypes from 'prop-types';

// ******************** Component ********************
class Form extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onChange(this.descriptionArea.value);
    }

    render() {
        return (<form className="description-form"
                      onSubmit={this.onSubmit}>
                    <textarea defaultValue={this.props.description}
                              ref={d => this.descriptionArea = d}
                              rows="5">
                    </textarea>
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

Form.propTypes = { description: PropTypes.string.isRequired
                            , onCancel   : PropTypes.func.isRequired
                            , onChange   : PropTypes.func.isRequired};

// ******************** Exports ********************
export default Form;
