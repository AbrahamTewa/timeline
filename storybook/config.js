/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env node */

// ============================================================
// Import packages
import { configure } from '@storybook/react';

// ============================================================
// Functions
function loadStories() {
    // eslint-disable-next-line global-require,import/no-internal-modules
    require('../src/index.stories');
}

configure(loadStories, module);
