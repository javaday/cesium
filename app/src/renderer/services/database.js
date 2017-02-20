const remote = window.require('electron').remote;

let singleton = null;

class Database {

	constructor() {
		this.config = remote.getGlobal('config');
	}

	static get instance() {
		if (singleton) {
			return singleton;
		}
		else {
			singleton = new Database();
			return singleton;
		}
	}

	getTokens() {
		return this.config.get('tokens').value();
	}

	addToken(token) {

		let tokens = this.config.get('tokens').value();

		tokens.push(token);

		this.config.set('tokens', tokens)
			.write();
		
		return tokens;
	}

	deleteToken(token) {

		let tokens = this.config.get('tokens').value();
		let index = tokens.indexOf(token);

		if (index > -1) {
			tokens.splice(index, 1);
		}

		this.config.set('tokens', tokens)
			.write();
		
		return tokens;
	}
}

export default Database.instance;