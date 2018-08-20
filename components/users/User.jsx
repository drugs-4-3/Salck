import React, {Component} from 'react';
import PropTypes from 'prop-types';

class User extends Component {

	render() {
		
		let activeClass = this.props.isActive ? "active" : "";

		return (
			<li className={"user " + activeClass}>
				<a 
				onClick={this.setUser.bind(this)}>
					{this.props.user.name}
				</a>
			</li>
		);
	}

	setUser(e) {
		e.preventDefault();
		return this.props.setUser(this.props.user);
	}
}

export default User;