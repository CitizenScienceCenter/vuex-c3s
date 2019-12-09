import { makeRequest, getNested } from './utils'
import rison from 'rison-node'

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
  comments: [],
  stats: {}
}

const path = 'c3s.client.apis.Tasks'

/** getters
 * @namespace getters
 */
const getters = {
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
  // allTasks: state => state.tasks.concat(state.clientTasks)
}

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
  async getTasks ({
    state,
    commit,
    rootState
  }, [search, limit, offset]) {
    const method = '.get_tasks'
    search = rison.encode(search)
    return makeRequest(commit, getNested(rootState, path + method), {
      search_term: search || undefined,
      limit: limit || 100,
      offset: offset || 0
    }, undefined, 'c3s/task/SET_TASKS')
  },

  /**
   * @param {Object} search A search term to match a JTOS object
   */
  async getTaskCount ({
    state,
    commit,
    rootState
  }, search) {
    search = rison.encode(search)
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task_count, {
      search_term: search || undefined
    }, undefined, undefined)
  },
  /**
   * Get Task Media
   * @param {Object} search
   */
  async getTaskMedia ({
    state,
    commit,
    rootState
  }, tid) {
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task_media, {
      tid: tid
    }, undefined, 'c3s/task/SET_MEDIA')
  },
  /**
   * Retrieve a task matching an ID
   * @param {String} id Task ID
   */
  async getTask ({
    state,
    commit,
    rootState
  }, id) {
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task, {
      tid: id
    }, undefined, 'c3s/task/SET_TASK')
  },

  async getTaskComments ({
    state,
    commit,
    rootState
  }, id) {
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task_comments, {
      tid: id
    }, undefined, 'c3s/task/SET_TASK_COMMENTS')
  },

  async getTaskStats ({
    state,
    commit,
    rootState
  }, id) {
    const method = '.get_stats'
    return makeRequest(commit, getNested(rootState, path + method), {
      tid: id
    }, undefined, 'c3s/task/SET_TASK_STATS')
  },

  async getProjectTask ({
    state,
    commit,
    dispatch,
    rootState
  }, id) {
    const method = '.get_random_project_task'
    return makeRequest(commit, getNested(rootState, path + method), {
      pid: id
    }, undefined, 'c3s/project/SET_PROJECT_TASK')
  },

  async importCSV ({
    state,
    commit,
    dispatch,
    rootState
  }, [pid, csv, reimport]) {
    let method = rootState.c3s.client.apis.Projects.import_tasks_csv
    if (reimport === undefined) {
      reimport = false
    }
    if (reimport === true) {
      method = rootState.c3s.client.apis.Projects.reimport_tasks_csv
    }
    return makeRequest(commit, method, { pid: pid }, csv, undefined)
  },
  /**
   * @description Create an array of tasks
   * @param {Array<Object>} tasks Array of tasks to be created
   */
  async createTasks ({
    state,
    commit,
    dispatch,
    rootState
  }, tasks) {
    const res = makeRequest(commit, rootState.c3s.client.apis.Tasks.create_tasks, {}, tasks, undefined)
    return res
  },
  /**
   * Deletes an array of tasks
   * @param {Array<Object>} tasks Tasks to be deleted, ID is required as a key here
   */
  deleteTasks ({
    state,
    commit,
    dispatch,
    rootState
  }, tasks) {
    dispatch('SET_TASKS', null)
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.delete_tasks, undefined, tasks, 'c3s/task/SET_TASKS')
  },

  /**
   * Deletes a single task
   * @param {int} id Task ID to delete
   */
  deleteTask ({
    state,
    commit,
    dispatch,
    rootState
  }, id) {
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.delete_tasks, {tid: id}, tasks, 'c3s/task/SET_TASKS')
  }
}

/** mutations
 * @namespace mutations
 */
const mutations = {
  /**
   * Set array of tasks in store
   * @param {Array} tasks
   */
  SET_TASKS (state, tasks) {
    state.tasks = tasks
  },
  /**
   *  Set single task in store
   * @param {Object} task
   */
  SET_TASK (state, task) {
    state.task = task
  },

  SET_TASK_COMMENTS (state, cmts) {
    state.comments = cmts
  },
  /**
   * Update task in store
   * @param {int} index Index of array to update
   * @param {Object} params New task object
   */
  UPDATE_TASK (state, index, params) {
    Object.assign(state.tasks[index], {
      [params.field]: params.value
    })
  },
  /**
   * Commit media to store
   * @param {Array<Object>} media  Array of media objects
   */
  SET_MEDIA (state, media) {
    state.media = media
  },

  SET_STATS(state, stats) {
    state.stats = stats
  },
  /**
   * Set array of task comments in store
   * @param {Array<Object>} cmts
   */
  SET_COMMENTS (state, cmts) {
    state.comments = cmts
  }
}

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
}
