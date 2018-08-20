import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';


class MessageSection extends Component {

	render() {
		return (
			<div className="panel panel-primary messages-container">
				<div className="panel-heading">
					<strong>Messages</strong>
				</div>
				<div className="panel-body messages">
					<MessageList 
						messages={this.props.messages}
						activeChannel={this.props.activeChannel}/>
					<MessageForm 
						addMessage={this.props.addMessage}
						activeChannel={this.props.activeChannel}/>
				</div>
			</div>
		);
	}
}

export default MessageSection;