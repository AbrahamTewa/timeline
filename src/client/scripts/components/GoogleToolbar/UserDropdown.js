// ******************** NodeJS package ********************
import React     from 'react';
import PropTypes from 'prop-types';

// ******************** Container ********************
class UserDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.disconnect = this.disconnect.bind(this);
    }

    disconnect() {
        this.props.disconnect();
    }

    render() {

        let {userProfile} = this.props;

        return (<div className="user-dropdown btn-group">
                    <button className="btn btn-secondary btn-lg">
                        <div className="user-name">
                            <img src={userProfile.image} className="user-avatar"/>
                            {userProfile.fullName}
                        </div>
                    </button>
                    <button type="button"
                            className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        <span className="sr-only">
                            Toggle Dropdown
                        </  span>
                    </button>
                    <div className="dropdown-menu">
                        <a onClick={this.disconnect}
                           className="dropdown-item"
                           href="#">disconnect</a>
                    </div>
                </div>);
    }
}

// ******************** Prop types ********************
UserDropdown.propTypes = { disconnect : PropTypes.func.isRequired
                         , userProfile: PropTypes.shape({ fullName: PropTypes.string.isRequired
                                                        , image   : PropTypes.string.isRequired})};

// ******************** Export ********************
export default UserDropdown;
