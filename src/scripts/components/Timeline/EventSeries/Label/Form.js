// ******************** NodeJS packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Component ********************

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onCancel() {
        this.props.onCancel();
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onChange(this.inputElement.value);
    }

    componentDidMount() {
        this.inputElement.focus();
    }

    render() {
        return (<form onSubmit={this.onSubmit}
                      className="input-group">
                    <input ref={ref => this.inputElement = ref}
                           type="text"
                           onBlur={this.onCancel}
                           defaultValue={this.props.label} />
                    <span className="input-group-btn">
                        <button className="btn btn-sm btn-primary"
                                type="submit">
                            <i className="fa fa-check fa-fw" aria-hidden="true">
                            </i>
                        </button>
                    </span>
                    <span className="input-group-btn">
                        <button className="btn btn-sm btn-secondary"
                                onClick={this.onCancel}>
                            <i className="fa fa-undo fa-fw" aria-hidden="true">
                            </i>
                        </button>
                    </span>
                </form>);
    }

}

Form.propTypes = { label   : PropTypes.string.isRequired
                       , onCancel: PropTypes.func.isRequired
                       , onChange: PropTypes.func.isRequired};

// ******************** Exports ********************
export default Form;
