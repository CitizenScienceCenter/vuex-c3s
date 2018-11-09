
// initial state
// shape: [{ id, quantity }]
const state = {
  media: []
}

// getters
const getters = {
  media: state => state.media
}

// actions
const actions = {
  getMedia ({state, commit, rootState}, search) {
    commit('settings/SET_LOADING', true, {root: true})
    rootState.api.client.apis.Media.get_media({
      search_term: search || undefined
    })
      .then(req => {
        commit('SET_MEDIA', req.body)
        commit('settings/SET_LOADING', false, {root: true})
      })
      .catch(err => {
        if (err.response.status === 404) {
          // TODO load 404 pageFput_
        } else {
          // TODO show errror
        }
      })
  },
  deleteMedium ({state, commit, dispatch, rootState}, id) {
    commit('settings/SET_LOADING', true, {root: true})
    rootState.api.client.apis.Media.delete_medium({
      id: id || undefined
    })
      .then(req => {
        commit('settings/SET_LOADING', false, {root: true})
        dispatch('getMedia')
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 404) {
          // TODO load 404 page
        } else {
          // TODO show errror
        }
      })
  },
  upload ({state, commit, rootState}, medium) {
    commit('settings/SET_LOADING', true, {root: true})
    rootState.api.client.Media.upload(medium)
      .then(req => {
        commit('settings/SET_LOADING', false, {root: true})
        console.log(req)
        this.fileSaved = true
      })
      .catch((e) => {
        commit('settings/SET_LOADING', false, {root: true})
        console.error(e)
      })
  }
}

// mutations
const mutations = {
  SET_MEDIA (state, media) {
    state.media = media
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
