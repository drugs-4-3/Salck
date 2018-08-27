import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import UserSection from './users/UserSection.jsx';
import Moment from 'moment';
import Socket from "../socket.js";

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isConnected: false,
			channels: [],
			users: this.getInitialUsers(),
			messages: this.getInitializedEmptyMessages(),
			activeChannel: null,
			activeUser: null
		};
	}

	componentDidMount() {
		let socket = this.socket = new Socket();
		socket.on("connect", this.onConnect.bind(this));
		socket.on("disconnect", this.onDisconnect.bind(this));
		socket.on("channel add", this.onAddChannel.bind(this));
	}

	onConnect() {
		this.setState({isConnected: true});
	}

	onDisconnect() {
		this.setState({isConnected: false});
	}

	addChannel(name) {
		let channelOfName = this.getChannelByName(name);
		if (channelOfName !== null) {
			return this.setChannel(channelOfName);
		}

		this.socket.emit("channel add", {name});
	}

	onAddChannel(channelData) {
		if (typeof channelData.name != 'undefined' && channelData.name.length > 0 && 
			typeof channelData.id != 'undefined' && channelData.id.length > 0) {
				this.newChannel(channelData);
			}
	}

	newChannel(channel) {
		let {channels} = this.state;
		channels.push(channel);
		this.setState({
			channels
		});
		this.setChannel(channel);
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