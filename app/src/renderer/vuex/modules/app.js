const state = {
	error: null
};

const mutations = {
	setError(state, payload) {
		state.error = payload;
	}
};

const actions = {
	setError({ commit, state }, payload) {
		commit('setError', payload);
	}
};

const getters = {
	lastError: (state) => {
		return state.error;
	}
};

export default {
    state,
    mutations,
    actions,
    getters
};