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

	getRequestOptions(action) {

		let options = {
			uri: 'https://api.letsfreckle.com/v2/' + action,
			qs: {
				freckle_token: this.token
			},
			headers: {
				'User-Agent': 'Cesium/1.0'
			},
			json: true
		};

		if (action === 'projects') {
			console.log('Getting: ', options);
		}	
		return options;		
	}

}

export default FreckleService;