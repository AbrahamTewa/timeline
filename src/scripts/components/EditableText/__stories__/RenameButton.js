/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RenameButton from '../RenameButton';

storiesOf('EditableText/RenameButton', module)
    .add('with text', () => (
        <RenameButton onClick={action('clicked')} />
    ));
