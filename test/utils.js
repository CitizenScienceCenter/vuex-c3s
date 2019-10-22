import c3s from '../dist/vuex-c3s.es'
import Swagger from 'swagger-client'

export const createStore = (store, options, modules = [], cb) => {
  Swagger(options.apiURL, {
    requestInterceptor(req) {
      if (options.server && req.url.indexOf('openapi.json') === -1) {
        // TODO handle server decision from spec
        req.url = req.url.replace('http://localhost:9000/api/v3/', options.server)
      }
      req.headers['content-type'] = 'application/json'
      if (store.state.c3s && store.state.c3s.user) {
        const u = store.state.c3s.user.currentUser
        if (u) {
          req.headers['X-API-KEY'] = u.api_key
        }
      } else {
        console.log('c3s: state not loaded or not found')
      }
      return req
    }
  }).then(client => {
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
    cb()
  }).catch(err => {
    console.error(err);
  });
}
