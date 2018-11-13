var SHA256 = require('crypto-js/sha256');
// initial state
// shape: [{ id, quantity }]
const state = {
	user: null,
	currentUser: null
};

// getters
const getters = {
};

// actions
const actions = {
	async login({
		state,
		commit,
		dispatch,
		rootState
	}, user) {
		return makeRequest(rootState.api.client.apis.Users.login, user, 'SET_CURRENT_USER');
	},
	async generateAnon({
		state,
		commit,
		dispatch,
		rootState
	}) {
		commit('settings/SET_LOADING', true, {root: true});
		const now = '' + Date.now();
		const id = 'anon' + SHA256(now);
		const pwd = '' + SHA256(id);
		let u = await dispatch('register', {'username': id, 'pwd': pwd});
		return u;
	},
	logout({
		state,
		commit
	}) {
		commit('user/SET_CURRENT_USER', null, {
			root: true
		});
	},
	async requestReset({
		state,
		commit,
		dispatch,
		rootState
	}, email) {
		return makeRequest(rootState.api.client.apis.Users.reset, {email: email}, undefined);
	},
	async resetPwd({
		state,
		commit,
		rootState
	}, reset) {
		return makeRequest(rootState.api.client.apis.Users.verify_reset, {reset: reset}, undefined);
	},
	async register({
		state,
		commit,
		rootState
	}, user) {
		commit('settings/SET_LOADING', true, {
			root: true
		});
		return makeRequest(rootState.api.client.apis.Users.post, {user: user}, undefined);
	},
	getUser({
		state,
		commit,
		rootState
	}, id) {
		return makeRequest(rootState.api.client.apis.Users.get_one, {id: id}, 'SET_USER');
	},
	async updateUser({
		state,
		commit,
		rootState
	}, [id, info]) {
		return makeRequest(rootState.api.client.apis.Users.put, {id: id, user: info}, 'SET_CURRENT_USER');
	},
	async validate({
		state,
		commit,
		rootState
	}, id) {
		if (state.currentUser.api_key !== undefined) {
			return makeRequest(rootState.api.client.apis.Users.validate, {key: state.currentUser.api_key}, 'SET_CURRENT_USER');
		}
	}
};

// mutations
const mutations = {
	SET_USER(state, user) {
		state.user = user;
	},
	SET_CURRENT_USER(state, user) {
		state.currentUser = user;
	},
	SET_TASK_PROGRESS(state, prog) {
		state.taskProgress = prog;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
