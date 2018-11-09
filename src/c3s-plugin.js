import store from './store'

// initialize the plugin object
let C3SPlugin = {}

// internationalization plugin for vue js using vuex
C3SPlugin.install = function install (Vue, options = {}) {
  if (!options.store) console.log('Please provide a store!!')
  if (!options.swaggerURL) console.log('Please provide a Swagger Path!!')

  options.store.registerModule('c3s', store)

  Swagger({
    url: options.swaggerURL,
    requestInterceptor (req) {
      let u = store.getters['user/currentUser']
      if (u !== null) {
        req.headers['X-API-KEY'] = u.api_key
      }
      return req
    }
  }).then(client => {
    store.commit('api/SET_API', client)
  }).catch(err => {
    console.error('URL was not found or an initialisation error occurred')
    console.error(err)
  });
}

export default C3SPlugin
