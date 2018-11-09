import Vuex from 'vuex'
import api from './modules/api'
import user from './modules/user'
import project from './modules/project'
import task from './modules/task'
import submission from './modules/submission'
import media from './modules/media'
import upload from './modules/upload'
import consts from './modules/consts'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    project,
    api,
    consts,
    task,
    media,
    upload,
    submission
  },
  strict: debug
})
