// initial state
// shape: [{ id, quantity }]
const state = {
  id: null,
  content: []
}

// getters
const getters = {}

// actions
const actions = {
  addID ({
    state,
    commit,
    rootState
  }, id) {
    commit('SET_ID', id)
    console.log('updating')
    console.log(id)
    for (let i = 0; i < state.content.length; i++) {
      commit('settings/SET_LOADING', true, {
        root: true
      })
      console.log(state.content[i])
      rootState.api.client.apis.Media.put_medium({
        id: state.content[i],
        media: {
          id: state.content[i],
          'source_id': id || state.id
        }
      })
        .then(req => {
          console.log(req)
          commit('settings/SET_LOADING', false, {
            root: true
          })
          if (i === state.content.length - 1) {
            commit('CLEAR')
          }
        })
        .catch((e) => {
          commit('settings/SET_LOADING', false, {
            root: true
          })
          console.error(e)
        })
    }
  }
}

// mutations
const mutations = {
  SET_ID (state, id) {
    state.id = id
  },
  ADD_CONTENT (state, entry) {
    console.log(entry)
    state.content.push(entry)
    console.log(state.content)
  },
  CLEAR (state) {
    state.id = null
    state.content = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
