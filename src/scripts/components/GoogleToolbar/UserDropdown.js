// ******************** NodeJS package ********************
import React from 'react';
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
        const { userProfile } = this.props;

        return (
            <div className="user-dropdown btn-group">
                <button
                    className="btn btn-secondary user-button"
                    type="button"
                >
                    <div className="user-name">
                        <img
                            src={userProfile.image}
                            className="user-avatar"
                            alt="avatar"
                        />
                        {userProfile.fullName}
                    </div>
                </button>
                <button
                    type="button"
                    className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span className="sr-only">
                            Toggle Dropdown
                    </span>
                </button>
                <div className="dropdown-menu">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        onClick={this.disconnect}
                        className="dropdown-item"
                        href="#"
                    >
                        disconnect
                    </a>
                </div>
            </div>
        );
    }
}

UserDropdown.defaultProps = {
    userProfile : undefined,
};

UserDropdown.propTypes = {
    disconnect  : PropTypes.func.isRequired,
    userProfile : PropTypes.shape({
        fullName : PropTypes.string.isRequired,
        image    : PropTypes.string.isRequired,
    }),
};

// ============================================================
// Exports
export default UserDropdown;
