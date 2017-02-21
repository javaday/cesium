<style>
	.account {
		margin: 10px;
	}
</style>

<template>
	<el-card class="account">
		<el-row style="margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #324157">
			<el-col :span="22">
				<h2>{{ account.account.name }}</h2>
			</el-col>
			<el-col :span="2" style="text-align: right;">
				<el-button size="small" title="Delete Account">
					<icon name="times"></icon>
				</el-button>
			</el-col>
		</el-row>
		<el-table class="table" :data="projects" stripe style="width: 100%" v-loading="loading" element-loading-text="Loading Projects">
			<el-table-column prop="name" label="Project">
			</el-table-column>
			<el-table-column prop="billable" label="Billable" :formatter="formatBillable">
			</el-table-column>
			<el-table-column label="Edit" :context="_self" inline-template>
				<div>
					<el-button size="small" type="info" icon="edit">
					</el-button>
				</div>
			</el-table-column>
		</el-table>

	</el-card>
</template>

<script>
	export default {
		props: {
			account: [Object]
		},
		data: function () {
			return {
				projects: [],
				loading: false
			}
		},
		mounted: function () {

			this.loading = true;

			this.account.getProjects()
				.then(projects => {
					this.projects = projects;
					this.loading = false;
				})
				.catch(error => {
					this.loading = false;
				});
		},
		methods: {
			formatBillable(row, col) {
				if (row.billable) {
					return 'Yes';
				}
				else {
					return 'No';
				}
			},
		}
	}

</script>