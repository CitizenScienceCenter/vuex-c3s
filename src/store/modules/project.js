/** @module c3s/project */

import {makeRequest} from './utils'
import rison from 'rison-node'

/**
 * @constant state
 * @type Object
 * @description State structure
 * @alias module:c3s/project
 * @property {Array} [projects = []]
 * @property {Object} [project = null]
 * @property {Array} [activities = []]
 * @property {Object} [stats = null]
 * @property {Array} [media = []]
 * @property {Array} [comments = []]
 */
const state = {
  projects: [],
  project: null,
  activities: [],
  stats: null,
  media: [],
  comments: []
}

/**
 * @constant getters
 * @namespace getters
 */
const getters = {}

/**
 * @constant
 * @namespace actions
 */
const actions = {
  /**
   * Get projects matching a search object
   * Retrieve projects matching query and save into the `projects` array
   * @function
   * @param {Array<Object, number>} Search Array containing a search object (based on JTOS) and an integer for the limit of results
   */
  getProjects ({
    state,
    commit,
    dispatch,
    rootState
  }, [search, limit]) {
    search = rison.encode(search)
    return makeRequest(commit, rootState.c3s.client.apis.Projects.get_projects, {
      search_term: search || undefined,
      limit: limit || 100
    }, undefined, 'c3s/project/SET_PROJECTS')
  },
  /**
   * Get a project matching the provided ID
   * DOES save project to store
   * @param {Array<string, number>} ID An array containing the ID of the project and a boolean of whether you want the tasks and media associated
   */
  async getProject ({
    state,
    commit,
    dispatch,
    rootState
  }, [id, associated]) {
    if (associated) {
      dispatch('task/getMedia', id, {
        root: true
      })
      dispatch('task/getTasks', [id, 1, 0], {
        root: true
      })
    }
    dispatch('getStats', id)
    return makeRequest(commit, rootState.c3s.client.apis.Projects.get_project, {
      id: id
    }, {}, 'c3s/project/SET_PROJECT')
  },
  /**
   * Get the activities of a project matching the provided ID
   * DOES save project to store
   * @param {string} ID The ID of the project
   */
  async getProjectActivities ({
    state,
    commit,
    dispatch,
    rootState
  }, id) {
    // dispatch('getStats', id);
    return makeRequest(commit, rootState.c3s.client.apis.Projects.get_project_activities, {
      id: id
    }, {}, 'c3s/activity/SET_ACTIVITIES')
  },
  /**
   * Get count of projects matching search criteria
   * @param {Object} search
   */
  async getProjectCount ({
    state,
    commit,
    rootState
  }, search) {
    search = rison.encode(search)
    return makeRequest(commit, rootState.c3s.client.apis.Projects.get_project_count, {
      search_term: search || undefined
    }, {}, undefined)
  },
  /**
   * Create a project with a provided object.
   * DOES save project to store
   * @param {Object} project
   */
  createProject ({
    state,
    commit,
    rootState
  }, project) {
    return makeRequest(commit, rootState.c3s.client.apis.Projects.create_project, {}, project, 'c3s/project/SET_PROJECT')
  },
  /**
   * Delete a project with the provided ID
   * @param {Array<string, boolean>} PID The ID of the project and a boolean on whether to remove the project from the store
   */
  deleteProject ({
    state,
    commit,
    rootState
  }, [pid, localRemove]) {
    if (localRemove) commit('c3s/project/SET_PROJECT', null)
    return makeRequest(commit, rootState.c3s.client.apis.Projects.delete_project, {
      id: pid
    }, {}, undefined)
  }
}

/**
 * @constant
 * @alias module:c3s/project
 * @namespace mutations
 */
const mutations = {
  /**
   * Commit array of projects to store
   * @param {Array} ps
   */
  SET_PROJECTS (state, ps) {
    state.projects = ps
  },
  /**
   * Commit project to store
   * @param {Object} p
   */
  SET_PROJECT (state, p) {
    state.project = p
  },
  /**
   * Commit project stats to store
   * @param {Object} stats
   */
  SET_STATS (state, stats) {
    state.stats = stats
  },
  /**
   * Commit comments array related to project to store
   * @param {Array} cmts
   */
  SET_COMMENTS (state, cmts) {
    state.comments = cmts
  },
  /**
   * Commit media array related to project to store
   * @param {Array} media
   */
  SET_MEDIA (state, media) {
    state.media = media
  }
}

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
}
