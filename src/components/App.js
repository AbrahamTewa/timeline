import React from 'react';
import CurrentTitle from '../containers/CurrentTitle';
import InputTitle from '../containers/InputTitle';

function App() {
    return (<div>
                <CurrentTitle />
                <div>
                    Set title: <InputTitle/>
                </div>
            </div>);
}

export default App;
