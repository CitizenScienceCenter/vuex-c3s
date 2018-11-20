/**
 * The activity submodule of the store to deal
 * with retrieving, updating and deleting activities
 */
import makeRequest from './utils';
import rison from "rison-node";
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
    /**
     * Retrieve an array of activities based on a provided query object
     * @param state
     * @param commit
     * @param dispatch
     * @param rootState
     * @param search
     * @returns {Promise<*|boolean|void>}
     */
    getActivities({
                      state,
                      commit,
                      dispatch,
                      rootState
                  }, search) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Activities.get_activities, {search_term: search || undefined}, 'c3s/activity/SET_ACTIVITIES');
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
        return makeRequest(commit, rootState.c3s.client.apis.Activities.get_activity, {id: id}, 'c3s/activity/SET_ACTIVITY');
    },
    getStats({
                 state,
                 commit,
                 rootState
             }, id) {
        return makeRequest(commit, rootState.c3s.client.apis.Activities.activity_stats, {id: id}, 'c3s/activity/SET_STATS');
    },
    /**
     * Create an activity
     * @param state
     * @param commit
     * @param rootState
     * @param activity
     * @returns {Promise<*|boolean|void>}
     */
    createActivity({
                       state,
                       commit,
                       rootState
                   }, activity) {
        return makeRequest(commit, rootState.c3s.client.apis.Activities.create_activity, {activity: activity}, 'c3s/activity/SET_ACTIVITY');
    },
    /**
     * Delete an activity matching the supplied ID
     * @param state
     * @param commit
     * @param rootState
     * @param pid
     * @param localRemove
     * @returns {Promise<*|boolean|void>}
     */
    deleteActivity({
                       state,
                       commit,
                       rootState
                   }, [pid, localRemove]) {
        if (localRemove) commit('c3s/activity/SET_ACTIVITY', null);
        return makeRequest(commit, rootState.c3s.client.apis.Activities.delete_activity, {id: pid}, undefined);
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
