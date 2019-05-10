// ============================================================
// Import modules
import { SAVE_STATUS } from '../constants';
import { LIST_MODIFIERS } from '../timeline';

// ============================================================
// Functions
function reducer(state, { type }) {
    if (!LIST_MODIFIERS.includes(type)) {
        return state;
    }

    return {
        ...state,
        saveStatus : SAVE_STATUS.NEEDED,
    };
}

// ============================================================
// Exports
export default reducer;
