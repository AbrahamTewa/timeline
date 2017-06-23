/* eslint-env node, jest */
import * as redux from '../document';
import { default as reducer} from '../document';
import {getStore, configureStore} from '..';

describe('Document', ()=> {

    // Creating store if it hasn't been created yet
    beforeAll(() => {
        let store = getStore();

        if (store)
            return;

        configureStore({});
    });

    describe('Action type: OTHER', () => {
        it('should not alter the state', () => {
            let state;
            let resultState;

            state = {};
            resultState = reducer(state, {type: 'OTHER'});

            expect(resultState).toBe(state);
            expect(JSON.stringify(resultState)).toBe(JSON.stringify({}));
        });
    });

    describe('Action type: OPEN_FILE', () => {

        it('should open a file', () => {
            let action;
            let expectedState;
            let fileId;
            let initialState;

            fileId = '1234596789746543546354312';

            // Testing action creator
            action = redux.openFile({fileId});

            expect(action).toEqual({ payload: {fileId}
                                   , type   : redux.OPEN_FILE});

            // Testing reducer
            initialState = { fileId: 'XXXXXXXXXXXXXXXXXXXXX'
                           , name  : 'A fake name'};

            expectedState = { fileId
                            , saveStatus: redux.SAVE_STATUS.SAVED};

            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Action type: RENAME_FILE', () => {
        it ('should rename a file', () => {
            let action;
            let expectedState;
            let fileId;
            let initialState;
            let newName;
            let oldName;

            fileId  = '1234596789746543546354312';
            newName = 'A new name';
            oldName = 'Old name';

            // Testing action creator
            action  = redux.renameFile({name: newName});

            expect(action).toEqual({ payload: {name: newName}
                                   , type   : redux.RENAME_FILE});

            // Testing reducer
            initialState = { fileId, name: oldName};
            expectedState = {fileId, name: newName};

            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Action type: SAVING_FILE', () => {
        it ('should declare the file as currently saving', () => {
            let action;
            let expectedState;
            let fileId;
            let initialState;

            fileId = '1234596789746543546354312';

            // Testing action creator
            action = redux.savingFile();

            expect(action).toEqual({type: redux.SAVING_FILE});

            // Testing reducer
            initialState = {fileId, saveStatus: redux.SAVE_STATUS.SAVED};
            expectedState = {fileId, saveStatus: redux.SAVE_STATUS.SAVING};

            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe('Action type: SAVED_FILE', () => {
        it ('should declare the current file as saved', () => {
            let action;
            let expectedState;
            let fileId;
            let initialState;

            fileId = '1234596789746543546354312';

            // Testing action creator
            action = redux.savedFile();

            expect(action).toEqual({ payload: {}
                                   , type   : redux.SAVED_FILE});

            // Testing reducer
            initialState = {fileId, saveStatus: redux.SAVE_STATUS.SAVING};
            expectedState = {fileId, saveStatus: redux.SAVE_STATUS.SAVED};

            expect(reducer(initialState, action)).toEqual(expectedState);
        });

        it ('should allow "saving as"', () => {
            let action;
            let expectedState;
            let initialFileId;
            let initialState;
            let finalSavedId;

            initialFileId = ' ';
            finalSavedId  = '98765432109876543210548798';

            // Testing action creator
            action = redux.savedFile({fileId: finalSavedId});

            expect(action).toEqual({ payload: {fileId: finalSavedId}
                                   , type: redux.SAVED_FILE});

            // Testing reducer
            initialState  = {fileId: initialFileId, saveStatus: redux.SAVE_STATUS.SAVING};
            expectedState = {fileId: finalSavedId , saveStatus: redux.SAVE_STATUS.SAVED};

            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });
});
