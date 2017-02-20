import db from '../../services/database';

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

	addToken(state, token) {
		state.list.push(token);
	},

	removeToken(state, token) {
		let index = state.list.indexOf(token);

		if (index > -1) {
			state.list.splice(index, 1);
		}
	},

	setTokenQuery(state, query) {

		state.query = query;

		filterTokens(state, state.query);
	},

	setTokenPage(state, val) {
		state.paging.currentPage = val;
	},

	setTokenPageSize(state, val) {
		state.paging.pageSize = val;
	}
};

const actions = {

	addToken({ commit, state }, token) {

		db.addToken(token);		

		commit('addToken', token);
	},

	removeToken({ commit, state }, token) {

		db.deleteToken(token);

		commit('removeToken', token);
	},

	queryTokens({ commit, state }, query) {
		commit('setTokenQuery', query);
	},

	setTokenPage({commit, state}, val) {
		commit('setTokenPage', val);
	},

	setTokenPageSize({commit, state}, val) {
		commit('setTokenPageSize', val);
	}
};

const getters = {

	filteredTokens: (state) => {

		let filtered = state.filteredList;

		let begin = state.paging.pageSize * state.paging.currentPage - state.paging.pageSize;
		let end = begin + state.paging.pageSize;

		end = end > filtered.length ? filtered.length : end;

		return filtered.slice(begin, end);
	},

	tokenPaging: (state) => {
		return state.paging;
	}
};

function filterTokens(state, query) {

	let filtered = [];

	var query = query.toLowerCase();

	filtered = state.list.filter((item) => {
		return item.toLowerCase().includes(query);
	});

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