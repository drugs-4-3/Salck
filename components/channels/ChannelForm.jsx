import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChannelForm extends Component {

	constructor(props) {
		super(props);
		this.state = {value: ""};

		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const node = this.refs.channel;
		const channelName = node.value;

		if (channelName.length > 0) {
			this.props.addChannel(channelName);
			this.setState({value: ""});	
		}
	}

	handleChange(event) {
		let value = event.target.value;
		value = value.replace(/\s+/g, ''); // remove whitespaces
		this.setState({value});
	}

	render() {
		return (
			<form 
			onSubmit={this.onSubmit}>
				<div className="form-group">
					<input
						value={this.state.value}
						className="form-control"
						placeholder="Add channel"
						type="text"
						ref="channel"
						onChange={this.handleChange}/>
				</div>
			</form>
		);
	}
}

ChannelForm.propTypes = {
	addChannel: PropTypes.func.isRequired
};

export default	ChannelForm;