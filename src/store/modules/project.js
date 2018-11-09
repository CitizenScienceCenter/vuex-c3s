// initial state
// shape: [{ id, quantity }]
const state = {
  projects: [],
  selectedProject: null,
  selectedMedia: [],
  selectedStats: null,
  selectedTasks: []
}

// getters
const getters = {
  projects: state => state.projects
}

// actions
const actions = {
  getProjects ({
    state,
    commit,
    dispatch,
    rootState
  }, search) {
    commit('settings/SET_LOADING', true, {
      root: true
    })
    rootState.api.client.apis.Projects.get_projects({
      search_term: search || undefined
    })
      .then(req => {
        commit('SET_PROJECTS', req.body)
        commit('settings/SET_LOADING', false, {
          root: true
        })
      })
      .catch(err => {
        commit('settings/SET_LOADING', false, {
          root: true
        })
        commit('settings/SET_ERROR', err, {
          root: true
        })
        console.log(err)
      })
  },
  async getProject ({
    state,
    commit,
    dispatch,
    rootState
  }, [id, associated]) {
    commit('settings/SET_LOADING', true, {
      root: true
    })
    try {
      let res = await rootState.api.client.apis.Projects.get_project({id: id})
      commit('SET_PROJECT', res.body)
      commit('settings/SET_LOADING', false, {
        root: true
      })
      if (associated) {
        dispatch('getMedia', id)
        dispatch('getTasks', [id, 1, 0])
      }
      dispatch('getStats', id)
      return res.body
    } catch (err) {
      console.log(err)
      commit('settings/SET_LOADING', false, {
        root: true
      })
      commit('settings/SET_ERROR', err, {
        root: true
      })
      return false
    }
  },
  async getTasks ({state, commit, rootState}, [id, limit = 20, offset = 0]) {
    commit('settings/SET_LOADING', true, {
      root: true
    })
    try {
      let tasks = await rootState.api.client.apis.Projects.project_tasks({
        id: id, limit: limit, offset: offset
      })
      console.log(id)
      commit('settings/SET_LOADING', false, {
        root: true
      })
      commit('SET_TASKS', tasks.body)
      return tasks.body
    } catch (err) {
      commit('settings/SET_LOADING', false, {
        root: true
      })
      commit('settings/SET_LOADING', false, {root: true})
      console.log(err)
      return false
    }
  },
  getStats ({state, commit, rootState}, id) {
    commit('settings/SET_LOADING', true, {
      root: true
    })
    rootState.api.client.apis.Projects.project_stats({
      id: id
    })
      .then(req => {
        commit('settings/SET_LOADING', false, {
          root: true
        })
        commit('SET_STATS', req.body)
      }).catch(err => {
        commit('settings/SET_LOADING', false, {
          root: true
        })
        commit('settings/SET_LOADING', false, {root: true})
        console.log(err)
      })
  },
  getMedia ({ state, commit, rootState }, search) {
    commit('settings/SET_LOADING', true, {root: true})
    rootState.api.client.apis.Media.get_media({
      search_term: search || undefined
    })
      .then(req => {
        commit('SET_MEDIA', req.body)
        commit('settings/SET_LOADING', false, {root: true})
      })
      .catch(err => {
        commit('settings/SET_LOADING', false, {root: true})
        console.log(err)
      })
  },
  createProject ({
    state,
    commit,
    rootState
  }, project) {
    commit('settings/SET_LOADING', true, {
      root: true
    })
    rootState.api.client.apis.Projects.post({
      project: project
    })
      .then(req => {
        console.log(req)
        commit('settings/SET_LOADING', false, {
          root: true
        })
        commit('SET_PROJECT', req.body)
      })
      .catch(err => {
        commit('settings/SET_ERROR', err, {
          root: true
        })
        commit('settings/SET_LOADING', false, {root: true})
        console.log(err)
      })
  },
  deleteProject ({
    state,
    commit,
    rootState
  }, pid) {
    commit('settings/SET_LOADING', true, {
      root: true
    })
    rootState.api.client.apis.Projects.delete({
      id: pid
    })
      .then(req => {
        commit('SET_PROJECT', null)
        commit('settings/SET_LOADING', false, {
          root: true
        })
      })
      .catch(err => {
        commit('settings/SET_LOADING', false, {
          root: true
        })
        commit('settings/SET_LOADING', false, {root: true})
        console.log(err)
      })
  }
}

// mutations
const mutations = {
  SET_PROJECTS (state, projects) {
    state.projects = projects
  },
  SET_PROJECT (state, project) {
    state.selectedProject = project
  },
  SET_STATS (state, stats) {
    state.selectedStats = stats
  },
  SET_MEDIA (state, media) {
    state.selectedMedia = media
  },
  SET_TASKS (state, tasks) {
    state.selectedTasks = tasks
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
