/**
 * Loading primary plugin and setting up
 * the install method to link in to Vue instance
 * @module C3SPlugin
 */

import * as C3SStore from './store/index'
import Swagger from 'swagger-client'

/**
 * Modules array to list
 * the name of the submodule
 * and the file to import
 * @constant modules
 */
const modules = [
  {
    name: 'c3s',
    module: C3SStore.api
  },
  {
    name: ['c3s', 'user'],
    module: C3SStore.user
  },
  {
    name: ['c3s', 'member'],
    module: C3SStore.member
  },
  {
    name: ['c3s', 'task'],
    module: C3SStore.task
  },
  {
    name: ['c3s', 'media'],
    module: C3SStore.media
  },
  {
    name: ['c3s', 'submission'],
    module: C3SStore.submission
  },
  {
    name: ['c3s', 'comments'],
    module: C3SStore.comments
  },
  {
    name: ['c3s', 'project'],
    module: C3SStore.project
  },
  {
    name: ['c3s', 'settings'],
    module: C3SStore.settings
  }
]

const C3SPlugin = {
  /**
     * Setup function for the plugin, must provide a store and a Swagger file URL
     * @param {Provided} Vue
     * @method install
     * @param {Object} options Expects the store and Swagger URL
     */
  install (Vue, options = {}) {
    Swagger(options.apiURL, {
      requestInterceptor (req) {
        if (options.server && req.url.indexOf('openapi.json') === -1) {
          // TODO handle server decision from spec
          req.url = req.url.replace('http://localhost:9000/api/v3/', options.server)
        }
        req.headers['content-type'] = 'application/json'
        if (options.store.state.c3s && options.store.state.c3s.user) {
          const u = options.store.state.c3s.user.currentUser
          if (u) {
            req.headers['X-API-KEY'] = u.api_key
          }
        } else {
          console.log('c3s: state not loaded or not found')
        }
        return req
      }
    }).then(client => {
      const store = options.store
      const apiURL = options.apiURL
      if (!store || !apiURL) {
        console.error('C3S: Missing store and/or Swagger URL params.')
        return
      }
      console.log('Loaded from ' + options.apiURL)
      for (const i in modules) {
        const m = modules[i]
        const name = m.name
        let preserve = true
        if (Array.isArray(name)) {
          if (store.state.c3s && store.state.c3s[name[1]] === undefined) {
            preserve = false
          }
        } else {
          if (store.state[name] === undefined) {
            preserve = false
          }
        }

        store.registerModule(name, m.module, { preserveState: preserve })
      }
      store.commit('c3s/SET_API', client)
      var isLoaded = function () {
        if (store.c3s !== undefined && store.c3s.client !== null) {
          return true
        } else {
          return false
        }
      }

      Vue.prototype.$c3s = {
        store: C3SStore,
        loaded: isLoaded
      }
      Vue.c3s = {
        store: C3SStore,
        loaded: isLoaded
      }
    }).catch(err => {
      console.error('C3S: URL was not found or an initialisation error occurred')
      console.error(err)
    })
  }
}

/**
 * @name C3SPlugin
 */
export default C3SPlugin
