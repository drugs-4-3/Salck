import React, {Component} from 'react';
import PropTypes from 'prop-types';
import User from './User.jsx';

class UserList extends Component {

	render() {
		return (
			<div className="panel users">
				<ul>
					{
						this.props.users.map(user => {
							return <User 
								user={user}
								setUser={this.props.setUser} 
								key={user.id}/>
						})
					}
				</ul>
			</div>
		)
	}
}

export default UserList;