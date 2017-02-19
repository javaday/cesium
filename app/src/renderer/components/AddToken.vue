<style>

</style>

<template>
	<el-dialog id="tokenDialog" title="Add Token" size="tiny" :show-close="false" v-model="showModal">
		<el-form :model="tokenForm" ref="tokenForm" :rules="rules">
			<el-form-item prop="token">
				<el-input type="text" v-model="tokenForm.token" placeholder="New Access Token" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
    		<el-button type="success" @click="handleSubmit">Add</el-button>
			<el-button type="danger" @click="close">Cancel</el-button>
  		</span>
	</el-dialog>
</template>

<script>
	import { Loading } from 'element-ui';
	import notifications from './mixins/notifications';
	import Freckle from '../services/freckle';

	export default {
		mixins: [
			notifications
		],
		data: function () {
			return {
				showModal: false,
				tokenForm: {
					token: ''
				},
				rules: {
					token: [
						{ required: true, message: 'Please provide a token.' }
					]
				}
			}
		},
		methods: {
			open() {
				this.showModal = true;
			},
			close() {
				this.$refs.tokenForm.resetFields();
				this.showModal = false;
			},
			handleSubmit() {
				this.$refs.tokenForm.validate((valid) => {
					if (valid) {
						this.process();
					}
				});
			},
			process() {

				let newToken = this.tokenForm.token;

				this.close();

				let loading = Loading.service({
					text: 'Validating Token',
					customClass: 'loading'
				});

				let freckle = new Freckle(newToken);

				try {
					freckle.validate()
						.then(response => {
							loading.close();
							this.showInfo('Token Validated', 'The provided token has been validated.');
							this.$emit('token-validated', freckle);
						})
						.catch(error => {
							loading.close();
							this.showError('Invalid Token', 'The provided token could not be validated.');
						});
				}
				catch (ex) {
					loading.close();
					this.showError('Validation Error', 'An error occurred while validation the token.');
				}
			}
		}
	};

</script>