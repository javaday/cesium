import rp from 'request-promise';

class FreckleService {

	constructor(token) {

		this.token = token;
		this.account = null;
		this.user = null;
	}

	validate() {
		return new Promise((resolve, reject) => {

			let options = this.getRequestOptions('account');

			rp(options)
				.then((response) => {
					this.account = response;
					return this.getCurrentUser();
				})
				.then((response) => {
					this.user = response;
					resolve(this);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	getCurrentUser() {
		return new Promise((resolve, reject) => {

			let options = this.getRequestOptions('current_user');

			rp(options)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	getProjects() {
		return new Promise((resolve, reject) => {

			let options = this.getRequestOptions('projects');

			rp(options)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	getTimers() {
		return new Promise((resolve, reject) => {

			let options = this.getRequestOptions('timers');

			rp(options)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}	

	getEntries() {
		return new Promise((resolve, reject) => {

			let options = this.getRequestOptions('entries');

			rp(options)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	getProjectTimer(projectId) {
		return new Promise((resolve, reject) => {

			let options = this.getRequestOptions('projects', projectId, 'timer');

			rp(options)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					resolve(null);
					//reject(error);
				});
		});
	}

	startTimer(projectId) {
		return new Promise((resolve, reject) => {

			let options = this.getRequestOptions('projects', projectId, 'timer/start');

			options.method = 'PUT';
			
			rp(options)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	stopTimer(projectId) {
		return new Promise((resolve, reject) => {

			let options = this.getRequestOptions('projects', projectId, 'timer/log');

			options.method = 'PUT';
			
			rp(options)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	getRequestOptions(resource, id, action) {

		let options = {
			uri: 'https://api.letsfreckle.com/v2/' + resource,
			qs: {
				freckle_token: this.token
			},
			headers: {
				'User-Agent': 'Cesium/1.0'
			},
			json: true
		};

		if (id) {
			options.uri += '/' + id;
		}

		if (action) {
			options.uri += '/' + action;
		}

		return options;
	}

}

export default FreckleService;