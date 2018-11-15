import makeRequest from './utils';
// initial state
// shape: [{ id, quantity }]
const state = {
	loading: false,
	error: null,
	errTimeout: 5000,
};

// getters
const getters = {};

//actions
const actions = {
	setError({state, commit, rootState }, err) {
		console.log(err)
		commit('SET_ERROR', err)
		setTimeout(() => {
			commit('SET_ERROR', null)
		}, state.errTimeout)
	},
};

// mutations
const mutations = {
	SET_LOADING(state, l) {
		state.loading = l;
	},
	SET_ERROR(state, e) {
		state.error = e;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};

