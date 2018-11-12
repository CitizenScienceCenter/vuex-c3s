import C3SStore from './store/index'
import Swagger from 'swagger-client'


const moduleName = 'c3s'
const C3SPlugin = {
  
  install (Vue, options = {}) {

    const store = options.store
    const swaggerURL = options.swaggerURL
    if (!store || !swaggerURL) {
      console.error("C3S: Missing store and/or Swagger URL params.")
      return
    }

    store.registerModule(moduleName, C3SStore)

    if (store.state.hasOwnProperty(moduleName) === false) {
      console.error('C3S: C3S vuex module is not correctly initialized. Please check the module name:', moduleName);
      return;
    }

    Swagger({
      url: options.swaggerURL,
      requestInterceptor (req) {
        // let u = store.getters['user/currentUser']
        // if (u !== null) {
        //   req.headers['X-API-KEY'] = u.api_key
        // }
        // return req
      }
    }).then(client => {
      console.log("Loaded")
      // store.commit('api/SET_API', client)

      var getStore = function() {
        return store;
      }
      console.log(store.commit)

      Vue.prototype.$c3s = {
        store: getStore
      }
      Vue.c3s = {
        store: getStore
      }
    }).catch(err => {
      console.error('C3S: URL was not found or an initialisation error occurred')
      console.error(err)
      return;
    });
  }
}

export default C3SPlugin
