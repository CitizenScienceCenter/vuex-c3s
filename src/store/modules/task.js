import makeRequest from './utils';
// initial state
// shape: [{ id, quantity }]
const state = {
	tasks: [],
	task: null,
	media: []
};

// getters
const getters = {
	// https://vuex.vuejs.org/guide/getters.html#method-style-access
	// allTasks: state => state.tasks.concat(state.clientTasks)
};

// actions
const actions = {
	/**
	 * Retrieve all tasks matching the supplied query object
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param search
	 * @returns {Promise<*|boolean|void>}
	 */
	async getTasks({ state, commit, rootState }, search) {
		return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_tasks, {search_term: search || undefined }, 'c3s/task/SET_TASKS');
	},

	async getTaskRegion({ state, commit, rootState }, [pid, region]) {
		// TODO implement
		return undefined;
	},
	async getTaskMedia({ state, commit, rootState }, [pid, region]) {
		// TODO implement
		return undefined;
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
		res = makeRequest(commit, rootState.c3s.client.apis.Tasks.create_tasks, {tasks: tasks }, undefined);
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
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
