import React from 'react';

class EventListElement extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (<div className="eventListElement" draggable={true}>
                    <i className="fa fa-bars" aria-hidden="true"/>
                </div>);
    }

}

export default EventListElement;
