
const state = {
	list: [],
	filteredList: [],
	query: '',
	paging: {
		currentPage: 1,
		pageSize: 25,
		pageCount: 1,
		totalItems: 0,
		pageSizes: [10, 25, 50]
	}
};

const mutations = {

	addAccount(state, account) {
		state.list.push(account);
		filterAccounts(state);
	},

	removeAccount(state, account) {
		let index = state.list.indexOf(account);

		if (index > -1) {
			state.list.splice(index, 1);
		}
	},

	setAccountQuery(state, query) {
		state.query = query;

		filterAccounts(state);
	},

	setAccountPage(state, val) {
		state.paging.currentPage = val;
	},

	setAccountPageSize(state, val) {
		state.paging.pageSize = val;
	}
};

const actions = {

	addAccount({ commit, state }, account) {

		commit('addAccount', account);
	},

	removeAccount({ commit, state }, account) {

		commit('removeAccount', account);
	},

	queryAccounts({ commit, state }, query) {
		commit('setAccountQuery', query);
	},

	setAccountPage({commit, state}, val) {
		commit('setAccountPage', val);
	},

	setAccountPageSize({commit, state}, val) {
		commit('setAccountPageSize', val);
	}
};

const getters = {

	filteredAccounts: (state) => {

		let filtered = [].concat(state.filteredList);
		
		filtered.sort((a, b) => {
			return a.account.name.localeCompare(b.account.name);
		});

		let begin = state.paging.pageSize * state.paging.currentPage - state.paging.pageSize;
		let end = begin + state.paging.pageSize;

		end = end > filtered.length ? filtered.length : end;

		return filtered.slice(begin, end);
	},

	accountPaging: (state) => {
		return state.paging;
	}
};

function filterAccounts(state) {

	let filtered = state.list;
	let query = state.query.toLowerCase();

	if (query) {
		filtered = state.list.filter((item) => {
			return item.toLowerCase().includes(query);
		});
	}

	state.paging = {
		currentPage: 1,
		pageSize: state.paging.pageSize,
		pageCount: parseInt(filtered.length / state.paging.pageSize),
		totalItems: filtered.length,
		pageSizes: state.paging.pageSizes
	};

	state.filteredList = filtered;
}

export default {
	state,
	mutations,
	actions,
	getters
};