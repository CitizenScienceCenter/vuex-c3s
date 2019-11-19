/**
 * @module c3s/media
 */
import {
  makeRequest
} from './utils'
import rison from 'rison-node'
/**
 *
 */
const state = {
  media: []
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
   * Get media matching search
   * @param {Array<Object,string, number>} Terms Array with Object of search query, messaage to commit to store (or undefined) and the limit to retrieve
   */
  getMedia({
    state,
    commit,
    rootState
  }, [search, commitMsg, limit]) {
    search = rison.encode(search)
    return makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {
      search_term: search || undefined,
      limit: limit || 100
    }, undefined, commitMsg)
  },
  /**
   * Delete media with ID
   * @param {String}} id
   */
  deleteMedium({
    state,
    commit,
    dispatch,
    rootState
  }, id) {
    return makeRequest(commit, rootState.c3s.client.apis.Media.delete_medium, {
      mid: id
    }, undefined, undefined)
  },
  /**
   * Upload a file
   * @param {FormData} medium File to upload
   */
  upload({
    state,
    commit,
    rootState
  }, [url, file]) {
    return window.fetch(url, {
      method: 'PUT',
      body: file
    })
  },

  getPresigned({
    state,
    commit,
    rootState
  }, [source_id, filename]) {
    return makeRequest(commmit, rootState.c3s.client.apis.Media.get_pre_signed_url, {
      source_id: source_id,
      filename: filename
    }, undefined, undefined)
  }

}

/**
 * @namespace mutations
 */
const mutations = {
  /**
   * Store array of media in store. File objects ARE NOT STORED and must be requested from their path
   * @param {Array<Object>} media
   */
  SET_MEDIA(state, media) {
    state.media = media
  }
}

/**
 * @name c3s/media
 */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
