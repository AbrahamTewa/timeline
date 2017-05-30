/* global gapi google */

const CLIENT_ID = '1025432133207-5mu6n4o1mgiejpoenii8hkeo3lo1j9qn.apps.googleusercontent.com';

class FilePicker {

    constructor({oauthToken}) {

        let view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes('image/png,image/jpeg,image/jpg');

        this.picker = new google.picker.PickerBuilder();
        this.picker.addView(view)
                   .setOAuthToken(oauthToken)
                   .setCallback(this.pickerCallback.bind(this))
                   .build();
    }

    /**
     * Return a promise resolved once the user selected a file
     * or closed the window.
     * @returns {Promise.<string>} - ID of the picked file or undefined
     */
    display() {
        this.picker.setVisible(true);
        this.pickerPromise = new Promise(function(onFulfill, onError) {
            this.pickerPromiseHolder = {onFulfill, onError};
        }.bind(this));

        return this.pickerPromise;
    }

    pickerCallback(data) {
        if (data.action === google.picker.Action.PICKED)
            this.pickerPromiseHolder.onFulfill(data.docs[0].id);
        else
            this.pickerPromiseHolder.onFulfill(undefined);
    }

}

function authenticate() {

    /** @type {Promise} */
    let promise;

    /** @type {Object.<function>} */
    let promiseHolder;

    promise = new Promise(function(onFulfill, onError) {
        promiseHolder = {onFulfill, onError};
    });

    gapi.load('auth', {'callback': function() {

        let params;

        params = { client_id: CLIENT_ID
                 , scope    : ['https://www.googleapis.com/auth/drive']
                 , immediate: false};

        window.gapi.auth.authorize(params, function(response) {
            if (response.error)
                promiseHolder.onError(response);
            else
                promiseHolder.onFulfill(response);
        });

    }});

    return promise;

}

// ******************** Exports ********************
export { CLIENT_ID
       , FilePicker
       , authenticate};
