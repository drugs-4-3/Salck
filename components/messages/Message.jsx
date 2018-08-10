import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Message extends Component {

	render() {
		return(
			<div className="message">
				<p>{this.props.message.content}</p>
			</div>
		); 
	}
}

export default Message;