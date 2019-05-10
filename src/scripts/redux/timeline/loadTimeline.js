const ACTION = 'timeline.LOAD';

// ============================================================
// Functions
/**
 *
 * @param {ReduxStore} timeline
 * @public
 */
function actionCreator({ timeline }) {
    return {
        payload : { timeline },
        type    : ACTION,
    };
}

function reducer(state, { timeline }) {
    return timeline;
}

export {
    ACTION,

    actionCreator,
    reducer,
};
