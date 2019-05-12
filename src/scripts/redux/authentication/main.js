// ============================================================
// Import modules
import * as disconnectAction from './disconnect';
import * as disconnectingAction from './disconnecting';
import * as loginUserAction from './loginUser';

// ============================================================
// Module's constants and variables
const reducers = {
    [disconnectAction.ACTION_TYPE]    : disconnectAction.reducer,
    [disconnectingAction.ACTION_TYPE] : disconnectingAction.reducer,
    [loginUserAction.ACTION_TYPE]     : loginUserAction.reducer,
};

const LIST_MODIFIERS = [];

const disconnect = getActionCreator(disconnectAction);
const disconnecting = getActionCreator(disconnectingAction);
const loginUser = getActionCreator(loginUserAction);

// ============================================================
// Functions
function getActionCreator({ ACTION_TYPE, actionCreator }) {
    return (...args) => {
        const payload = actionCreator(...args);

        return {
            payload,
            type : ACTION_TYPE,
        };
    };
}

function reducer(
    state = {
        events  : {},
        markers : [],
        saved   : true,
    },
    action,
) {
    const actionReducer = reducers[action.type];

    if (actionReducer) {
        return actionReducer(state, action.payload);
    }

    return state;
}

// ============================================================
// Exports
export {
    LIST_MODIFIERS,
    reducer,

    // Action creators
    disconnect,
    disconnecting,
    loginUser,
};
