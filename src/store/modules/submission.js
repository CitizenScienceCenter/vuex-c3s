
// initial state
// shape: [{ id, quantity }]
const state = {
  media: undefined,
  submission: {}
}

// getters
const getters = {
  submission: state => state.submission
}

// actions
const actions = {
  postSubmission ({ state, commit, rootState, dispatch }) {
    commit('settings/SET_LOADING', true, {root: true})
    rootState.api.client.apis.Submissions.create_submission({submission: state.submission})
      .then(res => {
        commit('settings/SET_LOADING', false, {root: true})
        commit('SET_SUBMISSION', Object.assign({}, res.body))
        if (rootState.upload.content.length > 0) {
          dispatch('upload/addID', res.body.id, {root: true})
        }
      })
      .catch(err => {
        commit('settings/SET_ERROR', 'Could not create Submission', {root: true})
        commit('settings/SET_LOADING', false, {root: true})
        console.log(err)
      })
  },
  putSubmission ({state, commit, rootState}, submission) {
    commit('settings/SET_LOADING', true, {root: true})
    console.log(this.user)
    rootState.api.client.apis.Submissions.update_submission({id: submission.id, submission: submission})
      .then(req => {
        commit('settings/SET_LOADING', false, {root: true})
        commit('SET_SUBMISSION', req.body)
      })
      .catch(err => {
        // commit('settings/SET_ERROR', 'Could not modify Submission', {root: true})
        commit('settings/SET_LOADING', false, {root: true})
        console.log(err)
      })
  }
}

// mutations
const mutations = {
  SET_MEDIA (state, media) {
    state.media = media
  },
  SET_SUBMISSION (state, sub) {
    state.submission = sub
  },
  SET_SUBMISSION_RESPONSE (state, r, i) {
    state.submission.content.responses[i] = r
  },
  SET_SUBMISSION_RESPONSES (state, r) {
    state.submission.content.responses = r
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
