import makeRequest from './utils';
import rison from 'rison-node'
// initial state
// shape: [{ id, quantity }]
const state = {
	projects: [],
	project: null,
	stats: null,
	media: [],
    comments: []
};

// getters
const getters = {};

// actions
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
		search = rison.encode(search);
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
	async getProject({
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

    async getProjectCount({state, commit, rootState}, search) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Projects.get_project_count, {search_term: search || undefined }, undefined);
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
	}, project) {
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
	},
    SET_COMMENTS(state, cmts) {
        state.comments = cmts
    },
    SET_MEDIA(state, media) {
        state.media = media
    }
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
