// ============================================================
// Import packages
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// ============================================================
// Import modules
import TextMode from './TextMode';
import EventForm from '../EventForm';

// ============================================================
// Component
class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editionEnabled : undefined };

        this.disableEdition = this.disableEdition.bind(this);
        this.enableEdition = this.enableEdition.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
    }

    // ==================================================
    // Lifecycle
    componentDidMount() {
        this.dom = this.node;
    }

    /**
     * If the edition mode has change, then we scroll to the element
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if (this.state.editionEnabled === prevState.editionEnabled) {
            return;
        }

        // eslint-disable-next-line react/no-find-dom-node
        ReactDOM.findDOMNode(this).scrollIntoView();
    }

    // ==================================================
    // Event listener

    onCancel() {
        this.disableEdition();
    }

    onSubmit(data) {
        this.disableEdition();
        this.props.onChange({
            data : { ...data },
            uuid : this.props.uuid,
        });
    }

    // ==================================================
    // Helpers
    disableEdition() {
        const state = {
            ...this.state,
            editionEnabled : false,
        };

        this.setState(state);
    }

    enableEdition() {
        const state = {
            ...this.state,
            editionEnabled : true,
        };

        this.setState(state);
    }

    removeEvent() {
        // eslint-disable-next-line no-alert
        if (!window.confirm('Confirmer la suppression de l\'évènement ?')) {
            return;
        }

        this.props.onRemove({ uuid : this.props.uuid });
    }

    // ***** React methods *****

    render() {
        if (this.state.editionEnabled) {
            return (
                <EventForm
                    description={this.props.description}
                    illustrationURL={this.props.illustrationURL}
                    label={this.props.label}
                    onCancel={this.disableEdition}
                    onSubmit={this.onSubmit}
                />
            );
        }
        return (
            <TextMode
                description={this.props.description}
                enableEdition={this.enableEdition}
                illustrationURL={this.props.illustrationURL}
                label={this.props.label}
                removeEvent={this.removeEvent}
                uuid={this.props.uuid}
            />
        );
    }
}

const eventAttributePropTypes = {
    illustrationURL : PropTypes.string,
    label           : PropTypes.string.isRequired,
    description     : PropTypes.string.isRequired,
    uuid            : PropTypes.string.isRequired,
};

Event.propTypes = {
    ...eventAttributePropTypes,
    onChange : PropTypes.func.isRequired,
    onRemove : PropTypes.func.isRequired,
};

// ============================================================
// Exports
export default Event;
export { eventAttributePropTypes };
