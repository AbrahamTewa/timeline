/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// eslint-disable-next-line import/no-internal-modules
import EditableText, { MODE_DIRECT } from '../src/scripts/components/EditableText';

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
