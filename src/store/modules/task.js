import makeRequest from './utils';
import rison from "rison-node";

/** @module c3s/task */

/**
 * state
 * @property {Array} tasks
 * @property {Object} task
 * @property {Array} media
 * @property {Array} comments
 */
const state = {
	tasks: [],
	task: null,
	media: [],
    comments: []
};

/** getters
 * @namespace getters
 */
const getters = {
	// https://vuex.vuejs.org/guide/getters.html#method-style-access
	// allTasks: state => state.tasks.concat(state.clientTasks)
};

/**
 * actions
 * @alias module:c3s/task
 * @namespace actions
 */
const actions = {
	/**
	 * Retrieve an array of tasks
	 * @param {Array<Object, number>} Search An array containing a search object and a limit integer
	 * 
	 */
	async getTasks({ state, commit, rootState }, [search, limit]) {
        search = rison.encode(search);
		return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_tasks, {search_term: search || undefined, limit: limit || 100 }, 'c3s/task/SET_TASKS');
	},

	/**
	 * @param {Object} search A search term to match a JTOS object
	 */
    async getTaskCount({state, commit, rootState}, search) {
	    search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task_count, {search_term: search || undefined }, undefined);
    },
	/**
	 * Get Task Media
	 * @param {Object} search 
	 */
	async getTaskMedia({ state, commit, rootState }, search) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {search_term: search || undefined }, 'c3s/task/SET_MEDIA');
	},
	/**
	 * Retrieve a task matching an ID
	 * @param {String} id Task ID
	 */
	async getTask({ state, commit, rootState }, id) {
		return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task, {id: id }, 'c3s/task/SET_TASK');
	},
	/**
	 * @description Create an array of tasks
	 * @param {Array<Object>} tasks Array of tasks to be created
	 */
	async createTasks({ state, commit, dispatch, rootState }, tasks) {
		const res = makeRequest(commit, rootState.c3s.client.apis.Tasks.create_tasks, {tasks: tasks }, undefined);
		dispatch('c3s/upload/addID', res[0].id, {root: true});
		return res;
	},
	/**
	 * Deletes an array of tasks
	 * @param {Array<Object>} tasks Tasks to be deleted, ID is required as a key here
	 */
	deleteTasks({ state, commit, dispatch, rootState }, tasks) {
		dispatch('SET_TASKS', null);
		return makeRequest(commit, rootState.c3s.client.apis.Tasks.delete_tasks, {tasks: tasks }, 'c3s/task/SET_TASKS');
	}

};

/** mutations
 * @namespace mutations
 */
const mutations = {
	/**
	 * Set array of tasks in store
	 * @param {Array} tasks 
	 */
	SET_TASKS(state, tasks) {
		state.tasks = tasks;
	},
	/**
	 *  Set single task in store
	 * @param {Object} task 
	 */
	SET_TASK(state, task) {
		state.task = task;
	},
	/**
	 * Update task in store
	 * @param {int} index Index of array to update 
	 * @param {Object} params New task object 
	 */
	UPDATE_TASK(state, index, params) {
		Object.assign(state.tasks[index], {
			[params.field]: params.value
		});
	},
	/**
	 * Commit media to store
	 * @param {Array<Object>} media  Array of media objects
	 */
    SET_MEDIA(state, media) {
	    state.media = media;
	},
	/**
	 * Set array of task comments in store
	 * @param {Array<Object>} cmts 
	 */
    SET_COMMENTS(state, cmts) {
	    state.comments = cmts
    }
};

/**
 * Task store submodule
 * @name Task 
 */
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
