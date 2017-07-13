import {getCurrentState} from '..';

/**
 *
 * @param {string}      uuid   - UUID of the event
 * @param {ReduxStore} [state] - State where to look for the event, or the current state
 * @returns {ReduxStore.Timeline.Event}
 */
function getEvent(uuid, state) {
    state = state || getCurrentState();
    return state.timeline.events[uuid];
}

export {getEvent};
