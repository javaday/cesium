export default {
	created: function () {

	},
	methods: {
		showInfo(title, message) {
			this.$notify.info({
				title: title,
				message: message
			});
		},
		showError(title, message) {
			this.$notify.error({
				title: title,
				message: message
			});
		}
	}
};