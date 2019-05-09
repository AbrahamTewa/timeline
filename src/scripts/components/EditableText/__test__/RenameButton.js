/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import RenameButton from '../RenameButton';

// ============================================================
// Tests

describe('Components', () => {
    describe('EditableText/RenameButton', () => {
        it('should react on changes', () => {
            const onClick = sinon.spy();
            const component = <RenameButton onClick={onClick} />;
            const wrapper = shallow(component);
            wrapper.simulate('click');
            expect(onClick.calledOnce).toBe(true);
        });
    });
});
