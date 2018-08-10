import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';


class MessageList extends Component {

	render() {
		return (
			<ul>
				{
					this.props.messages.map(message => {
						return <Message 
							message={message}
							key={message.id}/>
					})
				}
			</ul>
		);
	}
}

export default MessageList;