/* eslint-env node */

import { configure } from '@storybook/react';
import 'src/vendors/timeliner/css/timeliner-future.css';

function loadStories() {
    require('../src/scripts/__stories__');
}

configure(loadStories, module);
