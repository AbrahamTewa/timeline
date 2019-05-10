/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import AddButton from './AddButton';
import {
    snapshot,
} from '../../../testHelpers';

// ============================================================
// Tests

describe('Components', () => {
    describe('Unit test', () => {
        it('should react on changes', () => {
            const onClick = sinon.spy();
            const component = <AddButton onClick={onClick} />;
            const wrapper = shallow(component);
            wrapper.simulate('click');
            expect(onClick.calledOnce).toBe(true);
        });
    });

    describe('Snapshot', () => {
        it('should render normally', () => {
            snapshot(<AddButton onClick={() => {}} />);
        });
    });
});
