/**
 * The project submodule of the store to deal
 * with retrieving, updating and deleting projects
 * Actions:
 * create_project ✔️
 * update_project ✔️ 
 * delete_project ✔️
 * get_projects ✔️
 * get_project ✔️
 * get_project_submissions 
 * get_project_tasks ✔️
 * get_project_user_submissions
 * get_stats ✔️
 * @file store/modules/project.js
 * @module c3s/project
 */

import rison from 'rison-node'
import { getNested, makeRequest } from './utils'
/**
 * @constant
 * @property {Array} [projects=[]]
 * @property {Object} [project=null]
 * @property {Object} [stats=null]
 * @property {Array} [media=[]]
 * @property {Array} [comments=[]]
 */
const state = {
  projects: [],
  project: null,
  tasks: [],
  task: null,
  stats: null,
  media: [],
  comments: []
}

const path = 'c3s.client.apis.Projects'

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
   * Retrieve an array of projects based on a provided query object
   * @param {Array<Object, number>} search An array containing the search object and the limit for the number of results to return
   */
  getProjects ({
    state,
    commit,
    dispatch,
    rootState
  }, [search, limit, offset]) {
    if(search !== undefined) {
      search = rison.encode(search)
    }
    const method = '.get_projects'
    return makeRequest(commit, getNested(rootState, path + method), {
      search_term: search || undefined,
      offset: offset || 0,
      limit: limit || 100,
    }, undefined, 'c3s/project/SET_PROJECTS')
  },
  /**
   * Retrieve a single project based on the ID
   * @param {Array<string, boolean>} ID An array containing the ID of the project and a boolean to determine whether or not to retrieve the media and comments also
   * @returns {Promise<*|boolean|void>}
   */
  async getProject ({
    state,
    commit,
    dispatch,
    rootState
  }, id) {
    const method = '.get_project'
    return makeRequest(commit, getNested(rootState, path + method), {
      pid: id
    }, undefined, 'c3s/project/SET_PROJECT')
  },

  async getProjectMedia ({
    state,
    commit,
    dispatch,
    rootState
  }, id) {
    const method = '.get_project_media'
    return makeRequest(commit, getNested(rootState, path + method), {
      pid: id
    }, undefined, 'c3s/project/SET_PROJECT_MEDIA')
  },
  async getProjectTask ({
    state,
    commit,
    dispatch,
    rootState
  }, { pid, random, index }) {
    console.log(pid, random, index)
    const payload = {
      pid: pid
    }
    if (index > -1) {
      payload.index = index
    } else {
      payload.random = true
    }
    const method = '.get_project_task'
    return makeRequest(commit, getNested(rootState, path + method), payload, undefined, 'c3s/project/SET_PROJECT_TASK')
  },
  async getProjectTasks ({
    state,
    commit,
    dispatch,
    rootState
  }, id) {
    const method = '.get_project_tasks'
    return makeRequest(commit, getNested(rootState, path + method), {
      pid: id
    }, undefined, 'c3s/project/SET_PROJECT_TASKS')
  },

  async getStats ({
    state,
    commit,
    rootState
  }, id) {
    const method = '.get_stats'
    return makeRequest(commit, getNested(rootState, path + method), {
      pid: id
    }, undefined, 'c3s/project/SET_STATS')
  },
  /**
   * Create a project
   * @param {Object} project
   * @returns {Promise<*|boolean|void>}
   */
  createProject ({
    state,
    commit,
    rootState
  }, project) {
    const method = '.create_project'
    return makeRequest(commit, getNested(rootState, path + method), undefined, project, 'c3s/project/SET_PROJECT')
  },

  /**
   * Update a project
   * @param {Array<string, boolean>} Array containing the ID and object of the project to be modified
   * @returns {Promise<*|boolean|void>}
   */
  updateProject({
    state,
    commit,
    rootState
  }, [id, project]) {
    const method = '.update_project'
    return makeRequest(commit, getNested(rootState, path + method), {pid: id}, project, 'c3s/project/SET_PROJECT')
  },
  /**
   * Delete a project matching the supplied ID
   * @param {Array<string, boolean>} ID An array containing the ID of the project and a boolean to determine whether or not to remove from the store also
   * @returns {Promise<*|boolean|void>}
   */
  deleteProject ({
    state,
    commit,
    rootState
  }, [id, localRemove]) {
    const method = '.delete_project'
    if (localRemove) commit('c3s/project/SET_PROJECT', null)
    return makeRequest(commit, getNested(rootState, path + method), {
      pid: id
    }, undefined, undefined)
  }
}

/**
 * @constant mutations All mutations one can commit to the project submodule
 * @type {object}
 * @namespace mutations
 */
const mutations = {
  /**
   * Sets the projects in the store
   * @param {Array} acts
   */
  SET_PROJECTS (state, acts) {
    state.projects = acts
  },
  /**
   * Sets a single project
   * @param {Object} act
   */
  SET_PROJECT (state, act) {
    state.project = act
  },
  /**
   * Set statistics for a project
   * @param {Object} stats
   */
  SET_STATS (state, stats) {
    state.stats = stats
  },
  /**
   * Set comments for a project
   * @param {Arrya} cmts
   */
  SET_COMMENTS (state, cmts) {
    state.comments = cmts
  },

  SET_PROJECT_TASKS (state, tasks) {
    state.tasks = tasks
  },

  SET_PROJECT_TASK (state, task) {
    state.task = task
  },
  /**
   * Set media for a project
   * @param {Array} media
   */
  SET_PROJECT_MEDIA (state, media) {
    state.media = media
  }
}

/**
 * A module for linking projects to the API
 * @name Project
 */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
