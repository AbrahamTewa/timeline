/* eslint-env node, jest */

import reducer, * as redux from './document';
import { getStore, configureStore } from '.';

// ============================================================
// Tests
describe('Document', () => {
    // Creating store if it hasn't been created yet
    beforeAll(() => {
        const store = getStore();

        if (store) {
            return;
        }

        configureStore({});
    });

    describe('Action type: OTHER', () => {
        it('should not alter the state', () => {
            const state = {};
            const resultState = reducer(state, { type: 'OTHER' });

            expect(resultState).toBe(state);
            expect(JSON.stringify(resultState)).toBe(JSON.stringify({}));
        });
    });

    describe('Action type: OPEN_FILE', () => {
        it('should open a file', () => {
            const fileId = '1234596789746543546354312';

            // Testing action creator
            const action = redux.openFile({ fileId });

            expect(action).toEqual({
                payload: { fileId },
                type: redux.OPEN_FILE,
            });

            // Testing reducer
            const initialState = {
                fileId: 'XXXXXXXXXXXXXXXXXXXXX',
                name: 'A fake name',
            };

            const expectedState = {
                fileId,
                saveStatus: redux.SAVE_STATUS.SAVED,
            };

            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Action type: RENAME_FILE', () => {
        it('should rename a file', () => {
            const fileId = '1234596789746543546354312';
            const newName = 'A new name';
            const oldName = 'Old name';

            // Testing action creator
            const action = redux.renameFile({ name: newName });

            expect(action).toEqual({
                payload: { name: newName },
                type: redux.RENAME_FILE,
            });

            // Testing reducer
            const initialState = { fileId, name: oldName };
            const expectedState = { fileId, name: newName };

            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Action type: SAVING_FILE', () => {
        it('should declare the file as currently saving', () => {
            const fileId = '1234596789746543546354312';

            // Testing action creator
            const action = redux.savingFile();

            expect(action).toEqual({ type: redux.SAVING_FILE });

            // Testing reducer
            const initialState = { fileId, saveStatus: redux.SAVE_STATUS.SAVED };
            const expectedState = { fileId, saveStatus: redux.SAVE_STATUS.SAVING };

            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Action type: SAVED_FILE', () => {
        it('should declare the current file as saved', () => {
            const fileId = '1234596789746543546354312';

            // Testing action creator
            const action = redux.savedFile();

            expect(action).toEqual({
                payload: {},
                type: redux.SAVED_FILE,
            });

            // Testing reducer
            const initialState = { fileId, saveStatus: redux.SAVE_STATUS.SAVING };
            const expectedState = { fileId, saveStatus: redux.SAVE_STATUS.SAVED };

            expect(reducer(initialState, action)).toEqual(expectedState);
        });

        it('should allow "saving as"', () => {
            const initialFileId = ' ';
            const finalSavedId = '98765432109876543210548798';

            // Testing action creator
            const action = redux.savedFile({ fileId: finalSavedId });

            expect(action).toEqual({
                payload: { fileId: finalSavedId },
                type: redux.SAVED_FILE,
            });

            // Testing reducer
            const initialState = { fileId: initialFileId, saveStatus: redux.SAVE_STATUS.SAVING };
            const expectedState = { fileId: finalSavedId, saveStatus: redux.SAVE_STATUS.SAVED };

            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });
});
