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
			<el-table-column label="Timer">
				<template scope="props">
					<div v-if="props.row.timer">
						<span>{{ props.row.timer.formatted_time }}</span>&nbsp;
						<el-button size="small" title="Start" v-on:click="startTimer(props.row.id, $event)">
							<icon name="play"></icon>
						</el-button>
						<el-button v-if="props.row.timer.state === 'paused'" size="small" title="Stop" @click="stopTimer(props.row.id)">
							<icon name="stop"></icon>
						</el-button>
					</div>
					<div v-if="!props.row.timer">
						<el-button size="small" title="Start">
							<icon name="play"></icon>
						</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>

	</el-card>
</template>

<script>
	import { ipcRenderer } from 'electron';

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
		methods: {
			startTimer(id) {
				this.account.startTimer(id)
					.then(timer => {
						console.log(timer);
					})
					.catch(error => {
						this.showError('Start Timer Error', 'An error occurred while starting the timer.');
					});
			},
			stopTimer(id) {
				this.account.stopTimer(id)
					.then(timer => {
						console.log(timer);
					})
					.catch(error => {
						this.showError('Stop Timer Error', 'An error occurred while stopping the timer.');
					});
			},
			formatBillable(row, col) {
				if (row.billable) {
					return 'Yes';
				}
				else {
					return 'No';
				}
			},
		},
		mounted: function () {

			this.loading = true;

			this.account.getProjects()
				.then(projects => {

					console.log(projects);
					this.account.getTimers()
						.then(timers => {

							this.projects = projects.map(project => {
								project.timer = timers.find(timer => {
									return timer.project.id === project.id;
								});

								return project;
							});

							this.loading = false;
						})
						.catch(error => {
							this.loading = false;
						});
				})
				.catch(error => {
					this.loading = false;
				});
		}
	}

</script>