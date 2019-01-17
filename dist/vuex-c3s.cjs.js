'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var rison = _interopDefault(require('rison-node'));
var Swagger = _interopDefault(require('swagger-client'));

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

function makeRequest(_x, _x2, _x3, _x4) {
  return _makeRequest.apply(this, arguments);
}

function _makeRequest() {
  _makeRequest = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(commit, method, data, commitMsg) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            commit('c3s/settings/SET_LOADING', true, {
              root: true
            });
            _context.next = 4;
            return method(data);

          case 4:
            response = _context.sent;

            if (commitMsg !== undefined) {
              commit(commitMsg, response.body, {
                root: true
              });
            }

            commit('c3s/settings/SET_LOADING', false, {
              root: true
            });
            return _context.abrupt("return", response);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            commit('c3s/settings/SET_ERROR', 'Could not get Tasks', {
              root: true
            });
            commit('c3s/settings/SET_LOADING', false, {
              root: true
            });
            return _context.abrupt("return", _context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));
  return _makeRequest.apply(this, arguments);
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
      var state, commit, dispatch, rootState;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, dispatch = _ref.dispatch, rootState = _ref.rootState;
              return _context.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.login, user, 'c3s/user/SET_CURRENT_USER'));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function login(_x, _x2) {
      return _login.apply(this, arguments);
    };
  }(),

  /**
   * Create anonymouse user and register with backend
   * @returns {Promise<*>}
   */
  generateAnon: function () {
    var _generateAnon = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref2) {
      var state, commit, dispatch, rootState, now, id, pwd, u, response;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, dispatch = _ref2.dispatch, rootState = _ref2.rootState;
              commit('c3s/settings/SET_LOADING', true, {
                root: true
              });
              now = '' + Date.now();
              id = '_anon' + SHA256(now); // TODO add extra details to avoid clash OR delegate to server?

              pwd = '' + SHA256(id);
              u = {
                'username': id,
                'pwd': pwd,
                'confirmed': false,
                info: {
                  'anonymous': true
                }
              };
              response = makeRequest(commit, rootState.c3s.client.apis.Users.create_user, {
                user: u
              }, 'c3s/user/SET_CURRENT_USER');
              commit('SET_ANON', true);
              return _context2.abrupt("return", response);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function generateAnon(_x3) {
      return _generateAnon.apply(this, arguments);
    };
  }(),

  /**
   * Logout user and remove from local store
   */
  logout: function logout(_ref3) {
    var state = _ref3.state,
        commit = _ref3.commit;
    commit('c3s/user/SET_CURRENT_USER', null, {
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
      var state, commit, dispatch, rootState;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
              return _context3.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.reset, {
                email: email
              }, undefined));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function requestReset(_x4, _x5) {
      return _requestReset.apply(this, arguments);
    };
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
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
              return _context4.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.verify_reset, {
                reset: reset
              }, undefined));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function resetPwd(_x6, _x7) {
      return _resetPwd.apply(this, arguments);
    };
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
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit, rootState = _ref6.rootState;
              return _context5.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.create_user, {
                user: user
              }, 'c3s/user/SET_CURRENT_USER'));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function register(_x8, _x9) {
      return _register.apply(this, arguments);
    };
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
              }, 'c3s/user/SET_USER'));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function getUser(_x10, _x11) {
      return _getUser.apply(this, arguments);
    };
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
      var state, commit, rootState, _ref10, id, info;

      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
              _ref10 = _slicedToArray(_ref9, 2), id = _ref10[0], info = _ref10[1];
              return _context7.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.update_user, {
                id: id,
                user: info
              }, 'c3s/user/SET_CURRENT_USER'));

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function updateUser(_x12, _x13) {
      return _updateUser.apply(this, arguments);
    };
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
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              state = _ref11.state, commit = _ref11.commit, rootState = _ref11.rootState;

              if (!(state.currentUser.api_key !== undefined)) {
                _context8.next = 3;
                break;
              }

              return _context8.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.validate, {
                key: state.currentUser.api_key
              }, 'c3s/user/SET_CURRENT_USER'));

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function validate(_x14, _x15) {
      return _validate.apply(this, arguments);
    };
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
  stats: null,
  media: [],
  comments: []
};
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
    return makeRequest(commit, rootState.c3s.client.apis.Activities.get_activities, {
      search_term: search || undefined,
      limit: limit || 100
    }, 'c3s/activity/SET_ACTIVITIES');
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
      var state, commit, dispatch, rootState, _ref6, id, associated;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
              _ref6 = _slicedToArray(_ref5, 2), id = _ref6[0], associated = _ref6[1];

              return _context.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Activities.get_activity, {
                id: id
              }, 'c3s/activity/SET_ACTIVITY'));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getActivity(_x, _x2) {
      return _getActivity.apply(this, arguments);
    };
  }(),

  /**
   * Returns a count for the number of activities matching criteria
   * @param {Object} search Search object the same as one would use in getActivities
   */
  getActivityCount: function () {
    var _getActivityCount = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref7, search) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit, rootState = _ref7.rootState;
              search = rison.encode(search);
              return _context2.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Activities.get_activity_count, {
                search_term: search || undefined
              }, undefined));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function getActivityCount(_x3, _x4) {
      return _getActivityCount.apply(this, arguments);
    };
  }(),
  getStats: function getStats(_ref8, id) {
    var state = _ref8.state,
        commit = _ref8.commit,
        rootState = _ref8.rootState;
    return makeRequest(commit, rootState.c3s.client.apis.Activities.activity_stats, {
      id: id
    }, 'c3s/activity/SET_STATS');
  },

  /**
   * Create an activity
   * @param {Object} activity
   * @returns {Promise<*|boolean|void>}
   */
  createActivity: function createActivity(_ref9, activity) {
    var state = _ref9.state,
        commit = _ref9.commit,
        rootState = _ref9.rootState;
    return makeRequest(commit, rootState.c3s.client.apis.Activities.create_activity, {
      activity: activity
    }, 'c3s/activity/SET_ACTIVITY');
  },

  /**
   * Delete an activity matching the supplied ID
   * @param {Array<string, boolean>} ID An array containing the ID of the activity and a boolean to determine whether or not to remove from the store also
   * @returns {Promise<*|boolean|void>}
   */
  deleteActivity: function deleteActivity(_ref10, _ref11) {
    var state = _ref10.state,
        commit = _ref10.commit,
        rootState = _ref10.rootState;

    var _ref12 = _slicedToArray(_ref11, 2),
        pid = _ref12[0],
        localRemove = _ref12[1];

    if (localRemove) commit('c3s/activity/SET_ACTIVITY', null);
    return makeRequest(commit, rootState.c3s.client.apis.Activities.delete_activity, {
      id: pid
    }, undefined);
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
  comments: []
};
/** getters
 * @namespace getters
 */

