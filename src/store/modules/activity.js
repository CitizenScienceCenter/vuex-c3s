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
    @alias module:c3s/activity
    @namespace actions
*/
const actions = {
    /**
     * Retrieve an array of activities based on a provided query object 
     * @param {Provided} param0 
     * @param {*} param1 
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
        }
        return makeRequest(commit, rootState.c3s.client.apis.Activities.get_activity, {id: id}, 'c3s/activity/SET_ACTIVITY');
    },

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

/**
 * @constant mutations
 * @type {object}
 * @memberof activity
 * @namespace activity.mutations
 */
const mutations = {
    /**
     * Sets the activities in the store
     * @memberof activity.mutations
     * @param {Object} state 
     * @param {Array} acts 
     */
    SET_ACTIVITIES(state, acts) {
        state.activities = acts;
    },
    SET_ACTIVITY(state, act) {
        state.activity = act;
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
 * A module for linking activities to the API
 */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
