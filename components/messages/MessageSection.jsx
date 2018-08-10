import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';


class MessageSection extends Component {



	render() {
		return (
			<div className="support panel panel-primary messages-container">
				<div className="panel-heading">
					<strong>Messages</strong>
				</div>
				<div className="panel-body messages">
					<MessageList 
						messages={this.props.messages}/>
					<MessageForm 
						addMessage={this.props.addMessage}/>
				</div>
			</div>
		);
	}
}

export default MessageSection;