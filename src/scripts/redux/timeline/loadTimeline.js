// ============================================================
// Module's constants and variables
const ACTION_TYPE = 'timeline.LOAD';

// ============================================================
// Functions
/**
 *
 * @param {ReduxStore} timeline
 * @public
 */
function actionCreator({ timeline }) {
    return { timeline };
}

function reducer(state, { timeline }) {
    return timeline;
}

// ============================================================
// Exports
export {
    ACTION_TYPE,

    actionCreator,
    reducer,
};
