import React from 'react';
import AddMarker from './AddMarker';
import Timeline from './Timeline';
import Toolbar from './Toolbar';

function App() {
    return (<div>
                <Toolbar />
                <AddMarker/>
                <Timeline id="timeline"/>
            </div>);
}

export default App;
