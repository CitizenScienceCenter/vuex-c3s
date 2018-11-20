import makeRequest from './utils';

var SHA256 = require('crypto-js/sha256');
// initial state
// shape: [{ id, quantity }]
const state = {
	user: null,
	currentUser: null
};

// getters
const getters = {};

// actions
const actions = {
	/**
	 * Login user
	 * @param state
	 * @param commit
	 * @param dispatch
	 * @param rootState
	 * @param user
	 * @returns {Promise<*|boolean|void>}
	 */
	async login({
		state,
		commit,
		dispatch,
		rootState
	}, user) {
		console.log('loggin in')
		return makeRequest(commit, rootState.c3s.client.apis.Users.login, user, 'c3s/user/SET_CURRENT_USER');
	},
	/**
	 * Create anonymouse user and register with backend
	 * @param state
	 * @param commit
	 * @param dispatch
	 * @param rootState
	 * @returns {Promise<*>}
	 */
	async generateAnon({
						   state,
						   commit,
						   dispatch,
						   rootState
					   }) {
		commit('c3s/settings/SET_LOADING', true, {root: true});
		const now = '' + Date.now();
		const id = 'anon' + SHA256(now); // TODO add extra details to avoid clash OR delegate to server?
		const pwd = '' + SHA256(id);
		const u = {
		    'username': id,
            'pwd': pwd,
            'confirmed': false
        }
        return makeRequest(commit, rootState.c3s.client.apis.Users.create_user, {user: u}, 'c3s/user/SET_CURRENT_USER');
	},
	/**
	 * Logout user and remove from local store
	 * @param state
	 * @param commit
	 */
	logout({
			   state,
			   commit
		   }) {
		commit('c3s/user/SET_CURRENT_USER', null, {
			root: true
		});
	},
	/**
	 * Request to reset password
	 * @param state
	 * @param commit
	 * @param dispatch
	 * @param rootState
	 * @param email
	 * @returns {Promise<*|boolean|void>}
	 */
	async requestReset({
						   state,
						   commit,
						   dispatch,
						   rootState
					   }, email) {
		return makeRequest(commit, rootState.c3s.client.apis.Users.reset, {email: email}, undefined);
	},
	/**
	 * Reset user password with code
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param reset
	 * @returns {Promise<*|boolean|void>}
	 */
	async resetPwd({
					   state,
					   commit,
					   rootState
				   }, reset) {
		return makeRequest(commit, rootState.c3s.client.apis.Users.verify_reset, {reset: reset}, undefined);
	},
	/**
	 * Create a user account
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param user
	 * @returns {Promise<*|boolean|void>}
	 */
	async register({
					   state,
					   commit,
					   rootState
				   }, user) {
		return makeRequest(commit, rootState.c3s.client.apis.Users.create_user, {user: user}, 'c3s/user/SET_CURRENT_USER');
	},
	/**
	 * Retrieve a list of users
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param id
	 * @returns {Promise<*|boolean|void>}
	 */
	async getUser({
		state,
		commit,
		rootState
	}, id) {
		return makeRequest(commit, rootState.c3s.client.apis.Users.get_one, {id: id}, 'c3s/user/SET_USER');
	},
	/**
	 * Update user based on ID
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param id
	 * @param info
	 * @returns {Promise<*|boolean|void>}
	 */
	async updateUser({
						 state,
						 commit,
						 rootState
					 }, [id, info]) {
		return makeRequest(commit, rootState.c3s.client.apis.Users.update_user, {
			id: id,
			user: info
		}, 'c3s/user/SET_CURRENT_USER');
	},
	/**
	 * Validate user existence and access based on API Key
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param id
	 * @returns {Promise<*|boolean|void>}
	 */
	async validate({
					   state,
					   commit,
					   rootState
				   }, id) {
		if (state.currentUser.api_key !== undefined) {
			return makeRequest(commit, rootState.c3s.client.apis.Users.validate, {key: state.currentUser.api_key}, 'c3s/user/SET_CURRENT_USER');
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
