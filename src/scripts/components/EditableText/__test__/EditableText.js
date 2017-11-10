/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

// ============================================================
// Import modules
import EditableText from '..';
import {initializeEnzyme} from '../../../test_helpers';
import {generateMarkerLabel} from '../../../redux/__test__/helpers';

// ============================================================
// Tests

initializeEnzyme();
describe('Components', ()=> {
    describe('EditableText', () => {
        it('should render without throwing an error', () => {
            const formMarker = mount(<EditableText label={''} onChange={()=>{}}/>);
            expect(formMarker.name()).toBe('EditableText');
        });

        it('should render without throwing an error', () => {
            const formMarker = mount(<EditableText label={''} onChange={()=>{}}/>);
            expect(formMarker.name()).toBe('EditableText');
        });

    });
});
