/**
 * The activity submodule of the store to deal
 * with retrieving, updating and deleting activities
 * @file store/modules/activity.js
 * @module c3s/activity
 */

import makeRequest from './utils';
import rison from "rison-node";
/**
 * @constant
 * @property {Array} [activities=[]]
 * @property {Object} [activity=null]
 * @property {Object} [stats=null]
 * @property {Array} [media=[]]
 * @property {Array} [comments=[]] 
 */
const state = {
    activities: [],
    activity: null,
    tasks: [],
    stats: null,
    media: [],
    comments: []
};

/**
 * @type Object
 * @constant
 */
const getters = {};

/**
 *  actions 
  * @constant
	@type {object}
    @namespace actions
*/
const actions = {
    /**
     * Retrieve an array of activities based on a provided query object 
     * @param {Array<Object, number>} search An array containing the search object and the limit for the number of results to return
     */
    getActivities({
                      state,
                      commit,
                      dispatch,
                      rootState
                  }, [search, limit]) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Activities.get_activities, {search_term: search || undefined, limit: limit || 100 }, 'c3s/activity/SET_ACTIVITIES');
    },
    /**
     * Retrieve a single activity based on the ID
     * @param {Array<string, boolean>} ID An array containing the ID of the activity and a boolean to determine whether or not to retrieve the media and comments also
     * @returns {Promise<*|boolean|void>}
     */
    async getActivity({
                          state,
                          commit,
                          dispatch,
                          rootState
                      }, [id, associated]) {
        if (associated) {
        }
        return makeRequest(commit, rootState.c3s.client.apis.Activities.get_activity, {id: id}, 'c3s/activity/SET_ACTIVITY');
    },

    async getActivityTasks({
                          state,
                          commit,
                          dispatch,
                          rootState
                      }, [id]) {
          return makeRequest(commit, rootState.c3s.client.apis.Activities.get_activity_tasks, {id: id}, 'c3s/activity/SET_ACTIVITY_TASKS');

      },
    /**
     * Returns a count for the number of activities matching criteria
     * @param {Object} search Search object the same as one would use in getActivities
     */
    async getActivityCount({state, commit, rootState}, search) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Activities.get_activity_count, {search_term: search || undefined }, undefined);
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
     * @param {Object} activity
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
     * @param {Array<string, boolean>} ID An array containing the ID of the activity and a boolean to determine whether or not to remove from the store also
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

/**
 * @constant mutations All mutations one can commit to the activity submodule
 * @type {object}
 * @namespace mutations
 */
const mutations = {
    /**
     * Sets the activities in the store
     * @param {Array} acts 
     */
    SET_ACTIVITIES(state, acts) {
        state.activities = acts;
    },
    /**
     * Sets a single activity
     * @param {Object} act 
     */
    SET_ACTIVITY(state, act) {
        state.activity = act;
    },
    /**
     * Set statistics for an activity
     * @param {Object} stats 
     */
    SET_STATS(state, stats) {
        state.stats = stats;
    },
    /**
     * Set comments for an activity
     * @param {Arrya} cmts 
     */
    SET_COMMENTS(state, cmts) {
        state.comments = cmts
    },

    SET_ACTIVITY_TASKS(state, tasks) {
        state.tasks = tasks
    },
    /**
     * Set media for an activity
     * @param {Array} media 
     */
    SET_MEDIA(state, media) {
        state.media = media
    }
};

/**
 * A module for linking activities to the API
 * @name Activity
 */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
