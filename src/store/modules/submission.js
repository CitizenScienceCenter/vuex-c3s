/** @module c3s/submission */

import makeRequest from './utils'
import rison from 'rison-node'

/**
 * @constant state
 * @property {Object} [media=undefined]
 * @property {Object} [submission={}]
 * @property {Array} [submissions=[]]
 */
const state = {
  media: undefined,
  submission: {},
  submissions: []
}

/**
 * @namespace getters
 */
const getters = {}

/**
 * @namespace actions
 */
const actions = {
  /**
   * Retrieve submissions matching the query object
   * @param {Array<Object, number>} search
   * @returns {Promise<*|boolean|void>}
   */
  async getSubmissions ({
    state,
    commit,
    rootState
  }, [search, limit]) {
    search = rison.encode(search)
    return makeRequest(commit, rootState.c3s.client.apis.Submissions.get_submissions, {
      search_term: search || undefined,
      limit: limit || 100
    }, {}, 'c3s/submission/SET_SUBMISSIONS')
  },
  /**
   * Retrieve the number of submissions matching a query
   * @param {Object} search
   */
  async getSubmissionCount ({
    state,
    commit,
    rootState
  }, search) {
    search = rison.encode(search)
    return makeRequest(commit, rootState.c3s.client.apis.Submissions.get_submission_count, {
      search_term: search || undefined
    }, {}, undefined)
  },
  /**
   * Create a submission
   * @returns {Promise<*|boolean|void>}
   */
  async createSubmission ({
    state,
    commit,
    rootState,
    dispatch
  }) {
    // TODO handle uploading at same time
    return makeRequest(commit, rootState.c3s.client.apis.Submissions.create_submission, {}, state.submission, 'c3s/submission/SET_SUBMISSION')
  },
  /**
   * Update a submission based on the ID
   * @param {Object} submission
   * @returns {Promise<*|boolean|void>}
   */
  async updateSubmission ({
    state,
    commit,
    rootState
  }, submission) {
    return makeRequest(commit, rootState.c3s.client.apis.Submissions.update_submission, {
      id: submission.id
    },
    submission, 'submission/c3s/SET_SUBMISSION')
  }
}

/**
 * @namespace mutations
 */
const mutations = {
  /**
   * Set media
   * @param {Array} media
   */
  SET_MEDIA (state, media) {
    state.media = media
  },
  /**
   * Create and set submission in store
   * @param {Object} sub
   */
  SET_SUBMISSION (state, sub) {
    state.submission = sub
  },
  /**
   * Create and set array of submissions in store
   * @param {Array} sub
   */
  SET_SUBMISSIONS (state, sub) {
    state.submissions = sub
  },
  /**
   * Add response to submission in store (Submission MUST exist first and have a 'responses' key in the 'content' property)
   * @param {Object} responses
   * @param {number} index
   */
  SET_SUBMISSION_RESPONSE (state, r, i) {
    state.submission.content.responses[i] = r
  },
  /**
   * Add an array of responses to submission in store
   * @param {Array<Object>} responses
   */
  SET_SUBMISSION_RESPONSES (state, r) {
    state.submission.content.responses = r
  }
}

/**
 * @name submission
 */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
