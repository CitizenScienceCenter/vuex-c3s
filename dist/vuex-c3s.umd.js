(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/slicedToArray'), require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('rison-node'), require('@babel/runtime/helpers/defineProperty'), require('vuex'), require('swagger-client')) :
  typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/slicedToArray', '@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', 'rison-node', '@babel/runtime/helpers/defineProperty', 'vuex', 'swagger-client'], factory) :
  (global = global || self, global.vuexC3S = factory(global._slicedToArray, global._regeneratorRuntime, global._asyncToGenerator, global.rison, global._defineProperty, global.Vuex, global.Swagger));
}(this, function (_slicedToArray, _regeneratorRuntime, _asyncToGenerator, rison, _defineProperty, vuex, Swagger) { 'use strict';

  _slicedToArray = _slicedToArray && _slicedToArray.hasOwnProperty('default') ? _slicedToArray['default'] : _slicedToArray;
  _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
  rison = rison && rison.hasOwnProperty('default') ? rison['default'] : rison;
  _defineProperty = _defineProperty && _defineProperty.hasOwnProperty('default') ? _defineProperty['default'] : _defineProperty;
  Swagger = Swagger && Swagger.hasOwnProperty('default') ? Swagger['default'] : Swagger;

  /** @module c3s */

  /**
   * @constant state
   * @property {Object} [client=null]
   * @property {String} [host=undefined]
   */
  var state = {
    client: null,
    host: undefined
  };
  /** getters */

  var getters = {};
  /** actions
   * @constant
   * @namespace actions
  */

  var actions = {
    setClient: function setClient(_ref, client) {
      var commit = _ref.commit;
      commit('SET_API', client);
    }
  };
  /** mutations
   * @namespace mutations
  */

  var mutations = {
    /**
    * Set Swagger API client in store
    * @param {Provided} state
    * @param {Object} client
    */
    SET_API: function SET_API(state, client) {
      state.client = client;
    },

    /**
    * Set host for Base Path
    * @param {Provided} state
    * @param {String} h
    */
    SET_HOST: function SET_HOST(state, h) {
      state.host = h;
    }
  };
  /**
   * api
   */

  var api = {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
  };

  function makeRequest(_x, _x2, _x3, _x4, _x5) {
    return _makeRequest.apply(this, arguments);
  }

  function _makeRequest() {
    _makeRequest = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(commit, method, query, data, commitMsg) {
      var body, response;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              commit('c3s/settings/SET_LOADING', true, {
                root: true
              });
              body = undefined;

              if (data != undefined || data != null || data != {}) {
                body = {
                  requestBody: data
                };
              }

              _context.next = 6;
              return method(query, body);

            case 6:
              response = _context.sent;

              if (commitMsg !== undefined) {
                commit(commitMsg, response.body.data, {
                  root: true
                });
              }

              commit('c3s/settings/SET_LOADING', false, {
                root: true
              });
              return _context.abrupt("return", response);

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              commit('c3s/settings/SET_ERROR', 'Could not complete request', {
                root: true
              });
              commit('c3s/settings/SET_LOADING', false, {
                root: true
              });
              return _context.abrupt("return", _context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));
    return _makeRequest.apply(this, arguments);
  }

  function getNested$1(obj, path) {
    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
      obj = obj[path[i]];
    }
    return obj;
  }

  var SHA256 = require('crypto-js/sha256');
  /**
   * @constant state
   * @property {Object} [user=null] Userr information
   * @property {Object} [currentUser=null] Information of logged in user
   * @property {Object} [isAnon=null] If the current user is an anonymous user
   */


  var state$1 = {
    user: null,
    currentUser: null,
    isAnon: false
  };
  var path = 'c3s.client.apis.Users';
  /**
   * @constant getters
   * @namespace getters
   */

  var getters$1 = {};
  /**
   * @constant actions
   * @namespace actionss
   */

  var actions$1 = {
    /**
     * Login user
     * @param {Object} user Username/email and password of user
     * @returns {Promise<*>}
     */
    login: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(_ref, user) {
        var state, commit, dispatch, rootState, method;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = _ref.state, commit = _ref.commit, dispatch = _ref.dispatch, rootState = _ref.rootState;
                method = '.login';
                return _context.abrupt("return", makeRequest(commit, getNested$1(rootState, path + method), {}, user, 'c3s/user/SET_CURRENT_USER'));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),

    /**
     * Create anonymouse user and register with backend
     * @returns {Promise<*>}
     */
    generateAnon: function () {
      var _generateAnon = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(_ref2) {
        var state, commit, dispatch, rootState, method, now, id, pwd, u, response;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                state = _ref2.state, commit = _ref2.commit, dispatch = _ref2.dispatch, rootState = _ref2.rootState;
                method = '.create_user';
                commit('c3s/settings/SET_LOADING', true, {
                  root: true
                });
                now = '' + Date.now();
                id = '_anon' + SHA256(now); // TODO add extra details to avoid clash OR delegate to server?

                pwd = '' + SHA256(id);
                u = {
                  username: id,
                  pwd: pwd,
                  anonymous: true,
                  info: {}
                };
                response = makeRequest(commit, getNested$1(rootState, path + method), undefined, u, 'c3s/user/SET_CURRENT_USER');
                commit('SET_ANON', true);
                return _context2.abrupt("return", response);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function generateAnon(_x3) {
        return _generateAnon.apply(this, arguments);
      }

      return generateAnon;
    }(),

    /**
     * Logout user and remove from local store
     */
    logout: function logout(_ref3) {
      var state = _ref3.state,
          commit = _ref3.commit;
      commit('c3s/user/SET_CURRENT_USER', null, null, {
        root: true
      });
      commit('SET_ANON', false);
    },

    /**
     * Request to reset password
     * @param {String} email
     * @returns {Promise<*>}
     */
    requestReset: function () {
      var _requestReset = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(_ref4, email) {
        var state, commit, dispatch, rootState, method;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
                method = '.reset';
                return _context3.abrupt("return", makeRequest(commit, getNested$1(rootState, path + method), {}, {
                  email: email
                }, undefined));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function requestReset(_x4, _x5) {
        return _requestReset.apply(this, arguments);
      }

      return requestReset;
    }(),

    /**
     * Reset user password with code
     * @param {string} reset
     * @returns {Promise<*|boolean|void>}
     */
    resetPwd: function () {
      var _resetPwd = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(_ref5, reset) {
        var state, commit, rootState, method;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
                method = '.verify_rest';
                return _context4.abrupt("return", makeRequest(commit, getNested$1(rootState, path + method), {}, {
                  reset: reset
                }, undefined));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function resetPwd(_x6, _x7) {
        return _resetPwd.apply(this, arguments);
      }

      return resetPwd;
    }(),

    /**
     * Create a user account
     * @param {Object} user
     * @returns {Promise<*|boolean|void>}
     */
    register: function () {
      var _register = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(_ref6, user) {
        var state, commit, rootState, method, response;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                state = _ref6.state, commit = _ref6.commit, rootState = _ref6.rootState;
                method = '.create_user';
                response = makeRequest(commit, getNested$1(rootState, path + method), {}, user, 'c3s/user/SET_CURRENT_USER');
                commit('SET_ANON', false);
                return _context5.abrupt("return", response);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function register(_x8, _x9) {
        return _register.apply(this, arguments);
      }

      return register;
    }(),

    /**
     * Retrieve a user based on ID
     * @param {String} id
     * @returns {Promise<*|boolean|void>}
     */
    getUser: function () {
      var _getUser = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(_ref7, id) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                state = _ref7.state, commit = _ref7.commit, rootState = _ref7.rootState;
                return _context6.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.get_one, {
                  id: id
                }, {}, 'c3s/user/SET_USER'));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getUser(_x10, _x11) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }(),

    /**
     * Update user based on ID
     * @param {Array} (id, info)
     * @returns {Promise<*|boolean|void>}
     */
    updateUser: function () {
      var _updateUser = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(_ref8, _ref9) {
        var state, commit, rootState, _ref10, id, info, method;

        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
                _ref10 = _slicedToArray(_ref9, 2), id = _ref10[0], info = _ref10[1];
                method = '.update_user';
                return _context7.abrupt("return", makeRequest(commit, getNested$1(rootState, path + method), {
                  id: id
                }, {
                  requestBody: info
                }, 'c3s/user/SET_CURRENT_USER'));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function updateUser(_x12, _x13) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }(),

    /**
     * Validate user existence and access based on API Key
     * @param {String} id
     * @returns {Promise<*|boolean|void>}
     */
    validate: function () {
      var _validate = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(_ref11, id) {
        var state, commit, rootState, method;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                state = _ref11.state, commit = _ref11.commit, rootState = _ref11.rootState;
                method = '.validate';

                if (!(state.currentUser.api_key !== undefined)) {
                  _context8.next = 4;
                  break;
                }

                return _context8.abrupt("return", makeRequest(commit, getNested$1(rootState, path + method), {
                  key: state.currentUser.api_key
                }, {}, 'c3s/user/SET_CURRENT_USER'));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function validate(_x14, _x15) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  };
  /**
   * @constant
   * @namespace mutations
   */

  var mutations$1 = {
    /**
     * Set user outside of the currently logged in
     * @param {Object} user
     */
    SET_USER: function SET_USER(state, user) {
      state.user = user;
    },

    /**
     * Set current user
     * @param {Object} user
     */
    SET_CURRENT_USER: function SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },

    /**
     * Set anonymous state of current user
     * @param {Boolean} flag
     */
    SET_ANON: function SET_ANON(state, flag) {
      state.isAnon = flag;
    }
  };
  /**
   * @name User
   */

  var user = {
    namespaced: true,
    state: state$1,
    getters: getters$1,
    actions: actions$1,
    mutations: mutations$1
  };

  /**
   * @constant
   * @property {Array} [activities=[]]
   * @property {Object} [activity=null]
   * @property {Object} [stats=null]
   * @property {Array} [media=[]]
   * @property {Array} [comments=[]]
   */

  var state$2 = {
    activities: [],
    activity: null,
    tasks: [],
    stats: null,
    media: [],
    comments: []
  };
  var path$1 = 'c3s.client.apis.Activities';
  /**
   * @type Object
   * @constant
   */

  var getters$2 = {};
  /**
   *  actions
    * @constant
  	@type {object}
      @namespace actions
  */

  var actions$2 = {
    /**
     * Retrieve an array of activities based on a provided query object
     * @param {Array<Object, number>} search An array containing the search object and the limit for the number of results to return
     */
    getActivities: function getActivities(_ref, _ref2) {
      var state = _ref.state,
          commit = _ref.commit,
          dispatch = _ref.dispatch,
          rootState = _ref.rootState;

      var _ref3 = _slicedToArray(_ref2, 2),
          search = _ref3[0],
          limit = _ref3[1];

      search = rison.encode(search);
      var method = '.get_activities';
      return makeRequest(commit, getNested$1(rootState, path$1 + method), {
        search_term: search || undefined,
        limit: limit || 100
      }, {}, 'c3s/activity/SET_ACTIVITIES');
    },

    /**
     * Retrieve a single activity based on the ID
     * @param {Array<string, boolean>} ID An array containing the ID of the activity and a boolean to determine whether or not to retrieve the media and comments also
     * @returns {Promise<*|boolean|void>}
     */
    getActivity: function () {
      var _getActivity = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(_ref4, _ref5) {
        var state, commit, dispatch, rootState, _ref6, id, associated, method;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
                _ref6 = _slicedToArray(_ref5, 2), id = _ref6[0], associated = _ref6[1];

                method = '.get_activity';
                return _context.abrupt("return", makeRequest(commit, getNested$1(rootState, path$1 + method), {
                  aid: id
                }, {}, 'c3s/activity/SET_ACTIVITY'));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getActivity(_x, _x2) {
        return _getActivity.apply(this, arguments);
      }

      return getActivity;
    }(),
    getActivityTasks: function () {
      var _getActivityTasks = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(_ref7, _ref8) {
        var state, commit, dispatch, rootState, _ref9, id, method;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                state = _ref7.state, commit = _ref7.commit, dispatch = _ref7.dispatch, rootState = _ref7.rootState;
                _ref9 = _slicedToArray(_ref8, 1), id = _ref9[0];
                method = '.get_activity_tasks';
                return _context2.abrupt("return", makeRequest(commit, getNested$1(rootState, path$1 + method), {
                  aid: id
                }, {}, 'c3s/activity/SET_ACTIVITY_TASKS'));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getActivityTasks(_x3, _x4) {
        return _getActivityTasks.apply(this, arguments);
      }

      return getActivityTasks;
    }(),

    /**
     * Returns a count for the number of activities matching criteria
     * @param {Object} search Search object the same as one would use in getActivities
     */
    getActivityCount: function () {
      var _getActivityCount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(_ref10, search) {
        var state, commit, rootState, method;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                state = _ref10.state, commit = _ref10.commit, rootState = _ref10.rootState;
                search = rison.encode(search);
                method = '.get_activity.count';
                return _context3.abrupt("return", makeRequest(commit, getNested$1(rootState, path$1 + method), {
                  search_term: search || undefined
                }, {}, undefined));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getActivityCount(_x5, _x6) {
        return _getActivityCount.apply(this, arguments);
      }

      return getActivityCount;
    }(),
    getStats: function () {
      var _getStats = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(_ref11, id) {
        var state, commit, rootState, method;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                state = _ref11.state, commit = _ref11.commit, rootState = _ref11.rootState;
                method = '.get_stats';
                return _context4.abrupt("return", makeRequest(commit, getNested$1(rootState, path$1 + method), {
                  aid: id
                }, {}, 'c3s/activity/SET_STATS'));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getStats(_x7, _x8) {
        return _getStats.apply(this, arguments);
      }

      return getStats;
    }(),

    /**
     * Create an activity
     * @param {Object} activity
     * @returns {Promise<*|boolean|void>}
     */
    createActivity: function createActivity(_ref12, activity) {
      var state = _ref12.state,
          commit = _ref12.commit,
          rootState = _ref12.rootState;
      var method = '.create_activity';
      return makeRequest(commit, getNested$1(rootState, path$1 + method), undefined, activity, 'c3s/activity/SET_ACTIVITY');
    },

    /**
     * Update an activity 
     * @param {Array<string, boolean>} Array containing the ID and object of the activity to be modified 
     * @returns {Promise<*|boolean|void>} 
     */
    updateActivity: function updateActivity(_ref13, _ref14) {
      var state = _ref13.state,
          commit = _ref13.commit,
          rootState = _ref13.rootState;

      var _ref15 = _slicedToArray(_ref14, 2),
          id = _ref15[0],
          activity = _ref15[1];

      var method = '.update_activity';
      return makeRequest(commit, getNested$1(rootState, path$1 + method), {
        aid: id
      }, activity, 'c3s/activity/SET_ACTIVITY');
    },

    /**
     * Delete an activity matching the supplied ID
     * @param {Array<string, boolean>} ID An array containing the ID of the activity and a boolean to determine whether or not to remove from the store also
     * @returns {Promise<*|boolean|void>}
     */
    deleteActivity: function deleteActivity(_ref16, _ref17) {
      var state = _ref16.state,
          commit = _ref16.commit,
          rootState = _ref16.rootState;

      var _ref18 = _slicedToArray(_ref17, 2),
          id = _ref18[0],
          localRemove = _ref18[1];

      var method = '.delete_activity';
      if (localRemove) commit('c3s/activity/SET_ACTIVITY', null);
      return makeRequest(commit, getNested$1(rootState, path$1 + method), {
        aid: id
      }, {}, undefined);
    }
  };
  /**
   * @constant mutations All mutations one can commit to the activity submodule
   * @type {object}
   * @namespace mutations
   */

  var mutations$2 = {
    /**
     * Sets the activities in the store
     * @param {Array} acts
     */
    SET_ACTIVITIES: function SET_ACTIVITIES(state, acts) {
      state.activities = acts;
    },

    /**
     * Sets a single activity
     * @param {Object} act
     */
    SET_ACTIVITY: function SET_ACTIVITY(state, act) {
      state.activity = act;
    },

    /**
     * Set statistics for an activity
     * @param {Object} stats
     */
    SET_STATS: function SET_STATS(state, stats) {
      state.stats = stats;
    },

    /**
     * Set comments for an activity
     * @param {Arrya} cmts
     */
    SET_COMMENTS: function SET_COMMENTS(state, cmts) {
      state.comments = cmts;
    },
    SET_ACTIVITY_TASKS: function SET_ACTIVITY_TASKS(state, tasks) {
      state.tasks = tasks;
    },

    /**
     * Set media for an activity
     * @param {Array} media
     */
    SET_MEDIA: function SET_MEDIA(state, media) {
      state.media = media;
    }
  };
  /**
   * A module for linking activities to the API
   * @name Activity
   */

  var activity = {
    namespaced: true,
    state: state$2,
    getters: getters$2,
    actions: actions$2,
    mutations: mutations$2
  };

  /** @module c3s/task */

  /**
   * state
   * @property {Array} tasks
   * @property {Object} task
   * @property {Array} media
   * @property {Array} comments
   */

  var state$3 = {
    tasks: [],
    task: null,
    media: [],
    comments: [],
    stats: {}
  };
  var path$2 = 'c3s.client.apis.Tasks';
  /** getters
   * @namespace getters
   */

  var getters$3 = {} // https://vuex.vuejs.org/guide/getters.html#method-style-access
  // allTasks: state => state.tasks.concat(state.clientTasks)

  /**
   * actions
   * @alias module:c3s/task
   * @namespace actions
   */
  ;
  var actions$3 = {
    /**
     * Retrieve an array of tasks
     * @param {Array<Object, number>} Search An array containing a search object and a limit integer
     *
     */
    getTasks: function () {
      var _getTasks = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(_ref, _ref2) {
        var state, commit, rootState, _ref3, search, limit, method;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
                _ref3 = _slicedToArray(_ref2, 2), search = _ref3[0], limit = _ref3[1];
                method = '.get_tasks';
                search = rison.encode(search);
                return _context.abrupt("return", makeRequest(commit, getNested(rootState, path$2 + method), {
                  search_term: search || undefined,
                  limit: limit || 100
                }, {}, 'c3s/task/SET_TASKS'));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getTasks(_x, _x2) {
        return _getTasks.apply(this, arguments);
      }

      return getTasks;
    }(),

    /**
     * @param {Object} search A search term to match a JTOS object
     */
    getTaskCount: function () {
      var _getTaskCount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(_ref4, search) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                state = _ref4.state, commit = _ref4.commit, rootState = _ref4.rootState;
                search = rison.encode(search);
                return _context2.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task_count, {
                  search_term: search || undefined
                }, {}, undefined));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getTaskCount(_x3, _x4) {
        return _getTaskCount.apply(this, arguments);
      }

      return getTaskCount;
    }(),

    /**
     * Get Task Media
     * @param {Object} search
     */
    getTaskMedia: function () {
      var _getTaskMedia = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(_ref5, search) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
                search = rison.encode(search);
                return _context3.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {
                  search_term: search || undefined
                }, {}, 'c3s/task/SET_MEDIA'));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getTaskMedia(_x5, _x6) {
        return _getTaskMedia.apply(this, arguments);
      }

      return getTaskMedia;
    }(),

    /**
     * Retrieve a task matching an ID
     * @param {String} id Task ID
     */
    getTask: function () {
      var _getTask = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(_ref6, id) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                state = _ref6.state, commit = _ref6.commit, rootState = _ref6.rootState;
                return _context4.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task, {
                  id: id
                }, {}, 'c3s/task/SET_TASK'));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getTask(_x7, _x8) {
        return _getTask.apply(this, arguments);
      }

      return getTask;
    }(),
    getTaskComments: function () {
      var _getTaskComments = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(_ref7, id) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                state = _ref7.state, commit = _ref7.commit, rootState = _ref7.rootState;
                return _context5.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task_comments, {
                  id: id
                }, {}, 'c3s/task/SET_TASK_COMMENTS'));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getTaskComments(_x9, _x10) {
        return _getTaskComments.apply(this, arguments);
      }

      return getTaskComments;
    }(),
    getTaskStats: function () {
      var _getTaskStats = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(_ref8, id) {
        var state, commit, rootState, method;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
                method = '.get_stats';
                return _context6.abrupt("return", makeRequest(commit, getNested(rootState, path$2 + method), {
                  id: id
                }, {}, 'c3s/task/SET_TASK_STATS'));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getTaskStats(_x11, _x12) {
        return _getTaskStats.apply(this, arguments);
      }

      return getTaskStats;
    }(),

    /**
     * @description Create an array of tasks
     * @param {Array<Object>} tasks Array of tasks to be created
     */
    createTasks: function () {
      var _createTasks = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(_ref9, tasks) {
        var state, commit, dispatch, rootState, res;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                state = _ref9.state, commit = _ref9.commit, dispatch = _ref9.dispatch, rootState = _ref9.rootState;
                res = makeRequest(commit, rootState.c3s.client.apis.Tasks.create_tasks, {}, tasks, undefined);
                dispatch('c3s/upload/addID', res[0].id, {
                  root: true
                });
                return _context7.abrupt("return", res);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function createTasks(_x13, _x14) {
        return _createTasks.apply(this, arguments);
      }

      return createTasks;
    }(),

    /**
     * Deletes an array of tasks
     * @param {Array<Object>} tasks Tasks to be deleted, ID is required as a key here
     */
    deleteTasks: function deleteTasks(_ref10, tasks) {
      var state = _ref10.state,
          commit = _ref10.commit,
          dispatch = _ref10.dispatch,
          rootState = _ref10.rootState;
      dispatch('SET_TASKS', null);
      return makeRequest(commit, rootState.c3s.client.apis.Tasks.delete_tasks, {}, tasks, 'c3s/task/SET_TASKS');
    }
  };
  /** mutations
   * @namespace mutations
   */

  var mutations$3 = {
    /**
     * Set array of tasks in store
     * @param {Array} tasks
     */
    SET_TASKS: function SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },

    /**
     *  Set single task in store
     * @param {Object} task
     */
    SET_TASK: function SET_TASK(state, task) {
      state.task = task;
    },
    SET_TASK_COMMENTS: function SET_TASK_COMMENTS(state, cmts) {
      state.comments = cmts;
    },

    /**
     * Update task in store
     * @param {int} index Index of array to update
     * @param {Object} params New task object
     */
    UPDATE_TASK: function UPDATE_TASK(state, index, params) {
      Object.assign(state.tasks[index], _defineProperty({}, params.field, params.value));
    },

    /**
     * Commit media to store
     * @param {Array<Object>} media  Array of media objects
     */
    SET_MEDIA: function SET_MEDIA(state, media) {
      state.media = media;
    },
    SET_STATS: function SET_STATS(state, stats) {
      state.stats = stats;
    },

    /**
     * Set array of task comments in store
     * @param {Array<Object>} cmts
     */
    SET_COMMENTS: function SET_COMMENTS(state, cmts) {
      state.comments = cmts;
    }
  };
  /**
   * Task store submodule
   * @name Task
   */

  var task = {
    namespaced: true,
    state: state$3,
    getters: getters$3,
    actions: actions$3,
    mutations: mutations$3
  };

  /**
   * @constant state
   * @property {Object} [media=undefined]
   * @property {Object} [submission={}]
   * @property {Array} [submissions=[]]
   */

  var state$4 = {
    media: undefined,
    submission: {},
    submissions: []
  };
  /**
   * @namespace getters
   */

  var getters$4 = {};
  /**
   * @namespace actions
   */

  var actions$4 = {
    /**
     * Retrieve submissions matching the query object
     * @param {Array<Object, number>} search
     * @returns {Promise<*|boolean|void>}
     */
    getSubmissions: function () {
      var _getSubmissions = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(_ref, _ref2) {
        var state, commit, rootState, _ref3, search, limit;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
                _ref3 = _slicedToArray(_ref2, 2), search = _ref3[0], limit = _ref3[1];
                search = rison.encode(search);
                return _context.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.get_submissions, {
                  search_term: search || undefined,
                  limit: limit || 100
                }, {}, 'c3s/submission/SET_SUBMISSIONS'));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getSubmissions(_x, _x2) {
        return _getSubmissions.apply(this, arguments);
      }

      return getSubmissions;
    }(),

    /**
     * Retrieve the number of submissions matching a query
     * @param {Object} search
     */
    getSubmissionCount: function () {
      var _getSubmissionCount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(_ref4, search) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                state = _ref4.state, commit = _ref4.commit, rootState = _ref4.rootState;
                search = rison.encode(search);
                return _context2.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.get_submission_count, {
                  search_term: search || undefined
                }, {}, undefined));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getSubmissionCount(_x3, _x4) {
        return _getSubmissionCount.apply(this, arguments);
      }

      return getSubmissionCount;
    }(),
    getUserSubmissions: function () {
      var _getUserSubmissions = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(_ref5) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
                return _context3.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.get_submissions, {
                  id: rootState.c3s.client.apis.Users.current_user.id
                }, {}, 'c3s/submission/SET_SUBMISSIONS'));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getUserSubmissions(_x5) {
        return _getUserSubmissions.apply(this, arguments);
      }

      return getUserSubmissions;
    }(),

    /**
     * Create a submission
     * @returns {Promise<*|boolean|void>}
     */
    createSubmission: function () {
      var _createSubmission = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(_ref6) {
        var state, commit, rootState, dispatch;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                state = _ref6.state, commit = _ref6.commit, rootState = _ref6.rootState, dispatch = _ref6.dispatch;
                return _context4.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.create_submission, {}, state.submission, 'c3s/submission/SET_SUBMISSION'));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createSubmission(_x6) {
        return _createSubmission.apply(this, arguments);
      }

      return createSubmission;
    }(),

    /**
     * Update a submission based on the ID
     * @param {Object} submission
     * @returns {Promise<*|boolean|void>}
     */
    updateSubmission: function () {
      var _updateSubmission = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(_ref7, submission) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                state = _ref7.state, commit = _ref7.commit, rootState = _ref7.rootState;
                return _context5.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.update_submission, {
                  id: submission.id
                }, submission, 'submission/c3s/SET_SUBMISSION'));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateSubmission(_x7, _x8) {
        return _updateSubmission.apply(this, arguments);
      }

      return updateSubmission;
    }()
  };
  /**
   * @namespace mutations
   */

  var mutations$4 = {
    /**
     * Set media
     * @param {Array} media
     */
    SET_MEDIA: function SET_MEDIA(state, media) {
      state.media = media;
    },

    /**
     * Create and set submission in store
     * @param {Object} sub
     */
    SET_SUBMISSION: function SET_SUBMISSION(state, sub) {
      state.submission = sub;
    },

    /**
     * Create and set array of submissions in store
     * @param {Array} sub
     */
    SET_SUBMISSIONS: function SET_SUBMISSIONS(state, sub) {
      state.submissions = sub;
    },

    /**
     * Add response to submission in store (Submission MUST exist first and have a 'responses' key in the 'content' property)
     * @param {Object} responses
     * @param {number} index
     */
    SET_SUBMISSION_RESPONSE: function SET_SUBMISSION_RESPONSE(state, r, i) {
      state.submission.content.responses[i] = r;
    },

    /**
     * Add an array of responses to submission in store
     * @param {Array<Object>} responses
     */
    SET_SUBMISSION_RESPONSES: function SET_SUBMISSION_RESPONSES(state, r) {
      state.submission.content.responses = r;
    }
  };
  /**
   * @name submission
   */

  var submission = {
    namespaced: true,
    state: state$4,
    getters: getters$4,
    actions: actions$4,
    mutations: mutations$4
  };

  /**
   *
   */

  var state$5 = {
    media: []
  };
  /**
   * @namespace getters
   */

  var getters$5 = {};
  /**
   * @namespace actions
   */

  var actions$5 = {
    /**
    * Get media matching search
    * @param {Array<Object,string, number>} Terms Array with Object of search query, messaage to commit to store (or undefined) and the limit to retrieve
    */
    getMedia: function getMedia(_ref, _ref2) {
      var state = _ref.state,
          commit = _ref.commit,
          rootState = _ref.rootState;

      var _ref3 = _slicedToArray(_ref2, 3),
          search = _ref3[0],
          commitMsg = _ref3[1],
          limit = _ref3[2];

      search = rison.encode(search);
      return makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {
        search_term: search || undefined,
        limit: limit || 100
      }, commitMsg);
    },

    /**
    * Delete media with ID
    * @param {String}} id
    */
    deleteMedium: function deleteMedium(_ref4, id) {
      var state = _ref4.state,
          commit = _ref4.commit,
          dispatch = _ref4.dispatch,
          rootState = _ref4.rootState;
      return makeRequest(commit, rootState.c3s.client.apis.Media.delete_medium, {
        id: id
      }, undefined);
    },

    /**
    * Upload a file
    * @param {FormData} medium File to upload
    */
    upload: function upload(_ref5, medium) {
      var state = _ref5.state,
          commit = _ref5.commit,
          rootState = _ref5.rootState;
      return makeRequest(commit, rootState.c3s.client.apis.Media.upload, medium, undefined);
    }
  };
  /**
   * @namespace mutations
   */

  var mutations$5 = {
    /**
    * Store array of media in store. File objects ARE NOT STORED and must be requested from their path
    * @param {Array<Object>} media
    */
    SET_MEDIA: function SET_MEDIA(state, media) {
      state.media = media;
    }
  };
  /**
   * @name c3s/media
   */

  var media = {
    namespaced: true,
    state: state$5,
    getters: getters$5,
    actions: actions$5,
    mutations: mutations$5
  };

  // shape: [{ id, quantity }]

  var state$6 = {
    id: null,
    content: []
  }; // getters

  var getters$6 = {}; // actions

  var actions$6 = {
    addID: function addID(_ref, id) {
      var state = _ref.state,
          commit = _ref.commit,
          rootState = _ref.rootState;
      commit('SET_ID', id);
      console.log('updating');
      console.log(id);

      var _loop = function _loop(i) {
        commit('c3s/settings/SET_LOADING', true, {
          root: true
        });
        console.log(state.content[i]);
        rootState.c3s.client.apis.Media.put_medium({
          id: state.content[i],
          media: {
            id: state.content[i],
            source_id: id || state.id
          }
        }).then(function (req) {
          console.log(req);
          commit('c3s/settings/SET_LOADING', false, {
            root: true
          });

          if (i === state.content.length - 1) {
            commit('CLEAR');
          }
        })["catch"](function (e) {
          commit('c3s/settings/SET_LOADING', false, {
            root: true
          });
          console.error(e);
        });
      };

      for (var i = 0; i < state.content.length; i++) {
        _loop(i);
      }
    }
  }; // mutations

  var mutations$6 = {
    SET_ID: function SET_ID(state, id) {
      state.id = id;
    },
    ADD_CONTENT: function ADD_CONTENT(state, entry) {
      console.log(entry);
      state.content.push(entry);
      console.log(state.content);
    },
    CLEAR: function CLEAR(state) {
      state.id = null;
      state.content = [];
    }
  };
  var upload = {
    namespaced: true,
    state: state$6,
    getters: getters$6,
    actions: actions$6,
    mutations: mutations$6
  };

  /**
   * @constant state
   * @type Object
   * @description State structure
   * @alias module:c3s/project
   * @property {Array} [projects = []]
   * @property {Object} [project = null]
   * @property {Array} [activities = []]
   * @property {Object} [stats = null]
   * @property {Array} [media = []]
   * @property {Array} [comments = []]
   */

  var state$7 = {
    projects: [],
    project: null,
    activities: [],
    stats: null,
    media: [],
    comments: []
  };
  var path$3 = 'c3s.client.apis.Projects';
  /**
   * @constant getters
   * @namespace getters
   */

  var getters$7 = {};
  /**
   * @constant
   * @namespace actions
   */

  var actions$7 = {
    /**
     * Get projects matching a search object
     * Retrieve projects matching query and save into the `projects` array
     * @function
     * @param {Array<Object, number>} Search Array containing a search object (based on JTOS) and an integer for the limit of results
     */
    getProjects: function getProjects(_ref, _ref2) {
      var state = _ref.state,
          commit = _ref.commit,
          dispatch = _ref.dispatch,
          rootState = _ref.rootState;

      var _ref3 = _slicedToArray(_ref2, 2),
          search = _ref3[0],
          limit = _ref3[1];

      search = rison.encode(search);
      var method = '.get_projects';
      return makeRequest(commit, getNested$1(rootState, path$3 + method), {
        search_term: search || undefined,
        limit: limit || 100
      }, undefined, 'c3s/project/SET_PROJECTS');
    },

    /**
     * Get a project matching the provided ID
     * DOES save project to store
     * @param {Array<string, number>} ID An array containing the ID of the project and a boolean of whether you want the tasks and media associated
     */
    getProject: function () {
      var _getProject = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(_ref4, _ref5) {
        var state, commit, dispatch, rootState, _ref6, id, associated, method;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
                _ref6 = _slicedToArray(_ref5, 2), id = _ref6[0], associated = _ref6[1];
                method = '.get_project';

                if (associated) {
                  dispatch('task/getMedia', id, {
                    root: true
                  });
                  dispatch('task/getTasks', [id, 1, 0], {
                    root: true
                  });
                }

                dispatch('getStats', id);
                return _context.abrupt("return", makeRequest(commit, getNested$1(rootState, path$3 + method), {
                  id: id
                }, {}, 'c3s/project/SET_PROJECT'));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getProject(_x, _x2) {
        return _getProject.apply(this, arguments);
      }

      return getProject;
    }(),

    /**
     * Get the activities of a project matching the provided ID
     * DOES save project to store
     * @param {string} ID The ID of the project
     */
    getProjectActivities: function () {
      var _getProjectActivities = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(_ref7, id) {
        var state, commit, dispatch, rootState, method;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                state = _ref7.state, commit = _ref7.commit, dispatch = _ref7.dispatch, rootState = _ref7.rootState;
                // dispatch('getStats', id);
                method = '.get_project_activities';
                return _context2.abrupt("return", makeRequest(commit, getNested$1(rootState, path$3 + method), {
                  id: id
                }, {}, 'c3s/activity/SET_ACTIVITIES'));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getProjectActivities(_x3, _x4) {
        return _getProjectActivities.apply(this, arguments);
      }

      return getProjectActivities;
    }(),

    /**
     * Get count of projects matching search criteria
     * @param {Object} search
     */
    getProjectCount: function () {
      var _getProjectCount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(_ref8, search) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
                search = rison.encode(search);
                return _context3.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Projects.get_project_count, {
                  search_term: search || undefined
                }, {}, undefined));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getProjectCount(_x5, _x6) {
        return _getProjectCount.apply(this, arguments);
      }

      return getProjectCount;
    }(),

    /**
     * Create a project with a provided object.
     * DOES save project to store
     * @param {Object} project
     */
    createProject: function createProject(_ref9, project) {
      var state = _ref9.state,
          commit = _ref9.commit,
          rootState = _ref9.rootState;
      var method = '.create_project';
      return makeRequest(commit, getNested$1(rootState, path$3 + method), {}, project, 'c3s/project/SET_PROJECT');
    },

    /**
     * Delete a project with the provided ID
     * @param {Array<string, boolean>} PID The ID of the project and a boolean on whether to remove the project from the store
     */
    deleteProject: function deleteProject(_ref10, _ref11) {
      var state = _ref10.state,
          commit = _ref10.commit,
          rootState = _ref10.rootState;

      var _ref12 = _slicedToArray(_ref11, 2),
          pid = _ref12[0],
          localRemove = _ref12[1];

      var method = '.delete_project';
      if (localRemove) commit('c3s/project/SET_PROJECT', null);
      return makeRequest(commit, getNested$1(rootState, path$3 + method), {
        id: pid
      }, {}, undefined);
    }
  };
  /**
   * @constant
   * @alias module:c3s/project
   * @namespace mutations
   */

  var mutations$7 = {
    /**
     * Commit array of projects to store
     * @param {Array} ps
     */
    SET_PROJECTS: function SET_PROJECTS(state, ps) {
      state.projects = ps;
    },

    /**
     * Commit project to store
     * @param {Object} p
     */
    SET_PROJECT: function SET_PROJECT(state, p) {
      state.project = p;
    },

    /**
     * Commit project stats to store
     * @param {Object} stats
     */
    SET_STATS: function SET_STATS(state, stats) {
      state.stats = stats;
    },

    /**
     * Commit comments array related to project to store
     * @param {Array} cmts
     */
    SET_COMMENTS: function SET_COMMENTS(state, cmts) {
      state.comments = cmts;
    },

    /**
     * Commit media array related to project to store
     * @param {Array} media
     */
    SET_MEDIA: function SET_MEDIA(state, media) {
      state.media = media;
    }
  };
  /**
   * Project store submodule. Path: c3s.project
   * @name Project
   */

  var project = {
    namespaced: true,
    state: state$7,
    getters: getters$7,
    actions: actions$7,
    mutations: mutations$7
  };

  // shape: [{ id, quantity }]

  var state$8 = {
    comments: [],
    comment: null
  }; // getters

  var getters$8 = {}; // actions

  var actions$8 = {
    /**
     * Retrieve all comments matching the provided query object
     * @param state
     * @param commit
     * @param rootState
     * @param search
     * @returns {Promise<void>}
     */
    getComments: function () {
      var _getComments = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(_ref, search) {
        var state, commit, rootState;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
                search = rison.encode(search);
                return _context.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Comments.get_all, {
                  search_term: search || undefined
                }, {}, 'c3s/comments/SET_COMMENTS'));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getComments(_x, _x2) {
        return _getComments.apply(this, arguments);
      }

      return getComments;
    }(),

    /**
     * Create a comment
     * @param state
     * @param commit
     * @param rootState
     * @param cmt
     */
    createComment: function createComment(_ref2, cmt) {
      var state = _ref2.state,
          commit = _ref2.commit,
          rootState = _ref2.rootState;
      return makeRequest(commit, rootState.c3s.client.apis.Comments.create_comment, {}, cmt, 'c3s/comments/ADD_COMMENT');
    }
  }; // mutations

  var mutations$8 = {
    SET_COMMENTS: function SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    ADD_COMMENT: function ADD_COMMENT(state, comment) {
      state.comments.push(comment);
    }
  };
  var comments = {
    namespaced: true,
    state: state$8,
    getters: getters$8,
    actions: actions$8,
    mutations: mutations$8
  };

  // initial state
  // shape: [{ id, quantity }]
  var state$9 = {
    loading: false,
    error: null,
    errTimeout: 5000
  }; // getters

  var getters$9 = {}; // actions

  var actions$9 = {
    setError: function setError(_ref, err) {
      var state = _ref.state,
          commit = _ref.commit,
          rootState = _ref.rootState;
      console.log(err);
      commit('SET_ERROR', err);
      setTimeout(function () {
        commit('SET_ERROR', null);
      }, state.errTimeout);
    }
  }; // mutations

  var mutations$9 = {
    SET_LOADING: function SET_LOADING(state, l) {
      state.loading = l;
    },
    SET_ERROR: function SET_ERROR(state, e) {
      state.error = e;
    }
  };
  var settings = {
    namespaced: true,
    state: state$9,
    getters: getters$9,
    actions: actions$9,
    mutations: mutations$9
  };



  var C3Store = /*#__PURE__*/Object.freeze({
    api: api,
    user: user,
    activity: activity,
    task: task,
    submission: submission,
    media: media,
    upload: upload,
    project: project,
    comments: comments,
    settings: settings
  });

  /**
   * Loading primary plugin and setting up
   * the install method to link in to Vue instance
   * @module C3SPlugin
   */
  /**
   * Modules array to list
   * the name of the submodule
   * and the file to import
   * @constant modules
   */

  var modules = [{
    name: 'c3s',
    module: api
  }, {
    name: ['c3s', 'user'],
    module: user
  }, {
    name: ['c3s', 'activity'],
    module: activity
  }, {
    name: ['c3s', 'task'],
    module: task
  }, {
    name: ['c3s', 'media'],
    module: media
  }, {
    name: ['c3s', 'submission'],
    module: submission
  }, {
    name: ['c3s', 'comments'],
    module: comments
  }, {
    name: ['c3s', 'project'],
    module: project
  }, {
    name: ['c3s', 'settings'],
    module: settings
  }];
  var C3SPlugin = {
    /**
       * Setup function for the plugin, must provide a store and a Swagger file URL
       * @param {Provided} Vue
       * @method install
       * @param {Object} options Expects the store and Swagger URL
       */
    install: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Swagger(options.apiURL, {
        baseDoc: options.apiURL.replace('openapi.json', ''),
        requestInterceptor: function requestInterceptor(req) {
          if (options.server && req.url.indexOf('openapi.json') === -1) {
            // TODO handle server decision from spec
            req.url = req.url.replace('http://localhost:9000/api/v3/', options.server);
          }

          req.headers['content-type'] = 'application/json';

          if (options.store.state.c3s && options.store.state.c3s.user) {
            var u = options.store.state.c3s.user.currentUser;

            if (u) {
              req.headers['X-API-KEY'] = u.api_key;
            }
          } else {
            console.log('c3s: state not loaded or not found');
          }

          return req;
        }
      }).then(function (client) {
        var store = options.store;
        var apiURL = options.apiURL;

        if (!store || !apiURL) {
          console.error('C3S: Missing store and/or Swagger URL params.');
          return;
        }

        console.log('Loaded from ' + options.apiURL);

        for (var i in modules) {
          var m = modules[i];
          var name = m.name;
          var preserve = true;

          if (Array.isArray(name)) {
            if (store.state.c3s && store.state.c3s[name[1]] === undefined) {
              preserve = false;
            }
          } else {
            if (store.state[name] === undefined) {
              preserve = false;
            }
          }

          store.registerModule(name, m.module, {
            preserveState: preserve
          }); // if (store.state.hasOwnProperty(m['name']) === false) {
          // 	console.error('C3S: C3S vuex module is not correctly initialized. Please check the module name:', m['name']);
          // 	return;
          // }
          // TODO check why store reports this as false when it is created
        }

        store.commit('c3s/SET_API', client);

        var isLoaded = function isLoaded() {
          if (store.c3s !== undefined && store.c3s.client !== null) {
            return true;
          } else {
            return false;
          }
        };

        Vue.prototype.$c3s = {
          store: C3Store,
          loaded: isLoaded
        };
        Vue.c3s = {
          store: C3Store,
          loaded: isLoaded
        };
      })["catch"](function (err) {
        console.error('C3S: URL was not found or an initialisation error occurred');
        console.error(err);
      });
    }
  };

  var index = {
    plugin: C3SPlugin,
    store: C3Store
  };

  return index;

}));
