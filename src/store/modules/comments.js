import { getNested, makeRequest } from './utils'
import rison from 'rison-node'
// initial state
// shape: [{ id, quantity }]
const state = {
  comments: [],
  comment: null
}

// getters
const getters = {}

// actions
const actions = {
  /**
   * Retrieve all comments matching the provided query object
   * @param state
   * @param commit
   * @param rootState
   * @param search
   * @returns {Promise<void>}
   */
  async getComments ({
    state,
    commit,
    rootState
  }, search) {
    search = rison.encode(search)
    return makeRequest(commit, rootState.c3s.client.apis.Comments.get_all, {
      search_term: search || undefined
    }, undefined, 'c3s/comments/SET_COMMENTS')
  },
  /**
   * Create a comment
   * @param state
   * @param commit
   * @param rootState
   * @param cmt
   */
  createComment ({
    state,
    commit,
    rootState
  }, cmt) {
    return makeRequest(commit, rootState.c3s.client.apis.Comments.create_comment, undefined, cmt, 'c3s/comments/ADD_COMMENT')
  }
}

// mutations
const mutations = {
  SET_COMMENTS (state, comments) {
    state.comments = comments
  },
  ADD_COMMENT (state, comment) {
    state.comments.push(comment)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
