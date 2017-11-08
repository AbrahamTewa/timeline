/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { mount } from 'enzyme';
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
            const formMaker = mount(<FormMaker onSubmit={()=>{}}/>);
            expect(formMaker.name()).toBe('FormMarker');
        });

        it('should react on submit', ()=>{
            let onSubmit;
            let component;
            let markerLabel;
            let wrapper;

            onSubmit = sinon.spy();
            component = <FormMaker onSubmit={onSubmit}/>;

            markerLabel = generateMarkerLabel();
            wrapper = mount(component);
            wrapper.find('#addMarkerInput').simulate('change', { target: { value: markerLabel }});
            wrapper.simulate('submit');

            expect(onSubmit.calledOnce).toBe(true);
            expect(onSubmit.calledWithExactly(markerLabel)).toBe(true);
        });
    });
});
