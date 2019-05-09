/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EditableText, { MODE_DIRECT } from '..';

storiesOf('EditableText/m44', module)
    .add('Button mode', () => (
        <EditableText
            label="Some label"
            onChange={action('updated')} 
        />
    ))
    .add('Direct mode', () => (
        <EditableText
            label="Some label"
            mode={MODE_DIRECT}
            onChange={action('updated')} 
        />
    ));
