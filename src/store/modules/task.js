import makeRequest from './utils';
import rison from "rison-node";
// initial state
// shape: [{ id, quantity }]
const state = {
	tasks: [],
	task: null,
	media: [],
    comments: []
};

// getters
const getters = {
	// https://vuex.vuejs.org/guide/getters.html#method-style-access
	// allTasks: state => state.tasks.concat(state.clientTasks)
};

// actions
/**
 * @memberof task
 * @namespace task.actions
 */
const actions = {
	/**
	 * @memberof task.actions
	 * @param {Provided} param0 
	 * @param {Array} Search An array containing a search object and a limit integer
	 */
	async getTasks({ state, commit, rootState }, [search, limit]) {
        search = rison.encode(search);
		return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_tasks, {search_term: search || undefined, limit: limit || 100 }, 'c3s/task/SET_TASKS');
	},

	/**
	 * @memberof task.actions
	 * @param {Provided} param0 Provied by Vuex, DO NOT PASS
	 * @param {Object} search A search term to match a JTOS object
	 */
    async getTaskCount({state, commit, rootState}, search) {
	    search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task_count, {search_term: search || undefined }, undefined);
    },

	async getTaskRegion({ state, commit, rootState }, [pid, region]) {
		// TODO implement
		return undefined;
	},
	async getTaskMedia({ state, commit, rootState }, search) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {search_term: search || undefined }, 'c3s/task/SET_MEDIA');
	},
	/**
	 * Retrieve task matching an ID
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param pid
	 * @param region
	 * @returns {Promise<undefined>}
	 */
	async getTask({ state, commit, rootState }, id) {
		return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task, {id: id }, 'c3s/task/SET_TASK');
	},
	async activityTasks({ state, commit, rootState }, id) {
		return undefined;
	},
	/**
	 * Create an array of tasks
	 * @param state
	 * @param commit
	 * @param dispatch
	 * @param rootState
	 * @param tasks
	 * @returns {Promise<*>}
	 */
	async createTasks({ state, commit, dispatch, rootState }, tasks) {
		const res = makeRequest(commit, rootState.c3s.client.apis.Tasks.create_tasks, {tasks: tasks }, undefined);
		dispatch('c3s/upload/addID', res[0].id, {root: true});
		return res;
	},
	/**
	 * Delete an array of tasks
	 * @param state
	 * @param commit
	 * @param dispatch
	 * @param rootState
	 * @param tasks
	 * @returns {Promise<*|boolean|void>}
	 */
	deleteTasks({ state, commit, dispatch, rootState }, tasks) {
		dispatch('SET_TASKS', null);
		return makeRequest(commit, rootState.c3s.client.apis.Tasks.delete_tasks, {tasks: tasks }, 'c3s/task/SET_TASKS');
	}

};

// mutations
const mutations = {
	SET_TASKS(state, tasks) {
		state.tasks = tasks;
	},
	SET_TASK(state, task) {
		state.task = task;
	},
	UPDATE_TASK(state, index, params) {
		Object.assign(state.tasks[index], {
			[params.field]: params.value
		});
	},
    SET_MEDIA(state, media) {
	    state.media = media;
    },
    SET_COMMENTS(state, cmts) {
	    state.comments = cmts
    }
};

/**
 * A module for linking activities to the API
 * @namespace task
 */
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
