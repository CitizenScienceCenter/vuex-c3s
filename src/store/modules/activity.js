/**
 * The activity submodule of the store to deal
 * with retrieving, updating and deleting activities
 * Actions:
 * create_activity ✔️
 * update_activity ✔️ 
 * delete_activity ✔️
 * get_activities ✔️
 * get_activity ✔️
 * get_activity_count ✔️
 * get_activity_submissions 
 * get_activity_tasks ✔️
 * get_activity_user_submissions
 * get_project_activities
 * get_activity_stats ✔️
 * @file store/modules/activity.js
 * @module c3s/activity
 */

import rison from 'rison-node'
import { getNested, makeRequest } from './utils'
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
}

const path = 'c3s.client.apis.Activities'

/**
 * @type Object
 * @constant
 */
const getters = {}

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
  getActivities ({
    state,
    commit,
    dispatch,
    rootState
  }, [search, limit]) {
    search = rison.encode(search)
    const method = '.get_activities'
    return makeRequest(commit, getNested(rootState, path + method), {
      search_term: search || undefined,
      limit: limit || 100
    }, {}, 'c3s/activity/SET_ACTIVITIES')
  },
  /**
   * Retrieve a single activity based on the ID
   * @param {Array<string, boolean>} ID An array containing the ID of the activity and a boolean to determine whether or not to retrieve the media and comments also
   * @returns {Promise<*|boolean|void>}
   */
  async getActivity ({
    state,
    commit,
    dispatch,
    rootState
  }, [id, associated]) {
    if (associated) {}
    const method = '.get_activity'
    return makeRequest(commit, getNested(rootState, path + method), {
      aid: id
    }, {}, 'c3s/activity/SET_ACTIVITY')
  },

  async getActivityTasks ({
    state,
    commit,
    dispatch,
    rootState
  }, [id]) {
    const method = '.get_activity_tasks'
    return makeRequest(commit, getNested(rootState, path + method), {
      aid: id
    }, {}, 'c3s/activity/SET_ACTIVITY_TASKS')
  },

  /**
   * Returns a count for the number of activities matching criteria
   * @param {Object} search Search object the same as one would use in getActivities
   */
  async getActivityCount ({
    state,
    commit,
    rootState
  }, search) {
    search = rison.encode(search)
    const method = '.get_activity.count'
    return makeRequest(commit, getNested(rootState, path + method), {
      search_term: search || undefined
    }, {}, undefined)
  },

  async getStats ({
    state,
    commit,
    rootState
  }, id) {
    const method = '.activity_stats'
    return makeRequest(commit, getNested(rootState, path + method), {
      aid: id
    }, {}, 'c3s/activity/SET_STATS')
  },
  /**
   * Create an activity
   * @param {Object} activity
   * @returns {Promise<*|boolean|void>}
   */
  createActivity ({
    state,
    commit,
    rootState
  }, activity) {
    const method = '.create_activity'
    return makeRequest(commit, getNested(rootState, path + method), undefined, activity, 'c3s/activity/SET_ACTIVITY')
  },

  /**
   * Update an activity 
   * @param {Array<string, boolean>} Array containing the ID and object of the activity to be modified 
   * @returns {Promise<*|boolean|void>} 
   */
  updateActivity({
    state,
    commit,
    rootState
  }, [id, activity]) {
    const method = '.update_activity'
    return makeRequest(commit, getNested(rootState, path + method), {aid: id}, activity, 'c3s/activity/SET_ACTIVITY')
  },
  /**
   * Delete an activity matching the supplied ID
   * @param {Array<string, boolean>} ID An array containing the ID of the activity and a boolean to determine whether or not to remove from the store also
   * @returns {Promise<*|boolean|void>}
   */
  deleteActivity ({
    state,
    commit,
    rootState
  }, [id, localRemove]) {
    const method = '.delete_activity'
    if (localRemove) commit('c3s/activity/SET_ACTIVITY', null)
    return makeRequest(commit, getNested(rootState, path + method), {
      aid: id
    }, {}, undefined)
  }
}

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
  SET_ACTIVITIES (state, acts) {
    state.activities = acts
  },
  /**
   * Sets a single activity
   * @param {Object} act
   */
  SET_ACTIVITY (state, act) {
    state.activity = act
  },
  /**
   * Set statistics for an activity
   * @param {Object} stats
   */
  SET_STATS (state, stats) {
    state.stats = stats
  },
  /**
   * Set comments for an activity
   * @param {Arrya} cmts
   */
  SET_COMMENTS (state, cmts) {
    state.comments = cmts
  },

  SET_ACTIVITY_TASKS (state, tasks) {
    state.tasks = tasks
  },
  /**
   * Set media for an activity
   * @param {Array} media
   */
  SET_MEDIA (state, media) {
    state.media = media
  }
}

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
}
