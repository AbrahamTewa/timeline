/* global google */

// ******************** Class ********************
class FilePicker {

    /**
     *
     * @param {string}   access_token
     * @param {string[]} features
     * @param {Array}    views
     */
    constructor({ access_token
                , features = []
                , views    = []}) {

        let builder;

        this.builder = new google.picker.PickerBuilder();
        this.builder.setOAuthToken(access_token)
               .setCallback(this.onPick.bind(this));

        this.builder.setOrigin(window.location.protocol + '//' + window.location.host);
        this.builder.disableFeature(google.picker.Feature.NAV_HIDDEN);

        features.forEach(function(feature) {
            builder.enableFeature(feature);
        });

        for(let view of views) {
            this.builder.addView(view);
        }
    }

    async display() {
        let promise;

        if (this.isDisplayed())
            throw new Error('Picker already displayed');

        if (!this.picker)
            this.picker = this.builder.build();

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
