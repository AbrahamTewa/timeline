// ******************** NodeJS packages ********************
import React        from 'react';
import PropTypes    from 'prop-types';

// ******************** Components ********************
import LoginButton    from './LoginButton';
import OpenButton     from './OpenButton';
import SaveButton     from './SaveButton';

// ******************** Component ********************

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let openButton;
        let saveButton;

        if (this.props.access_token) {
            openButton = <OpenButton access_token={this.props.access_token}
                                 onOpen={this.props.onFileOpen}/>;

            saveButton = <SaveButton access_token={this.props.access_token}
                                     onSave={this.props.onSaveAs}/>;
        }

        return (<div className="toolbar">
                    <LoginButton onLogin={this.props.onLogin} />
                    {openButton}
                    {saveButton}
                </div>);
    }

}

// ******************** Prop-types ********************
Toolbar.propTypes = { access_token        : PropTypes.string
                    , onFileOpen          : PropTypes.func.isRequired
                    , onLogin             : PropTypes.func.isRequired
                    , onSaveAs            : PropTypes.func.isRequired};

// ******************** Exports ********************
export default Toolbar;
