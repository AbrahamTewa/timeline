/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import Input from './Input';

// ============================================================
// Tests

describe('Components', () => {
    describe('Input', () => {
        it('should render without throwing an error', () => {
            expect(shallow(<Input title="hello" />).contains(<input type="text" value="hello" />)).toBe(true);
        });

        it('should react on changes', () => {
            const onkeypress = sinon.spy();
            const component = <Input title="xx" onkeypress={onkeypress} />;
            const wrapper = shallow(component);
            wrapper.simulate('change');
            expect(onkeypress.calledOnce).toBe(true);
        });
    });
});
