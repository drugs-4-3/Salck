import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Channel extends Component {

	onClick(e) {
		e.preventDefault();
		this.props.setChannel(this.props.channel);
	}

	render() {
		let activeClass = this.props.isActive ? "active" : "";
		return (
			<li className={activeClass}>
				<a onClick={this.onClick.bind(this)}>
					#{this.props.channel.name}
				</a>
			</li>
		);
	}
}

Channel.propTypes = {
	channel: PropTypes.object.isRequired,
	setChannel: PropTypes.func.isRequired
};

export default Channel;