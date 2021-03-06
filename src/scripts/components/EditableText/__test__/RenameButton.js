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

describe('Components', ()=> {
    describe('EditableText/RenameButton', () => {

        it('should react on changes', ()=>{
            let onClick = sinon.spy();
            let component = <RenameButton onClick={onClick} />;
            const wrapper = shallow(component);
            wrapper.simulate('click');
            expect(onClick.calledOnce).toBe(true);
        });
    });
});
