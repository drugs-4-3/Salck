import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Message extends Component {

	render() {
		return(
			<div className="message">
				<div className="author">
					{this.props.message.author}
				</div>
				<div className="timestamp">
					{this.props.message.timestamp}
				</div>
				<div className="body">
					<p>{this.props.message.content}</p>
				</div>
			</div>
		); 
	}
}

export default Message;