var getters$3 = {// https://vuex.vuejs.org/guide/getters.html#method-style-access
  // allTasks: state => state.tasks.concat(state.clientTasks)
};
/**
 * actions
 * @alias module:c3s/task
 * @namespace actions
 */

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
      var state, commit, rootState, _ref3, search, limit;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
              _ref3 = _slicedToArray(_ref2, 2), search = _ref3[0], limit = _ref3[1];
              search = rison.encode(search);
              return _context.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Tasks.get_tasks, {
                search_term: search || undefined,
                limit: limit || 100
              }, 'c3s/task/SET_TASKS'));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getTasks(_x, _x2) {
      return _getTasks.apply(this, arguments);
    };
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
              }, undefined));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function getTaskCount(_x3, _x4) {
      return _getTaskCount.apply(this, arguments);
    };
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
              }, 'c3s/task/SET_MEDIA'));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function getTaskMedia(_x5, _x6) {
      return _getTaskMedia.apply(this, arguments);
    };
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
              }, 'c3s/task/SET_TASK'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function getTask(_x7, _x8) {
      return _getTask.apply(this, arguments);
    };
  }(),

  /**
   * @description Create an array of tasks
   * @param {Array<Object>} tasks Array of tasks to be created
   */
  createTasks: function () {
    var _createTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee5(_ref7, tasks) {
      var state, commit, dispatch, rootState, res;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit, dispatch = _ref7.dispatch, rootState = _ref7.rootState;
              res = makeRequest(commit, rootState.c3s.client.apis.Tasks.create_tasks, {
                tasks: tasks
              }, undefined);
              dispatch('c3s/upload/addID', res[0].id, {
                root: true
              });
              return _context5.abrupt("return", res);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function createTasks(_x9, _x10) {
      return _createTasks.apply(this, arguments);
    };
  }(),

  /**
   * Deletes an array of tasks
   * @param {Array<Object>} tasks Tasks to be deleted, ID is required as a key here
   */
  deleteTasks: function deleteTasks(_ref8, tasks) {
    var state = _ref8.state,
        commit = _ref8.commit,
        dispatch = _ref8.dispatch,
        rootState = _ref8.rootState;
    dispatch('SET_TASKS', null);
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.delete_tasks, {
      tasks: tasks
    }, 'c3s/task/SET_TASKS');
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
              }, 'c3s/submission/SET_SUBMISSIONS'));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getSubmissions(_x, _x2) {
      return _getSubmissions.apply(this, arguments);
    };
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
              }, undefined));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function getSubmissionCount(_x3, _x4) {
      return _getSubmissionCount.apply(this, arguments);
    };
  }(),

  /**
   * Create a submission
   * @returns {Promise<*|boolean|void>}
   */
  createSubmission: function () {
    var _createSubmission = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3(_ref5) {
      var state, commit, rootState, dispatch;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState, dispatch = _ref5.dispatch;
              return _context3.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.create_submission, {
                submission: state.submission
              }, 'c3s/submission/SET_SUBMISSION'));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function createSubmission(_x5) {
      return _createSubmission.apply(this, arguments);
    };
  }(),

  /**
   * Update a submission based on the ID
   * @param {Object} submission
   * @returns {Promise<*|boolean|void>}
   */
  updateSubmission: function () {
    var _updateSubmission = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4(_ref6, submission) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit, rootState = _ref6.rootState;
              return _context4.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.update_submission, {
                id: submission.id,
                submission: submission
              }, 'submission/c3s/SET_SUBMISSION'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function updateSubmission(_x6, _x7) {
      return _updateSubmission.apply(this, arguments);
    };
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
          'source_id': id || state.id
        }
      }).then(function (req) {
        console.log(req);
        commit('c3s/settings/SET_LOADING', false, {
          root: true
        });

        if (i === state.content.length - 1) {
          commit('CLEAR');
        }
      }).catch(function (e) {
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
 * @property {Object} [stats = null]
 * @property {Array} [media = []]
 * @property {Array} [comments = []]
 */

var state$7 = {
  projects: [],
  project: null,
  stats: null,
  media: [],
  comments: []
};
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
    return makeRequest(commit, rootState.c3s.client.apis.Projects.get_projects, {
      search_term: search || undefined,
      limit: limit || 100
    }, 'c3s/project/SET_PROJECTS');
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
      var state, commit, dispatch, rootState, _ref6, id, associated;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
              _ref6 = _slicedToArray(_ref5, 2), id = _ref6[0], associated = _ref6[1];

              if (associated) {
                dispatch('task/getMedia', id, {
                  root: true
                });
                dispatch('task/getTasks', [id, 1, 0], {
                  root: true
                });
              }

              dispatch('getStats', id);
              return _context.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Projects.get_project, {
                id: id
              }, 'c3s/project/SET_PROJECT'));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getProject(_x, _x2) {
      return _getProject.apply(this, arguments);
    };
  }(),

  /**
   * Get count of projects matching search criteria
   * @param {Object} search 
   */
  getProjectCount: function () {
    var _getProjectCount = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref7, search) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit, rootState = _ref7.rootState;
              search = rison.encode(search);
              return _context2.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Projects.get_project_count, {
                search_term: search || undefined
              }, undefined));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function getProjectCount(_x3, _x4) {
      return _getProjectCount.apply(this, arguments);
    };
  }(),

  /**
   * Create a project with a provided object. 
   * DOES save project to store
   * @param {Object} project 
   */
  createProject: function createProject(_ref8, project) {
    var state = _ref8.state,
        commit = _ref8.commit,
        rootState = _ref8.rootState;
    return makeRequest(commit, rootState.c3s.client.apis.Projects.create_project, {
      project: project
    }, 'c3s/project/SET_PROJECT');
  },

  /**
   * Delete a project with the provided ID
   * @param {Array<string, boolean>} PID The ID of the project and a boolean on whether to remove the project from the store
   */
  deleteProject: function deleteProject(_ref9, _ref10) {
    var state = _ref9.state,
        commit = _ref9.commit,
        rootState = _ref9.rootState;

    var _ref11 = _slicedToArray(_ref10, 2),
        pid = _ref11[0],
        localRemove = _ref11[1];

    if (localRemove) commit('c3s/project/SET_PROJECT', null);
    return makeRequest(commit, rootState.c3s.client.apis.Projects.delete_project, {
      id: pid
    }, undefined);
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
              }, 'c3s/comments/SET_COMMENTS'));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getComments(_x, _x2) {
      return _getComments.apply(this, arguments);
    };
  }(),
  getCommentsForID: function () {
    var _getCommentsForID = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref2, _ref3) {
      var state, commit, rootState, _ref4, id, commitMsg, limit, cmtQuery, search;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, rootState = _ref2.rootState;
              _ref4 = _slicedToArray(_ref3, 3), id = _ref4[0], commitMsg = _ref4[1], limit = _ref4[2];
              cmtQuery = {
                "select": {
                  "fields": ["*"],
                  "orderBy": {
                    "created_at": "desc"
                  },
                  "tables": ["comments"]
                },
                "where": [{
                  "fields": "source_id",
                  "op": "e",
                  "val": id
                }]
              };
              search = rison.encode(cmtQuery);
              return _context2.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Comments.get_comments, {
                search_term: search || undefined,
                limit: limit || 100
              }, commitMsg));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function getCommentsForID(_x3, _x4) {
      return _getCommentsForID.apply(this, arguments);
    };
  }(),

  /**
   * Create a comment
   * @param state
   * @param commit
   * @param rootState
   * @param cmt
   */
  createComment: function createComment(_ref5, cmt) {
    var state = _ref5.state,
        commit = _ref5.commit,
        rootState = _ref5.rootState;
    return makeRequest(commit, rootState.c3s.client.apis.Comments.create_comment, {
      comment: cmt
    }, 'c3s/comments/ADD_COMMENT');
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

// shape: [{ id, quantity }]

var state$9 = {
  loading: false,
  error: null,
  errTimeout: 5000
}; // getters

var getters$9 = {}; //actions

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



var C3SStore = /*#__PURE__*/Object.freeze({
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
    Swagger({
      url: options.swaggerURL,
      requestInterceptor: function requestInterceptor(req) {
        // req.headers['content-type'] = 'application/json'
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
      var swaggerURL = options.swaggerURL;

      if (!store || !swaggerURL) {
        console.error('C3S: Missing store and/or Swagger URL params.');
        return;
      }

      console.log('Loaded from ' + options.swaggerURL);

      for (var i in modules) {
        var m = modules[i];
        var name = m['name'];
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

        store.registerModule(name, m['module'], {
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
        store: C3SStore,
        loaded: isLoaded
      };
      Vue.c3s = {
        store: C3SStore,
        loaded: isLoaded
      };
    }).catch(function (err) {
      console.error('C3S: URL was not found or an initialisation error occurred');
      console.error(err);
    });
  }
};

var index = {
  plugin: C3SPlugin,
  store: C3SStore
};

module.exports = index;
