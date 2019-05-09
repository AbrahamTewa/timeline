/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env node, jest */

// ============================================================
// Import packages
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

// ============================================================
// Import modules
import EditableText,
{ MODE_BUTTON } from '..';
import { generateLabel } from '../../../test_helpers';
import { MODE_DIRECT } from '../index';

// ============================================================
// Tests

describe('Components', () => {
    describe('EditableText', () => {
        // ====================
        // Helpers
        const enableEdition = function (editableText) {
            editableText.instance().enableUpdate();
            editableText.update();
        };

        const generateEditableText = function (label = '') {
            return mount(<EditableText label={label} onChange={() => {}} />);
        };

        /**
         * @param editableText
         * @param {boolean} updatable
         */
        const testUpdateMode = function (editableText, updatable) {
            editableText.update();
            const input = editableText.find('input');

            expect(editableText.state('updatable')).toBe(updatable);
            expect(input.prop('disabled')).toBe(!updatable);
        };

        // ====================
        // Tests
        it('should render without throwing an error', () => {
            // Props
            const label = generateLabel();

            // Component
            const editableText = generateEditableText(label);
            const form = editableText.find('form');
            const input = form.find('input');

            expect(editableText.name()).toBe('EditableText');
            expect(input.prop('value')).toBe(label);

            // Default mode : MODE_BUTTON
            expect(form.prop('data-mode')).toBe(MODE_BUTTON);
        });

        it('should handle className', () => {
            const className = generateLabel(1);

            const editableText = mount(<EditableText
                className={className}
                label={generateLabel()}
                onChange={() => {}}
            />);

            expect(editableText.hasClass(className)).toBe(true);
        });

        it('should handle empty string as label', () => {
            const editableText = generateEditableText('');
            const input = editableText.find('input');
            expect(input.prop('value')).toBe('');
        });

        it('should disable update mode on submit', () => {
            const editableText = generateEditableText();
            enableEdition(editableText);
            editableText.find('form').simulate('submit');
            testUpdateMode(editableText, false);
        });

        it('should disable update mode on blur', () => {
            const editableText = generateEditableText();
            enableEdition(editableText);
            editableText.find('input').simulate('blur');
            testUpdateMode(editableText, false);
        });

        it('should handle update with methods', () => {
            const editableText = generateEditableText();
            const component = editableText.instance();

            component.enableUpdate();
            testUpdateMode(editableText, true);

            component.disableUpdate();
            testUpdateMode(editableText, false);

            component.toggleUpdate();
            testUpdateMode(editableText, true);

            component.toggleUpdate();
            testUpdateMode(editableText, false);

            component.toggleUpdate(false);
            testUpdateMode(editableText, false);

            component.toggleUpdate(true);
            testUpdateMode(editableText, true);
        });

        it('should allow text edition', () => {
            const onChangeSpy = sinon.spy();
            const label = generateLabel();
            const component = (
                <EditableText
                    label={label}
                    onChange={onChangeSpy}
                />
            );

            const editableText = mount(component);

            testUpdateMode(editableText, false);
            enableEdition(editableText);
            testUpdateMode(editableText, true);

            // With a simple label
            {
                const newLabel = generateLabel();
                editableText.find('input').simulate('change', { target : { value : newLabel } });

                expect(onChangeSpy.calledOnce).toBe(true);
                expect(onChangeSpy.args[0][0]).toBe(newLabel);
                testUpdateMode(editableText, true);

                onChangeSpy.reset();
            }

            enableEdition(editableText);

            // With an empty label
            {
                const newLabel = '';
                editableText.find('input').simulate('change', { target : { value : newLabel } });

                expect(onChangeSpy.calledOnce).toBe(true);
                expect(onChangeSpy.args[0][0]).toBe(newLabel);
                testUpdateMode(editableText, true);

                onChangeSpy.reset();
            }
        });

        describe('Button mode', () => {
            let editableText;
            let label;
            let onChangeSpy;

            // ====================
            // Triggers
            beforeEach(() => {
                onChangeSpy = sinon.spy();
                label = generateLabel();
                const component = (
                    <EditableText
                        label={label}
                        mode={MODE_BUTTON}
                        onChange={onChangeSpy}
                    />
                );

                editableText = mount(component);
            });

            // ====================
            // Tests
            it('should display the "Rename" button', () => {
                expect(editableText.find('RenameButton').exists()).toBe(true);
            });

            it('should not be updatable in normal state', () => {
                expect(editableText.state('updatable')).toBe(false);
                expect(editableText.find('RenameButton').exists()).toBe(true);
            });
        });

        describe('Direct mode', () => {
            let editableText;
            let label;
            let onChangeSpy;

            // ====================
            // Triggers
            beforeEach(() => {
                onChangeSpy = sinon.spy();
                label = generateLabel();
                const component = (
                    <EditableText
                        label={label}
                        mode={MODE_DIRECT}
                        onChange={onChangeSpy}
                    />
                );

                editableText = mount(component);
            });

            // ====================
            // Tests
            it('should not display the "Rename" button', () => {
                expect(editableText.find('RenameButton').exists()).toBe(false);
            });
        });

        describe('Snapshots', () => {
            const snapshot = function (component) {
                const options = {
                    createNodeMock : (element) => {
                        if (element.type === 'input') {
                            return { focus : () => {} };
                        }
                        return null;
                    },
                };

                const tree = renderer.create(component, options);
                expect(tree.toJSON()).toMatchSnapshot();

                tree.getInstance().enableUpdate();
                tree.update();

                expect(tree.toJSON()).toMatchSnapshot();
            };

            describe('Button mode', () => {
                it('empty label', () => {
                    snapshot(<EditableText
                        label=""
                        mode={MODE_BUTTON}
                        onChange={() => {}}
                    />);
                });

                it('some label', () => {
                    snapshot(<EditableText
                        label="Some label"
                        mode={MODE_BUTTON}
                        onChange={() => {}}
                    />);
                });
            });

            describe('Direct mode', () => {
                it('empty label', () => {
                    snapshot(<EditableText
                        label=""
                        mode={MODE_DIRECT}
                        onChange={() => {}}
                    />);
                });

                it('some label', () => {
                    snapshot(<EditableText
                        label="Some label"
                        mode={MODE_DIRECT}
                        onChange={() => {}}
                    />);
                });
            });
        });
    });
});
