/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// eslint-disable-next-line import/no-internal-modules
import RenameButton from '../src/scripts/components/EditableText/RenameButton';

storiesOf('EditableText/RenameButton', module)
    .add('with text', () => (
        <RenameButton onClick={action('clicked')} />
    ));
