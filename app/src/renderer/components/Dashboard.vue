<style>
	.top-bar {
		background-color: #324157;
		padding: 10px;
	}
	
	.title {
		position: absolute;
		top: 0px;
	}
	
	.logo h1 {
		color: orange;
		display: inline-block;
	}
	
	.logo svg {
		color: white;
	}
	
	.loading {
		background-color: rgba(249, 250, 252, .7);
	}
</style>

<template>
	<div>
		<el-row class="top-bar">
			<el-col :span="1" class="logo">
				&nbsp;
			</el-col>
			<el-col :span="21" class="logo">
				<icon name="bolt" scale="2"></icon>
				<h1>Cesium</h1>
			</el-col>
			<el-col :span="2">
				<el-button size="small" title="Add Token" @click="addToken">
					<icon name="key"></icon>
				</el-button>
			</el-col>
		</el-row>
		<freckle-account v-for="account in accounts" :account="account" v-loading="loading" element-loading-text="Loading Accounts"></freckle-account>
		<add-token ref="addToken" @token-validated="createAccount"></add-token>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Freckle from '../services/freckle';
	import AddToken from './AddToken';
	import FreckleAccount from './FreckleAccount';
	import db from '../services/database';

	export default {
		data: function() {
			return {
				loading: false
			}
		},
        computed: {
			...mapGetters({
                accounts: 'filteredAccounts',
                paging: 'accountPaging'
            })
        },
		methods: {
			addToken() {
				this.$refs.addToken.open();
			},
			createAccount(account) {
				this.$store.dispatch('addToken', account.token);
				this.$store.dispatch('addAccount', account);
			}
		},
		mounted: function () {

			this.loading = true;

			let tokens = db.getTokens();

			tokens.forEach(token => {

				let freckle = new Freckle(token);

				freckle.validate()
					.then(response => {
						this.$store.dispatch('addAccount', freckle);
					})
					.catch(error => {
						// load invalid account
					});
			});

			console.log('Accounts: ', this.accounts);

			this.loading = false;
		},
		components: {
			'add-token': AddToken,
			'freckle-account': FreckleAccount
		}
	};

</script>