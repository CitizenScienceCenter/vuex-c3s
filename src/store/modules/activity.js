import makeRequest from './utils';
// initial state
// shape: [{ id, quantity }]
const state = {
	activities: [],
	activity: null,
	stats: null,
	media: []
};

// getters
const getters = {};

// actions
const actions = {
	getActivities({
		state,
		commit,
		dispatch,
		rootState
	}, search) {
		return makeRequest(rootState.api.client.apis.Activities.get_activities, {search_term: search || undefined }, 'SET_ACTIVITIES');
	},
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
		return makeRequest(rootState.api.client.apis.Activities.get_activity, {id: id }, 'SET_ACTIVITY');
	},
	getStats({
		state,
		commit,
		rootState
	}, id) {
		return makeRequest(rootState.api.client.apis.Activities.activity_stats, {id: id }, 'SET_STATS');
	},
	createActivity({
		state,
		commit,
		rootState
	}, activity) {
		return makeRequest(rootState.api.client.apis.Activities.create_activity, {activity: activity }, 'SET_ACTIVITY');
	},
	deleteActivity({
		state,
		commit,
		rootState
	}, pid) {
		commit('SET_ACTIVITY', null);
		return makeRequest(rootState.api.client.apis.Activities.create_activity, {activity: activity }, undefined);
	}
};

// mutations
const mutations = {
	SET_ACTIVITIES(state, acts) {
		state.activities = acts;
	},
	SET_ACTIVITY(state, act) {
		state.activity = act;
	},
	SET_STATS(state, stats) {
		state.stats = stats;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
