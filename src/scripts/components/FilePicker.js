/* global google */

// ============================================================
// Component
class FilePicker {
    /**
     *
     * @param {string}   access_token
     * @param {string[]} features
     * @param {Array}    views
     */
    constructor({
        access_token : accessToken,
        features = [],
        views = [],
    }) {
        let builder;

        this.builder = new google.picker.PickerBuilder();
        this.builder.setOAuthToken(accessToken)
            .setCallback(this.onPick.bind(this));

        this.builder.setOrigin(`${window.location.protocol}//${window.location.host}`);
        this.builder.disableFeature(google.picker.Feature.NAV_HIDDEN);

        features.forEach((feature) => {
            builder.enableFeature(feature);
        });

        views.forEach((view) => {
            this.builder.addView(view);
        });
    }

    async display() {
        if (this.isDisplayed()) {
            throw new Error('Picker already displayed');
        }

        if (!this.picker) {
            this.picker = this.builder.build();
        }

        const promise = new Promise(((onFulfill, onReject) => {
            this.currentPickerPromise = { onFulfill, onReject };
        }));

        // Waiting the picker to be built
        await this.pickerPromise;

        this.picker.setVisible(true);

        return promise.then((document) => {
            this.currentPickerPromise = undefined;
            return document;
        });
    }

    isDisplayed() {
        return !!this.currentPickerPromise;
    }

    onPick(response) {
        if (![google.picker.Action.PICKED, google.picker.Action.CANCEL].includes(response.action)) {
            return;
        }

        this.currentPickerPromise.onFulfill(response[google.picker.Response.DOCUMENTS]);
    }
}

// ============================================================
// Exports
export default FilePicker;
