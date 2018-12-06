/**
 * @module c3s/user
 */

import makeRequest from './utils';

var SHA256 = require('crypto-js/sha256');

/**
 * @constant state
 * @property {Object} [user=null] Userr information
 * @property {Object} [currentUser=null] Information of logged in user
 * @property {Object} [isAnon=null] If the current user is an anonymous user
 */
const state = {
	user: null,
	currentUser: null,
    isAnon: false
};

/**
 * @constant getters
 * @namespace getters
 */
const getters = {};

/**
 * @constant actions
 * @namespace actionss
 */
const actions = {
	/**
	 * Login user
	 * @param {Provided} param0 
	 * @param {Object} user Username/email and password of user
	 * @returns {Promise<*>}
	 */
	async login({
		state,
		commit,
		dispatch,
		rootState
	}, user) {
		return makeRequest(commit, rootState.c3s.client.apis.Users.login, user, 'c3s/user/SET_CURRENT_USER');
	},
	/**
	 * Create anonymouse user and register with backend
	 * @param {Provided} param0
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
		const id = '_anon' + SHA256(now); // TODO add extra details to avoid clash OR delegate to server?
		const pwd = '' + SHA256(id);
		const u = {
		    'username': id,
            'pwd': pwd,
            'confirmed': false,
            info: {
		        'anonymous': true
            }
        }
        const response = makeRequest(commit, rootState.c3s.client.apis.Users.create_user, {user: u}, 'c3s/user/SET_CURRENT_USER');
        commit('SET_ANON', true);
        return response;
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
		commit('SET_ANON', false);
	},
	/**
	 * Request to reset password 
	 * @param {Provided} param0 
	 * @param {String} email 
	 * @returns {Promise<*>}
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
	 * @param {Provided} param0 
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
	 * @param {Provided} param0 
	 * @param {Object} user
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
	 * @param {Provided} param0 
	 * @param {String} id
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
	 * @param {Provided} param0 
	 * @param {Array} (id, info)
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
	 * @param {Provided} param0 
	 * @param {String} id
	 * @returns {Promise<*|boolean|void>}
	 */
	async validate({
					   state,
					   commit,
					   rootState
				   }, id) {
		if (state.currentUser
			.api_key !== undefined) {
			return makeRequest(commit, rootState.c3s.client.apis.Users.validate, {key: state.currentUser.api_key}, 'c3s/user/SET_CURRENT_USER');
		}
	}
};

/**
 * @constant
 * @namespace mutations
 */
const mutations = {
	/**
	 * Set user outside of the currently logged in
	 * @param {Provided} state 
	 * @param {Object} user 
	 */
	SET_USER(state, user) {
		state.user = user;
	},
	/**
	 * Set current user
	 * @param {Provided} state 
	 * @param {Object} user 
	 */
	SET_CURRENT_USER(state, user) {
		state.currentUser = user;
	},
	/**
	 * Set anonymous state of current user
	 * @param {Provided} state 
	 * @param {Boolean} flag 
	 */
    SET_ANON(state, flag) {
	    state.isAnon = flag;
    }
};

/**
 * name User
 */
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
