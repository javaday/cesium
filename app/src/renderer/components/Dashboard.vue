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
    background-color: rgba(249, 250, 252,.7);
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
		<add-token ref="addToken" @token-validated="addAccount"></add-token>
	</div>
</template>

<script>
	import AddToken from './AddToken';

	export default {
		methods: {
			addToken() {
				this.$refs.addToken.open();
			},
			addAccount(service) {
				this.$store.dispatch('addToken', service.token);
				console.log('Service: ', service);
			}
		},
		components: {
			'add-token': AddToken
		}
	};

</script>