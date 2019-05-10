// ============================================================
// Import modules
import { cloneEvent } from './helpers';

// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'timeline.UPDATE_EVENT';

// ============================================================
// Functions

/**
 * @typedef {Object} StoreAction.Timeline.UpdateEventDescription
 * @property {Object} payload
 * @property {string} payload.data
 * @property {string} payload.data.description - New description of the event
 * @property {string} payload.uuid             - UUID of the event to rename
 */

/**
 * @param {string} uuid
 * @param {Object} data
 * @param {string} data.illustrationURL
 * @param {string} data.description
 * @param {string} data.label
 * @returns {StoreAction.Timeline.UpdateEventDescription}
 */
function actionCreator({ uuid, data }) {
    return {
        data,
        uuid,
    };
}

function reducer(
    state,
    {
        data : {
            description,
            label,
            illustrationURL,
        },
        uuid,
    },
) {
    const { newState, event } = cloneEvent(state, uuid);

    event.illustrationURL = illustrationURL || '';
    event.description = description;
    event.label = label;

    return newState;
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
