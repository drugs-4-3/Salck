import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import Moment from 'moment';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			channels: [],
			messages: [],
			activeChannel: null
		};
	}

	addChannel(name) {
		
		let channelOfName = this.getChannelOfName(name);
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

	getChannelOfName(name) {
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
		if (typeof messages[activeChannel.name] === 'undefined') {
			messages[activeChannel.name] = [];
		}
		this.setState({messages, activeChannel});
	}

	addMessage(messageText) {
		let {messages} = this.state;
		let currentChannelName = this.state.activeChannel.name;
		let newMessage = {
			content: messageText, 
			timestamp: Moment().format("YYYY-MM-DD HH:mm:ss"),
			author: "mihau",
			id: messages[currentChannelName].length + 1
		}
		messages[currentChannelName].push(newMessage);
		this.setState({messages});
	}

	render() {
		let messages = this.state.activeChannel ? this.state.messages[this.state.activeChannel.name] : [];

		return (
			<div className="app">
				
				<div className="nav">
					<ChannelSection 
						channels = {this.state.channels}
						addChannel = {this.addChannel.bind(this)}
						setChannel = {this.setChannel.bind(this)}
						activeChannel = {this.state.activeChannel}
					/>
				</div>

				<MessageSection
					activeChannel={this.state.activeChannel}
					messages={messages}
					addMessage={this.addMessage.bind(this)}
				/>
			</div>
		);
	}
}

export default App;