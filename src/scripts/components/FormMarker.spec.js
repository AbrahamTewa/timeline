/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import FormMaker from './FormMarker';
import { generateMarkerLabel } from '../redux/testHelpers';

// ============================================================
// Tests

describe('Components', () => {
    describe('FormMarker', () => {
        it('should render without throwing an error', () => {
            const formMarker = mount(<FormMaker onSubmit={() => {}} autoFocus />);
            expect(formMarker.name()).toBe('FormMarker');
        });

        it('should handle autoFocus correctly', () => {
            let formMarker;

            formMarker = mount(<FormMaker onSubmit={() => {}} autoFocus />);
            expect(formMarker.find('#addMarkerInput').prop('autoFocus')).toBe(true);

            formMarker = mount(<FormMaker onSubmit={() => {}} autoFocus={false} />);
            expect(formMarker.find('#addMarkerInput').prop('autoFocus')).toBe(false);
        });

        it('should react on submit', () => {
            const onSubmit = sinon.spy();
            const component = <FormMaker onSubmit={onSubmit} autoFocus />;

            const markerLabel = generateMarkerLabel();
            const wrapper = mount(component);
            wrapper.find('#addMarkerInput').simulate('change', { target : { value : markerLabel } });
            wrapper.simulate('submit');

            expect(onSubmit.calledOnce).toBe(true);
            expect(onSubmit.args[0][0]).toBe(markerLabel);
        });
    });
});
