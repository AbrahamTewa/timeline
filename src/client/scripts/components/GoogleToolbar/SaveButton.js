// ******************** NodeJS packages ********************
import React     from 'react';

import {forceSave} from '../../main';

// ******************** Component ********************
function SaveButton() {
    return (<button onClick={forceSave}>
                Enregistrer
            </button>);
}

// ******************** Exports ********************
export default SaveButton;
