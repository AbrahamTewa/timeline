// ============================================================
// Import packages
import React from 'react';

// ============================================================
// Import modules
import { forceSave } from '../../main';

// ============================================================
// Component
function SaveButton() {
    return (
        <button
            className="btn btn-primary"
            onClick={forceSave}
            type="button"
        >
                Enregistrer
        </button>
    );
}

// ============================================================
// Exports
export default SaveButton;
