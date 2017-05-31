// ******************** NodeJS packages ********************
import React        from 'react';
import PropTypes    from 'prop-types';

// ******************** Components ********************
import LoginButton    from './LoginButton';
import OpenButton     from './OpenButton';
import SaveButton     from './SaveButton';
import UserDropdown   from './UserDropdown';

// ******************** Component ********************

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let openButton;
        let saveButton;
        let userDropdown;

        if (this.props.access_token) {
            openButton = <OpenButton access_token= {this.props.access_token}
                                     document    = {this.props.document}
                                     onOpen      = {this.props.onFileOpen}/>;

            saveButton = <SaveButton access_token= {this.props.access_token}
                                     onSave      = {this.props.onSaveAs}/>;

            userDropdown = <UserDropdown disconnect  = {this.props.disconnect}
                                         userProfile = {this.props.userProfile}/>;
        }

        return (<div className="toolbar">
                    <LoginButton onLogin={this.props.onLogin}
                                 isAuthenticated={!!this.props.access_token}/>
                    {userDropdown}
                    {openButton}
                    {saveButton}
                </div>);
    }

}

// ******************** Prop-types ********************
Toolbar.propTypes = { access_token : PropTypes.string
                    , disconnect   : PropTypes.func.isRequired
                    , document     : PropTypes.shape({ saved: PropTypes.bool.isRequired
                                                     , url  : PropTypes.string}).isRequired
                    , onFileOpen   : PropTypes.func.isRequired
                    , onLogin      : PropTypes.func.isRequired
                    , onSaveAs     : PropTypes.func.isRequired

                    , userProfile  : UserDropdown.propTypes.userProfile};

// ******************** Exports ********************
export default Toolbar;
