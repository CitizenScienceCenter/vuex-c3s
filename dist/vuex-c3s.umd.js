(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vuex')) :
  typeof define === 'function' && define.amd ? define(['vuex'], factory) :
  (global.vuexC3S = factory(global.Vuex));
}(this, (function (Vuex) { 'use strict';

  Vuex = Vuex && Vuex.hasOwnProperty('default') ? Vuex['default'] : Vuex;

  var SHA256 = require('crypto-js/sha256');

  // initial state

  // initial state

  var debug = process.env.NODE_ENV !== 'production';

  var store = new Vuex.Store({
    modules: {
      // user,
      // project,
      // api,
      // consts,
      // task,
      // media,
      // upload,
      // submission
    },
    strict: debug
  });

  // initialize the plugin object
  var C3SPlugin = {};

  // internationalization plugin for vue js using vuex
  C3SPlugin.install = function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!options.store) console.log('Please provide a store!!');
    if (!options.swaggerURL) console.log('Please provide a Swagger Path!!');

    options.store.registerModule('c3s', store);

    Swagger({
      url: options.swaggerURL,
      requestInterceptor: function requestInterceptor(req) {
        var u = store.getters['user/currentUser'];
        if (u !== null) {
          req.headers['X-API-KEY'] = u.api_key;
        }
        return req;
      }
    }).then(function (client) {
      store.commit('api/SET_API', client);
    }).catch(function (err) {
      console.error('URL was not found or an initialisation error occurred');
      console.error(err);
    });
  };

  // export both modules as one file
  var index = {
  	store: store,
  	plugin: C3SPlugin
  };

  return index;

})));
