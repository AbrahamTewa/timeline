import ExtandableError from 'es6-error';

class ActionCreatorError extends ExtandableError {

    constructor(message, {actionCreator, actionType, data}) {
        super(message);
        this.action = { creator: actionCreator
                      , type   : actionType};

        this.data   = data;
    }

}

export {ActionCreatorError};
