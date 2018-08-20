import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserSection from './users/UserSection.jsx';
import Moment from 'moment';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			channels: [],
			users: this.getInitialUsers(),
			messages: this.getInitializedEmptyMessages(),
			activeChannel: null,
			activeUser: null
		};
	}

	getInitialUsers() {
		return [
			{
				name: "jurek",
				id: "1"
			},
			{
				name: "endrju",
				id: "2"
			},
			{
				name: "stasiek",
				id: "3"
			}
		];
	}

	getInitializedEmptyMessages() {
		let messages = [];
		messages['channels'] = [];
		messages['users'] = [];

		return messages;
	}

	addChannel(name) {
		
		let channelOfName = this.getChannelByName(name);
		if (channelOfName !== null) {
			return this.setChannel(channelOfName);
		}

		let {channels} = this.state;
		let newChannel = {
			id: channels.length + 1,
			name
		};

		channels.push(newChannel);
		this.setState({channels})
		this.setChannel(newChannel);
		// TODO: send to a server
	}

	getChannelByName(name) {
		let {channels} = this.state;
		for (let i = 0; i < channels.length; i++) {
			if (channels[i].name === name) {
				return channels[i];
			}
		}
		return null;
	}
 	
	setChannel(activeChannel) {
		let {messages} = this.state;
		if (typeof messages['channels'][activeChannel.name] === 'undefined') {
			messages['channels'][activeChannel.name] = [];
		}

		this.setState({
			messages, 
			activeChannel,
			activeUser: null
		});
	}

	setUser(activeUser) {
		let {messages} = this.state;
		if (typeof messages['users'][activeUser.name] === 'undefined') {
			messages['users'][activeUser.name] = [];
		}
		if (activeUser !== null) {
			this.setState({
				activeChannel: null,
				activeUser,
				messages
			});
		}
	}

	addMessage(messageText) {

		let currentMessagesNode = this.getCurrentMessagesNode();
		if (currentMessagesNode === null) {
			return;
		}

		let currentMessagesKey = this.getCurrentMessagesKey();
		if (currentMessagesKey === null) {
			return;
		}

		let {messages} = this.state;
		let newMessage = {
			content: messageText, 
			timestamp: Moment().format("YYYY-MM-DD HH:mm:ss"),
			author: "mihau",
			id: messages[currentMessagesNode][currentMessagesKey].length + 1
		}

		messages[currentMessagesNode][currentMessagesKey].push(newMessage);
		this.setState({messages});
	}

	getCurrentMessagesNode() {
		let activeChannel = this.state.activeChannel;
		if (activeChannel !== null) {
			return 'channels';
		}

		let activeUser = this.state.activeUser;
		if (activeUser !== null) {
			return 'users';	
		}

		return null;
	}

	getCurrentMessagesKey() {
		let activeChannel = this.state.activeChannel;
		if (activeChannel !== null) {
			return activeChannel.name;
		}

		let activeUser = this.state.activeUser;
		if (activeUser !== null) {
			return activeUser.name;
		}

		return null;
	}

	getCurrentMessages() {
		let activeChannel = this.state.activeChannel;
		if (activeChannel !== null) {
			return this.state.messages['channels'][activeChannel.name];
		}

		let activeUser = this.state.activeUser;
		if (activeUser !== null) {
			return this.state.messages['users'][activeUser.name];
		}

		return [];
	}

	render() {
		let messages = this.getCurrentMessages();
		
		return (
			<div className="app">
				
				<div className="nav">
					<ChannelSection 
						channels = {this.state.channels}
						addChannel = {this.addChannel.bind(this)}
						setChannel = {this.setChannel.bind(this)}
						activeChannel = {this.state.activeChannel}
					/>
					<UserSection
						users={this.state.users}
						activeUser = {this.state.activeUser}
						setUser={this.setUser.bind(this)}
					/>
				</div>

				<MessageSection
					activeChannel={this.state.activeChannel}
					activeUser = {this.state.activeUser}
					messages={messages}
					addMessage={this.addMessage.bind(this)}
				/>
			</div>
		);
	}
}

export default App;