
// initial state
// shape: [{ id, quantity }]
const state = {
  client: null,
  host: undefined
}

// getters
const getters = {
  client: state => state.client,
  host: state => state.host
}

// actions
const actions = {
  setClient ({ commit }, client) {
    commit('SET_API', client)
  }
}

// mutations
const mutations = {
  SET_API (state, client) {
    state.client = client
  },
  SET_HOST (state, h) {
    state.host = h
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
