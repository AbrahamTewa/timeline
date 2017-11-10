/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import FormMaker from '../FormMarker';
import {initializeEnzyme} from '../../test_helpers';
import {generateMarkerLabel} from '../../redux/__test__/helpers';

// ============================================================
// Tests

initializeEnzyme();
describe('Components', ()=> {
    describe('FormMarker', () => {

        it('should render without throwing an error', () => {
            const formMarker = mount(<FormMaker onSubmit={()=>{}} autoFocus={true}/>);
            expect(formMarker.name()).toBe('FormMarker');
        });

        it('should handle autoFocus correctly', () => {
            let formMarker;

            formMarker = mount(<FormMaker onSubmit={()=>{}} autoFocus={true}/>);
            expect(formMarker.find("#addMarkerInput").prop('autoFocus')).toBe(true);

            formMarker = mount(<FormMaker onSubmit={()=>{}} autoFocus={false}/>);
            expect(formMarker.find("#addMarkerInput").prop('autoFocus')).toBe(false);
        });

        it('should react on submit', ()=>{
            let onSubmit;
            let component;
            let markerLabel;
            let wrapper;

            onSubmit = sinon.spy();
            component = <FormMaker onSubmit={onSubmit} autoFocus={true}/>;

            markerLabel = generateMarkerLabel();
            wrapper = mount(component);
            wrapper.find('#addMarkerInput').simulate('change', { target: { value: markerLabel }});
            wrapper.simulate('submit');

            expect(onSubmit.calledOnce).toBe(true);
            expect(onSubmit.args[0][0]).toBe(markerLabel);
        });
    });
});
