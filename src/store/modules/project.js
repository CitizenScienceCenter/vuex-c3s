import makeRequest from './utils';
// initial state
// shape: [{ id, quantity }]
const state = {
	projects: [],
	project: null,
	stats: null,
	media: []
};

// getters
const getters = {};

// actions
/**
 * actions
 * @alias module:c3s/projects
 */
const actions = {
	/**
	 * Retrieve an array of projects based on a provided query object
	 * @param state
	 * @param commit
	 * @param dispatch
	 * @param rootState
	 * @param search
	 * @returns {Promise<*|boolean|void>}
	 */
	getProjects({
		state,
		commit,
		dispatch,
		rootState
	}, search) {
		return makeRequest(commit, rootState.c3s.client.apis.Projects.get_projects, {search_term: search || undefined }, 'c3s/project/SET_PROJECTS');
	},
	/**
	 * Retrieve a single activity based on the ID
	 * @param state
	 * @param commit
	 * @param dispatch
	 * @param rootState
	 * @param id
	 * @param associated
	 * @returns {Promise<*|boolean|void>}
	 */
	async getActivity({
		state,
		commit,
		dispatch,
		rootState
	}, [id, associated]) {
		if (associated) {
			dispatch('media/getMedia', id, {root: true});
			dispatch('media/getTasks', [id, 1, 0], {root: true});
		}
		dispatch('getStats', id);
		return makeRequest(commit, rootState.c3s.client.apis.Projects.get_project, {id: id }, 'c3s/project/SET_PROJECT');
	},
	/**
	 * Create a project
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param activity
	 * @returns {Promise<*|boolean|void>}
	 */
	createProject({
		state,
		commit,
		rootState
	}, activity) {
		return makeRequest(commit, rootState.c3s.client.apis.Projects.create_project, {project: project }, 'c3s/project/SET_PROJECT');
	},
	/**
	 * Delete a project matching the supplied ID
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param pid
	 * @param localRemove
	 * @returns {Promise<*|boolean|void>}
	 */
	deleteProject({
		state,
		commit,
		rootState
	}, [pid, localRemove]) {
		if (localRemove) commit('c3s/project/SET_PROJECT', null);
		return makeRequest(commit, rootState.c3s.client.apis.Projects.delete_project, {id: pid}, undefined);
	}
};

// mutations
const mutations = {
	SET_PROJECTS(state, ps) {
		state.projects = ps;
	},
	SET_PROJECT(state, p) {
		state.project = p;
	},
	SET_STATS(state, stats) {
		state.stats = stats;
	}
};

/**
 * @exports c3s/projects
 * @namespace projects
 * @memberof c3s
 */
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
