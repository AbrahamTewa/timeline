// ******************** Imports ********************
import React from 'react';
import PropTypes from 'prop-types';

import DescriptionForm from './DescriptionForm';

// ******************** Component ********************
class Description extends React.Component {

    /**
     * @param {Object} props
     * @param {string} props.description
     * @param {string} props.uuid
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = {isEditionEnabled: false};

        this.disableEdition = this.disableEdition.bind(this);
        this.enableEdition  = this.enableEdition.bind(this);
        this.onChange       = this.onChange.bind(this);
    }

    disableEdition() {
        this.toggleEdition(false);
    }

    enableEdition() {
        this.toggleEdition(true);
    }

    onChange(description) {
        this.disableEdition();
        this.props.onChange({ description
                            , uuid: this.props.uuid});
    }

    toggleEdition(enable) {
        let state;

        state = {...this.state
                , isEditionEnabled: enable};

        console.log('xxx');
        this.setState(state);
        console.log('---');
    }

    render() {
        let description;
        let descriptionForm;
        let editButton;

        if (this.state.isEditionEnabled) {
            descriptionForm = <DescriptionForm description= {this.props.description}
                                               onCancel   = {this.disableEdition}
                                               onChange   = {this.onChange}/>;
        }
        else {
            description = <p>{this.props.description}</p>;
            editButton = <button className="edit-button btn btn-sm btn-outline-primary"
                                 onClick={this.enableEdition}>
                            Modifier
                         </button>;
        }

        return (<dd className="timeline-event-content"
                    id={this.props.uuid + 'EX'}>
                    {descriptionForm}
                    {description}
                    {editButton}
                </dd>);
    }
}

Description.propTypes = { description : PropTypes.string.isRequired
                        , onChange    : PropTypes.func.isRequired
                        , uuid        : PropTypes.string.isRequired};

// ******************** Export ********************
export default Description;
