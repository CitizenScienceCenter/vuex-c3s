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
	async getTasks({ state, commit, rootState }, search) {
		return makeRequest(rootState.api.client.apis.Tasks.get_tasks, {search_term: search || undefined }, 'SET_TASKS');
	},
	async getTaskRegion({ state, commit, rootState }, [pid, region]) {
		// TODO implement
		return undefined;
	},
	async getTask({ state, commit, rootState }, id) {
		return makeRequest(rootState.api.client.apis.Tasks.get_task, {id: id }, 'SET_TASK');
	},
	async activityTasks({ state, commit, rootState }, id) {
		return undefined;
	},
	async addTasks({ state, commit, dispatch, rootState }, tasks) {
		res = makeRequest(rootState.api.client.apis.Tasks.create_tasks, {tasks: tasks }, undefined);
		dispatch('upload/addID', res[0].id, {root: true});
		return res;
	},
	deleteTasks({ state, commit, dispatch, rootState }, tasks) {
		dispatch('SET_TASKS', null);
		return umakeRequest(rootState.api.client.apis.Tasks.delete_tasks, {tasks: tasks }, 'SET_TASKS');
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
