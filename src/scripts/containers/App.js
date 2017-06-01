import React from 'react';
import AddMarker    from './AddMarker';
import DocumentName from './DocumentName';
import Timeline     from './Timeline';
import Toolbar      from './Toolbar';

function App() {
    return (<div>
                <header>
                    <DocumentName />
                    <Toolbar />
                </header>
                <AddMarker/>
                <Timeline id="timeline"/>
            </div>);
}

export default App;
