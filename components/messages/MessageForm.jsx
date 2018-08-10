import React, {Component} from 'react';
import PropTypes from 'prop-types';


class MessageForm extends Component {

	constructor(props) {
		super(props);
		this.state = {value: ""};
	}

	onSubmit(e) {
		e.preventDefault();
		let inputNode = this.refs.message;
		let messageText = inputNode.value;
		this.props.addMessage(messageText);
		inputNode.value = '';
	}

	render() {
		return (
			<form 
			onSubmit={this.onSubmit.bind(this)}>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						ref="message"/>
				</div>
			</form>
		);
	}
}

export default MessageForm;