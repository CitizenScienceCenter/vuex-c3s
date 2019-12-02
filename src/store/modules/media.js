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
  getMedia ({
    state,
    commit,
    rootState
  }, [search, commitMsg, limit, offset]) {
    search = rison.encode(search)
    return makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {
      search_term: search || undefined,
      limit: limit || 100,
      offset: offset || 0
    }, undefined, commitMsg)
  },
  /**
   * Delete media with ID
   * @param {String}} id
   */
  deleteMedium ({
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
  upload ({
    state,
    commit,
    rootState
  }, [url, file]) {
    return window.fetch(url, {
      method: 'PUT',
      body: file
    })
  },

  createMedium ({
    state,
    commit,
    rootState
  }, medium) {
    return makeRequest(commit, rootState.c3s.client.apis.Media.create_medium, undefined, medium, undefined)
  },

  getPresigned ({
    state,
    commit,
    rootState
  }, [sourceID, filename]) {
    return makeRequest(commit, rootState.c3s.client.apis.Media.get_pre_signed_url, {
      source_id: sourceID,
      filename: filename
    }, undefined, undefined)
  },

  uploadMedia ({
    state,
    commit,
    dispatch,
    rootState
  }, [sourceID, key, meta]) {
    return dispatch('getPresigned', ['builder', sourceID + '/' + meta.name]).then(resp => {
      if (resp) {
        const url = resp.body.data
        return dispatch('upload', [url, meta]).then(res => {
          if (res) {
            const medium = {
              source_id: sourceID,
              name: meta.name,
              filetype: meta.type,
              path: 'https://objects.citizenscience.ch/builder/' + sourceID + '/' + meta.name
            }
            if (key) {
              medium[key] = sourceID
            }
            return dispatch('createMedium', medium).then(medium => {
              return medium
            }).catch(err => {
              console.error(err)
            })
          }
        })
      }
    })
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
  SET_MEDIA (state, media) {
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
