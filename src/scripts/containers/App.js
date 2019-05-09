// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ============================================================
// Import modues
import AddMarker from './AddMarker';
import DocumentName from './DocumentName';
import Timeline from './Timeline';
import Toolbar from './Toolbar';

function mapStateToProps(state) {
    return { noMarkers : state.timeline.markers.length === 0 };
}

function App({ noMarkers }) {
    let timeline;

    const noMarkersClass = noMarkers ? 'noMarkers' : '';

    if (!noMarkers) {
        timeline = <Timeline id="timeline" />;
    }

    return (
        <div className={noMarkersClass}>
            <header>
                <DocumentName />
                <Toolbar />
            </header>
            <AddMarker />
            {timeline}
        </div>
    );
}

App.propTypes = { noMarkers : PropTypes.bool.isRequired };

const AppContainer = connect(mapStateToProps)(App);

// ============================================================
// Exports
export default AppContainer;
