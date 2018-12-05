
// initial state
// shape: [{ id, quantity }]
const state = {
	client: null,
	host: undefined
};

// getters
const getters = {
};

// actions
const actions = {
	setClient({ commit }, client) {
		commit('SET_API', client);
	}
};

// mutations
const mutations = {
	SET_API(state, client) {
		state.client = client;
	},
	SET_HOST(state, h) {
		state.host = h;
	}
};


/**
 * Core module containing API client and baase URL
 * @exports c3s
 * @namespace c3s
 */
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
