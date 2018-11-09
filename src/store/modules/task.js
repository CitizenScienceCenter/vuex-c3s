
// initial state
// shape: [{ id, quantity }]
const state = {
  tasks: [],
  selectedTask: null,
  taskSaved: false
}

// getters
const getters = {
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
  // allTasks: state => state.tasks.concat(state.clientTasks)
}

// actions
const actions = {
  async getTasks ({ state, commit, rootState }, search) {
    try {
        commit('settings/SET_LOADING', true, {root: true})
        console.log(search)
        let tasks = await rootState.api.client.apis.Tasks.get_tasks({ search_term: search || undefined })
        commit('SET_TASKS', tasks.body)
        commit('settings/SET_LOADING', false, {root: true})
        return tasks.body
    } catch (err) {
        console.error(err)
        commit('settings/SET_ERROR', 'Could not get Tasks', {root: true})
        commit('settings/SET_LOADING', false, {root: true})
        return false
    }
  },
  async getTaskRegion ({ state, commit, rootState }, [pid, region]) {
    try {
        commit('settings/SET_LOADING', true, {root: true})
        console.log(rootState.api.client.apis.Projects)
        let task = await rootState.api.client.apis.Projects.get_task_region({ id: pid, region: region || undefined })
        commit('settings/SET_LOADING', false, {root: true})
        console.log(JSON.stringify(tasks))
        return tasks.body
    } catch (err) {
        console.error(err)
        commit('settings/SET_ERROR', 'Could not get Tasks', {root: true})
        commit('settings/SET_LOADING', false, {root: true})
        return false
    }
  },
  async getTask ({ state, commit, rootState }, id) {
    commit('settings/SET_LOADING', true, {root: true})
    try {
      let task = await rootState.api.client.apis.Tasks.get_task({ id: id })
      commit('SET_TASK', task.body)
      commit('settings/SET_LOADING', false, {root: true})
      return task.body
    } catch (err) {
      commit('settings/SET_ERROR', 'Could not get Task', {root: true})
      commit('settings/SET_LOADING', false, {root: true})
      return false
    }
  },
  async randomProjectTask ({state, commit, rootState}, [id, search]) {
    commit('settings/SET_LOADING', true, {root: true})
    try {
      let task = await rootState.api.client.apis.Projects.get_random({id: id, search: search})
      commit('settings/SET_LOADING', false, {root: true})
      return task.body.task
    } catch (err) {
      console.log(err)
      commit('settings/SET_ERROR', 'Could not get random task', {root: true})
      commit('settings/SET_LOADING', false, {root: true})
      return false
    }
  },
  projectTasks ({ state, commit, rootState }, id) {
    commit('settings/SET_LOADING', true, {root: true})
    rootState.api.client.apis.Projects.project_tasks({
      id: id
    })
      .then(res => {
        res.body.forEach(t => {
          t['content_str'] = JSON.stringify(t.content)
        })
        commit('SET_TASKS', res.body)
        commit('settings/SET_LOADING', false, {root: true})
      })
      .catch(err => {
        console.log(err)
        commit('settings/SET_ERROR', 'Could not get Tasks for Project', {root: true})
        commit('settings/SET_LOADING', false, {root: true})
      })
  },
  async addTasks ({ state, commit, dispatch, rootState }, tasks) {
    commit('settings/SET_LOADING', true, {root: true})
    try {
      let res = await rootState.api.client.apis.Tasks.create_tasks({
        tasks: tasks
      })
      commit('settings/SET_LOADING', false, {root: true})
      dispatch('upload/addID', res.body[0].id, {root: true})
      return res.body
    } catch (e) {
      console.error(e)
      commit('settings/SET_LOADING', false, {root: true})
      commit('settings/SET_ERROR', e, {root: true})
      return false
    }
  },
  deleteTasks ({ state, commit, dispatch, rootState }, tasks) {
    commit('settings/SET_LOADING', true, {root: true})
    rootState.api.client.apis.Tasks.delete_tasks({
      tasks: tasks
    })
      .then(res => {
        commit('SET_TASKS', res.body)
        commit('settings/SET_LOADING', false, {root: true})
      })
      .catch(e => {
        commit('settings/SET_ERROR', 'Could not delete Tasks', {root: true})
        commit('settings/SET_LOADING', false, {root: true})
        console.error(e)
      })
  }

}

// mutations
const mutations = {
  SET_TASKSAVED (state, flag) {
    state.taskSaved = flag
  },
  SET_TASKS (state, tasks) {
    state.tasks = tasks
  },
  SET_TASK (state, task) {
    state.selectedTask = task
  },
  UPDATE_TASK (state, index, params) {
    Object.assign(state.getters.allTasks[index], {
      [params.field]: params.value
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
