
// initial state
// shape: [{ id, quantity }]
const state = {
	comments: [],
	comment: null
};

// getters
const getters = {
};

// actions
const actions = {
	/**
	 * Retrieve all comments matching the provided query object
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param search
	 * @returns {Promise<void>}
	 */
	async getComments({ state, commit, rootState }, search) {
		try {
			commit('c3s/settings/SET_LOADING', true, { root: true });
			let res = await rootState.c3s.client.apis.Comments.get_all({
				search_term: search || undefined
			});
			commit('SET_COMMENTS', req.body);
			commit('c3s/settings/SET_LOADING', false, { root: true });
		} catch (err) {
			commit('c3s/settings/SET_LOADING', false, {
				root: true
			});
			commit('settings/SET_ERROR', err, {
				root: true
			});
		}
	},
	/**
	 * Create a comment
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param cmt
	 */
	createComment({ state, commit, rootState }, cmt) {
		commit('c3s/settings/SET_LOADING', true, { root: true });
		rootState.c3s.client.apis.Comments.create_comment({
			comment: cmt
		})
			.then(req => {
				commit('c3s/settings/SET_LOADING', false, { root: true });
			})
			.catch(err => {
				commit('c3s/settings/SET_LOADING', false, {
					root: true
				});
				commit('c3s/settings/SET_ERROR', err, {
					root: true
				});
			});
	}
};

// mutations
const mutations = {
	SET_MEDIA(state, media) {
		state.media = media;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
