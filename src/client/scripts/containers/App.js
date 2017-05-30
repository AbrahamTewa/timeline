import React from 'react';
import AddMarker from './AddMarker';
import Timeline from './Timeline';
import GoogleButton from './GoogleButton';

function App() {
    return (<div>
                <GoogleButton />
                <AddMarker/>
                <Timeline id="timeline"/>
            </div>);
}

export default App;
