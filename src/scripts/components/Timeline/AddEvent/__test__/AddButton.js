/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import AddButton from '../AddButton';
import {initializeEnzyme,
        snapshot} from '../../../../test_helpers';

// ============================================================
// Tests

initializeEnzyme();
describe('Components', ()=> {
    describe('Unit test', () => {
        it('should react on changes', ()=>{
            let onClick = sinon.spy();
            let component = <AddButton onClick={onClick} />;
            const wrapper = shallow(component);
            wrapper.simulate('click');
            expect(onClick.calledOnce).toBe(true);
        });
    });

    describe('Snapshot', () => {
        it('should render normally', ()=>{
            snapshot(<AddButton onClick={()=>{}}/>);
        });
    });
});
