import makeRequest from './utils';
// initial state
// shape: [{ id, quantity }]
const state = {
	loading: false
};

// getters
const getters = {};

//actions
const actions = {};

// mutations
const mutations = {
	SET_LOADING(state, l) {
		state.loading = l;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};

