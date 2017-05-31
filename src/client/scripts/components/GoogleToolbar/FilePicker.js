/* global google */

// ******************** Class ********************
class FilePicker {

    /**
     *
     * @param {string} access_token
     * @param {Array}  views
     */
    constructor({ access_token
                , views = []}) {

        let builder;

        builder = new google.picker.PickerBuilder();
        builder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
               .enableFeature(google.picker.Feature.NAV_HIDDEN)
               .setOAuthToken(access_token)
               .setCallback(this.onPick.bind(this));

        for(let view of views) {
            builder.addView(view);
        }

        this.picker = builder.build();
    }

    async display() {
        let promise;

        if (this.isDisplayed())
            throw new Error('Picker already displayed');

        promise = new Promise(function(onFulfill, onReject) {
            this.currentPickerPromise = {onFulfill, onReject};
        }.bind(this));

        // Waiting the picker to be built
        await this.pickerPromise;

        this.picker.setVisible(true);

        return promise.then(function(document) {
            this.currentPickerPromise = undefined;
            return document;
        }.bind(this));
    }

    isDisplayed() {
        return !!this.currentPickerPromise;
    }

    onPick(response) {

        if (![google.picker.Action.PICKED, google.picker.Action.CANCEL].includes(response.action))
            return;

        this.currentPickerPromise.onFulfill(response[google.picker.Response.DOCUMENTS]);
    }
}

// ******************** Exports ********************
export default FilePicker;
