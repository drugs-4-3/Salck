import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Message extends Component {

	render() {
		return(
			<div className="message">
				<div className="message-header">
					<div className="author">
						{this.props.message.author}
					</div>
					<div className="timestamp">
						{this.props.message.timestamp}
					</div>
				</div>
				<div className="message-body">
					<p>{this.props.message.content}</p>
				</div>
			</div>
		); 
	}
}

Message.propTypes = {
	message:PropTypes.object.isRequired
}

export default Message;