/** @module c3s/project */

import makeRequest from './utils';
import rison from 'rison-node';

/**
 * 
 */
const state = {
	projects: [],
	project: null,
	stats: null,
	media: [],
    comments: []
};

/**
 * 
 */
const getters = {};

/**
 * actions
 */
const actions = {
	/**
	 * Retrieve projects matching query and save into the `projects` array
	 * @param {Provided} param0 
	 * @param {Array[]} search Array containing a search object (based on JTOS) and an integer for the limit of results
	 */
	getProjects({
		state,
		commit,
		dispatch,
		rootState
	}, [search, limit]) {
		search = rison.encode(search);
		return makeRequest(commit, rootState.c3s.client.apis.Projects.get_projects, {search_term: search || undefined, limit: limit || 100 }, 'c3s/project/SET_PROJECTS');
	},
	/**
	 * 
	 * @param {Provided} param0 
	 * @param {Array[]} id An array containing the ID of the project and a boolean of whether you want the tasks and media associated
	 */
	async getProject({
		state,
		commit,
		dispatch,
		rootState
	}, [id, associated]) {
		if (associated) {
			dispatch('task/getMedia', id, {root: true});
			dispatch('task/getTasks', [id, 1, 0], {root: true});
		}
		dispatch('getStats', id);
		return makeRequest(commit, rootState.c3s.client.apis.Projects.get_project, {id: id }, 'c3s/project/SET_PROJECT');
	},

    async getProjectCount({state, commit, rootState}, search) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Projects.get_project_count, {search_term: search || undefined }, undefined);
    },
	createProject({
		state,
		commit,
		rootState
	}, project) {
		return makeRequest(commit, rootState.c3s.client.apis.Projects.create_project, {project: project }, 'c3s/project/SET_PROJECT');
	},
	deleteProject({
		state,
		commit,
		rootState
	}, [pid, localRemove]) {
		if (localRemove) commit('c3s/project/SET_PROJECT', null);
		return makeRequest(commit, rootState.c3s.client.apis.Projects.delete_project, {id: pid}, undefined);
	}
};

/**
 * 
 */
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

/**
 * Project store submodule. Path: c3s.project
 * @name Project
 */
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
