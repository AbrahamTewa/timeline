const SET_TITLE = 'set title';

function reducer(state={}, action={}) {
    switch(action.type) {
        case SET_TITLE:
            return { ...state
                   , title: action.title};

        default:
            return state;
    }
}

/**
 *
 * @param {string} title
 */
function setTitle(title) {
    return { title: title
           , type : SET_TITLE};
}

// ******************** Exports ********************
export default reducer;

export {setTitle};
