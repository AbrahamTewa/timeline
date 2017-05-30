/* global gapi google */
// ******************** NodeJS packages ********************
import React from 'react';
import PropTypes from 'prop-types';

// ******************** Component ********************
class OpenButton extends React.Component {

    constructor(props) {

        let promise;
        let promiseHolder;

        super(props);
        this.onClick = this.onClick.bind(this);

        promise = new Promise(function(onFulfill, onReject) {
            promiseHolder = {onFulfill, onReject};
        }.bind(this));

        //noinspection JSUnusedAssignment
        gapi.load('picker', {'callback': promiseHolder.onFulfill});

        this.pickerPromise = promise.then(function() {
            console.log(this.props.access_token);
            let builder;
            let view;

            view = new google.picker.View(google.picker.ViewId.DOCS);
            view.setMimeTypes('image/png,image/jpeg,image/jpg');

            builder = new google.picker.PickerBuilder();
            builder.addView(view)
                   .addView(new google.picker.DocsUploadView())
                   .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                   .enableFeature(google.picker.Feature.NAV_HIDDEN)
                   .setOAuthToken(this.props.access_token)
                   .setCallback(this.onPick.bind(this));

            this.picker = builder.build();
        }.bind(this));

        this.openning = false;
    }

    onClick() {
        if (this.openning)
            return;

        this.openning = true;

        this.pickerPromise.then(function() {
            this.picker.setVisible(true);
            this.openning = false;
        }.bind(this));
    }

    onPick(data) {
        if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
            let doc;
            let url;

            doc = data[google.picker.Response.DOCUMENTS][0];
            url = doc[google.picker.Document.URL];

            this.props.onOpen(url);
        }
    }

    render() {
        return (<button className={this.props.access_token ? '' : 'hidden'}
                        onClick={this.onClick}>
                    Ouvrir timeline
                </button>);
    }

}

// ******************** Prop-types ********************
OpenButton.propTypes = { access_token : PropTypes.string
                       , onOpen       : PropTypes.func.isRequired};

// ******************** Exports ********************
export default OpenButton;
