/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import Input from '../Input';
import {initializeEnzyme} from '.';

// ============================================================
// Tests

initializeEnzyme();

describe('Input', function() {

    it('should render without throwing an error', () => {
        expect(shallow(<Input title='hello'/>).contains(<input type={'text'} value={'hello'}/>)).toBe(true);
    });

    it('should react on changes', ()=>{
        let onkeypress = sinon.spy();
        let component = <Input title="xx" onkeypress={onkeypress} />;
        const wrapper = shallow(component);
        wrapper.simulate('change');
        expect(onkeypress.calledOnce).toBeTruthy();
    });
});
