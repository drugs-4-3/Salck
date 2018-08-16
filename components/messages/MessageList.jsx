import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';


class MessageList extends Component {

	render() {

		let isNoChannelSelected = this.props.activeChannel === null;
		let isChannelWithoutMessages = !isNoChannelSelected && this.props.messages.length === 0;

		if (isNoChannelSelected) {
			return <MesssagesAlertBox content="Najpierw wybierz kanał lub użytkownika"/>;
		}
		if (isChannelWithoutMessages) {
			return <MesssagesAlertBox content="Ten kanał na razie nie ma wiadomości. Zacznij pisać..."/>;
		}

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

function MesssagesAlertBox(props) {
	return (
		<div className="msgs-alert-box">
			{props.content}
		</div>	
	);
}

MessageList.propTypes = {
	messages: PropTypes.array.isRequired,
	activeChannel: PropTypes.object
}

export default MessageList;