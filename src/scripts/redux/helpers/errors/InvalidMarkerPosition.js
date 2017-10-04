import ActionCreatorError from './ActionCreatorError';

class InvalidMarkerPosition extends ActionCreatorError {
    constructor({actionCreator, actionType, data, position}) {
        super('Invalid marker position', {actionCreator, actionType, data});

        this.action = { creator: actionCreator
                      , type   : actionType};

        this.data = data;

        this.position = position;
    }
}

export default InvalidMarkerPosition;
