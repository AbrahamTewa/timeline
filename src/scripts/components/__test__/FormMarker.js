/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import FormMaker from '../FormMarker';
import {initializeEnzyme} from '.';
import {generateMarkerLabel} from '../../redux/__test__/helpers';

// ============================================================
// Tests

initializeEnzyme();
describe('Components', ()=> {
    describe('FormMarker', () => {

        it('should render without throwing an error', () => {
            expect(shallow(<FormMaker onSubmit={()=>{}}/>).contains(<form className="addMarker"/>)).toBe(true);
        });

        it('should react on submit', ()=>{
            let onSubmit;
            let component;
            let markerLabel;
            let wrapper;

            onSubmit = sinon.spy();
            component = <FormMaker onSubmit={onSubmit}/>;

            markerLabel = generateMarkerLabel();
            wrapper = shallow(component);
            wrapper.find('#addMarkerInput').simulate('change', { target: { value: markerLabel }});
            wrapper.find('input[type="submit"]').simulate('click');

            wrapper.simulate('submit');

            expect(onSubmit.calledOnece).toBe(true);
        });
    });
});
