/** @module c3s */

/**
 * @constant state
 * @property {Object} [client=null]
 * @property {String} [host=undefined]
 */
const state = {
  client: null,
  host: undefined
}

/** getters */
const getters = {
}

/** actions
 * @constant
 * @namespace actions
*/
const actions = {
  setClient ({ commit }, client) {
    commit('SET_API', client)
  }
}

/** mutations
 * @namespace mutations
*/
const mutations = {
  /**
	 * Set Swagger API client in store
	 * @param {Provided} state
	 * @param {Object} client
	 */
  SET_API (state, client) {
    state.client = client
  },
  /**
	 * Set host for Base Path
	 * @param {Provided} state
	 * @param {String} h
	 */
  SET_HOST (state, h) {
    state.host = h
  }
}

/**
 * api
 */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
