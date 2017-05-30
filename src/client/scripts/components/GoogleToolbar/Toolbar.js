// ******************** NodeJS packages ********************
import React        from 'react';
import PropTypes    from 'prop-types';

// ******************** Components ********************
import LoginButton from './LoginButton';
import OpenButton   from './OpenButton';

// ******************** Component ********************

function Toolbar({ access_token
                 , onFileOpen
                 , onLogin}) {

    let button;

    if (access_token)
        button = <OpenButton access_token={access_token}
                             onOpen={onFileOpen}/>;

    return (<div>
                <LoginButton onLogin={onLogin} />
                {button}
            </div>);
}

// ******************** Prop-types ********************
Toolbar.propTypes = { access_token : PropTypes.string
                    , onFileOpen   : PropTypes.func.isRequired
                    , onLogin      : PropTypes.func.isRequired};

// ******************** Exports ********************
export default Toolbar;
