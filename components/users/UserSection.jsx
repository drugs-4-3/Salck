import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList.jsx';

class UserSection extends Component {

	render() {
		return (
			<div className="support panel panel-primary">
				<div className="panel-heading">
					Users
				</div>
				<div className="panel-body users">
					<UserList
						users={this.props.users}
						setUser={this.props.setUser}
					/>
				</div>
			</div>
		);
	}
}

export default UserSection;