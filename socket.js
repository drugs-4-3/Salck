import {EventEmitter} from 'events';

class Socket {

	constructor(webSocket = new WebSocket("ws://localhost:4000"), eventEmitter = new EventEmitter()) {
		this.webSocket = webSocket;
		this.eventEmitter = eventEmitter;

		webSocket.onmessage = this.message.bind(this);
		webSocket.onopen = this.open.bind(this);
		webSocket.onclose = this.close.bind(this);	
	}

	message(e) {
		try {
			const msg = JSON.parse(e.data);
			this.eventEmitter.emit(msg.name, msg.data);
		} catch (err) {
			this.eventEmitter.emit("error", err);
		}
		
	}

	emit(name, data) {
		const message = JSON.stringify({name, data});
		this.webSocket.send(message);
	}

	open(e) {
		this.eventEmitter.emit("connect");
	}

	close(e) {
		this.eventEmitter.emit("disconnected");
	}

	on(name, fn) {
		this.eventEmitter.on(name, fn);
	}

	off (name, fn) {
		this.eventEmitter.removeListener(name, fn);
	}
}

export default Socket; 