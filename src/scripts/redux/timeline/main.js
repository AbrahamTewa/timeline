// ============================================================
// Import modules
import * as addEventAction from './addEvent';
import * as addMarkerAction from './addMarker';
import * as loadTimelineAction from './loadTimeline';
import * as moveEventAction from './moveEvent';
import * as moveMarkerAction from './moveMarker';
import * as removeEventAction from './removeEvent';
import * as removeMarkerAction from './removeMarker';
import * as renameMarkerAction from './renameMarker';
import * as updateEventAction from './updateEvent';

// ============================================================
// Module's constants and variables
const reducers = {
    [addEventAction.ACTION_TYPE]     : addEventAction.reducer,
    [addMarkerAction.ACTION_TYPE]    : addMarkerAction.reducer,
    [loadTimelineAction.ACTION]      : loadTimelineAction.reducer,
    [moveEventAction.ACTION_TYPE]    : moveEventAction.reducer,
    [moveMarkerAction.ACTION_TYPE]   : moveMarkerAction.reducer,
    [removeEventAction.ACTION_TYPE]  : removeEventAction.reducer,
    [removeMarkerAction.ACTION_TYPE] : removeMarkerAction.reducer,
    [renameMarkerAction.ACTION_TYPE] : renameMarkerAction.reducer,
    [updateEventAction.ACTION_TYPE]  : updateEventAction.reducer,
};

const LIST_MODIFIERS = [
    addEventAction.ACTION_TYPE,
    addMarkerAction.ACTION_TYPE,
    moveEventAction.ACTION_TYPE,
    moveMarkerAction.ACTION_TYPE,
    removeEventAction.ACTION_TYPE,
    removeMarkerAction.ACTION_TYPE,
    renameMarkerAction.ACTION_TYPE,
    updateEventAction.ACTION_TYPE,
];

const addEvent = getActionCreator(addEventAction);
const addMarker = getActionCreator(addMarkerAction);
const loadTimeline = getActionCreator(loadTimelineAction);
const moveEvent = getActionCreator(moveEventAction);
const moveMarker = getActionCreator(moveMarkerAction);
const removeEvent = getActionCreator(removeEventAction);
const removeMarker = getActionCreator(removeMarkerAction);
const renameMarker = getActionCreator(renameMarkerAction);
const updateEvent = getActionCreator(updateEventAction);

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
    addEvent,
    addMarker,
    loadTimeline,
    moveEvent,
    moveMarker,
    removeEvent,
    removeMarker,
    renameMarker,
    updateEvent,
};

export {
    getEvent,
    getMarker,
} from './helpers';
