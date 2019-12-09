'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var rison = _interopDefault(require('rison-node'));
require('vuex');
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

            if (data !== undefined) {
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
            commit('c3s/settings/SET_ERROR', _context.t0, {
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

function getNested(obj, path) {
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
  projects: [],
  submissions: [],
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
 * @namespace actions
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
      var state, commit, dispatch, rootState, method, res;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, dispatch = _ref.dispatch, rootState = _ref.rootState;
              method = '.login';
              res = makeRequest(commit, getNested(rootState, path + method), undefined, user, 'c3s/user/SET_CURRENT_USER');
              commit('SET_ANON', false);
              return _context.abrupt("return", res);

            case 5:
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
   * Check if the username already exists
   * @param {string} user Username
   * @returns {Promise<*>}
   */
  checkUsername: function () {
    var _checkUsername = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref2, user) {
      var state, commit, dispatch, rootState, method;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, dispatch = _ref2.dispatch, rootState = _ref2.rootState;
              method = '.check_user';
              return _context2.abrupt("return", makeRequest(commit, getNested(rootState, path + method), {
                username: user
              }, undefined, undefined));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function checkUsername(_x3, _x4) {
      return _checkUsername.apply(this, arguments);
    }

    return checkUsername;
  }(),

  /**
   * Check if the email already exists
   * @param {string} user Email
   * @returns {Promise<*>}
   */
  checkUseremail: function () {
    var _checkUseremail = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3(_ref3, user) {
      var state, commit, dispatch, rootState, method;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref3.state, commit = _ref3.commit, dispatch = _ref3.dispatch, rootState = _ref3.rootState;
              method = '.check_user';
              return _context3.abrupt("return", makeRequest(commit, getNested(rootState, path + method), {
                email: user
              }, undefined, undefined));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function checkUseremail(_x5, _x6) {
      return _checkUseremail.apply(this, arguments);
    }

    return checkUseremail;
  }(),

  /**
   * Create anonymouse user and register
   * @returns {Promise<*>}
   */
  generateAnon: function () {
    var _generateAnon = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4(_ref4) {
      var state, commit, dispatch, rootState, method, now, id, pwd, u, response;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
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
              response = makeRequest(commit, getNested(rootState, path + method), undefined, u, 'c3s/user/SET_CURRENT_USER');
              commit('SET_ANON', true);
              return _context4.abrupt("return", response);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function generateAnon(_x7) {
      return _generateAnon.apply(this, arguments);
    }

    return generateAnon;
  }(),

  /**
   * Logout user and remove from local store
   */
  logout: function logout(_ref5) {
    var state = _ref5.state,
        commit = _ref5.commit;
    commit('SET_CURRENT_USER', null);
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
    _regeneratorRuntime.mark(function _callee5(_ref6, email) {
      var state, commit, dispatch, rootState, method;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit, dispatch = _ref6.dispatch, rootState = _ref6.rootState;
              method = '.reset';
              return _context5.abrupt("return", makeRequest(commit, getNested(rootState, path + method), undefined, {
                email: email
              }, undefined));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function requestReset(_x8, _x9) {
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
    _regeneratorRuntime.mark(function _callee6(_ref7, reset) {
      var state, commit, rootState, method;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit, rootState = _ref7.rootState;
              method = '.verify_rest';
              return _context6.abrupt("return", makeRequest(commit, getNested(rootState, path + method), undefined, {
                reset: reset
              }, undefined));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function resetPwd(_x10, _x11) {
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
    _regeneratorRuntime.mark(function _callee7(_ref8, user) {
      var state, commit, rootState, method, response;
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
              method = '.create_user';
              response = makeRequest(commit, getNested(rootState, path + method), undefined, user, 'c3s/user/SET_CURRENT_USER');
              commit('SET_ANON', false);
              return _context7.abrupt("return", response);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function register(_x12, _x13) {
      return _register.apply(this, arguments);
    }

    return register;
  }(),

  /**
   * Retrieve user information for currently logged in
   * @param {String} id
   * @returns {Promise<*|boolean|void>}
   */
  getUser: function () {
    var _getUser = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee8(_ref9) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              state = _ref9.state, commit = _ref9.commit, rootState = _ref9.rootState;
              return _context8.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.get_one, undefined, undefined, 'c3s/user/SET_USER'));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function getUser(_x14) {
      return _getUser.apply(this, arguments);
    }

    return getUser;
  }(),
  getUserProjects: function () {
    var _getUserProjects = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee9(_ref10) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              state = _ref10.state, commit = _ref10.commit, rootState = _ref10.rootState;
              return _context9.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.get_user_projects, undefined, undefined, 'c3s/user/SET_PROJECTS'));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function getUserProjects(_x15) {
      return _getUserProjects.apply(this, arguments);
    }

    return getUserProjects;
  }(),
  getUserSubmissions: function () {
    var _getUserSubmissions = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee10(_ref11) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              state = _ref11.state, commit = _ref11.commit, rootState = _ref11.rootState;
              return _context10.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.get_user_submissions, undefined, undefined, 'c3s/user/SET_SUBMISSIONS'));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    function getUserSubmissions(_x16) {
      return _getUserSubmissions.apply(this, arguments);
    }

    return getUserSubmissions;
  }(),

  /**
   * Update user based on ID
   * @param user object
   * @returns {Promise<*|boolean|void>}
   */
  updateUser: function () {
    var _updateUser = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee11(_ref12, info) {
      var state, commit, rootState, method;
      return _regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              state = _ref12.state, commit = _ref12.commit, rootState = _ref12.rootState;
              method = '.update_user';
              return _context11.abrupt("return", makeRequest(commit, getNested(rootState, path + method), undefined, {
                requestBody: info
              }, 'c3s/user/SET_CURRENT_USER'));

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    function updateUser(_x17, _x18) {
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
    _regeneratorRuntime.mark(function _callee12(_ref13, id) {
      var state, commit, rootState, method;
      return _regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              state = _ref13.state, commit = _ref13.commit, rootState = _ref13.rootState;
              method = '.validate';

              if (!(state.currentUser.api_key !== undefined)) {
                _context12.next = 4;
                break;
              }

              return _context12.abrupt("return", makeRequest(commit, getNested(rootState, path + method), {
                key: state.currentUser.api_key
              }, undefined, 'c3s/user/SET_CURRENT_USER'));

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    function validate(_x19, _x20) {
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
  },
  SET_PROJECTS: function SET_PROJECTS(state, projects) {
    state.projects = projects;
  },
  SET_SUBMISSIONS: function SET_SUBMISSIONS(state, subs) {
    state.submissions = subs;
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

/** @module c3s/task */

/**
 * state
 * @property {Array} tasks
 * @property {Object} task
 * @property {Array} media
 * @property {Array} comments
 */

var state$2 = {
  tasks: [],
  task: null,
  media: [],
  comments: [],
  stats: {}
};
var path$1 = 'c3s.client.apis.Tasks';
/** getters
 * @namespace getters
 */

var getters$2 = {} // https://vuex.vuejs.org/guide/getters.html#method-style-access
// allTasks: state => state.tasks.concat(state.clientTasks)

/**
 * actions
 * @alias module:c3s/task
 * @namespace actions
 */
;
var actions$2 = {
  /**
   * Retrieve an array of tasks
   * @param {Array<Object, number>} Search An array containing a search object and a limit integer
   *
   */
  getTasks: function () {
    var _getTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref, _ref2) {
      var state, commit, rootState, _ref3, search, limit, offset, method;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
              _ref3 = _slicedToArray(_ref2, 3), search = _ref3[0], limit = _ref3[1], offset = _ref3[2];
              method = '.get_tasks';
              search = rison.encode(search);
              return _context.abrupt("return", makeRequest(commit, getNested(rootState, path$1 + method), {
                search_term: search || undefined,
                limit: limit || 100,
                offset: offset || 0
              }, undefined, 'c3s/task/SET_TASKS'));

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
              }, undefined, undefined));

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
    _regeneratorRuntime.mark(function _callee3(_ref5, tid) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
              return _context3.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Tasks.get_task_media, {
                tid: tid
              }, undefined, 'c3s/task/SET_MEDIA'));

            case 2:
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
                tid: id
              }, undefined, 'c3s/task/SET_TASK'));

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
                tid: id
              }, undefined, 'c3s/task/SET_TASK_COMMENTS'));

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
              return _context6.abrupt("return", makeRequest(commit, getNested(rootState, path$1 + method), {
                tid: id
              }, undefined, 'c3s/task/SET_TASK_STATS'));

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
  getProjectTask: function () {
    var _getProjectTask = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee7(_ref9, id) {
      var state, commit, dispatch, rootState, method;
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              state = _ref9.state, commit = _ref9.commit, dispatch = _ref9.dispatch, rootState = _ref9.rootState;
              method = '.get_random_project_task';
              return _context7.abrupt("return", makeRequest(commit, getNested(rootState, path$1 + method), {
                pid: id
              }, undefined, 'c3s/project/SET_PROJECT_TASK'));

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function getProjectTask(_x13, _x14) {
      return _getProjectTask.apply(this, arguments);
    }

    return getProjectTask;
  }(),
  importCSV: function () {
    var _importCSV = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee8(_ref10, _ref11) {
      var state, commit, dispatch, rootState, _ref12, pid, csv, reimport, method;

      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              state = _ref10.state, commit = _ref10.commit, dispatch = _ref10.dispatch, rootState = _ref10.rootState;
              _ref12 = _slicedToArray(_ref11, 3), pid = _ref12[0], csv = _ref12[1], reimport = _ref12[2];
              method = rootState.c3s.client.apis.Projects.import_tasks_csv;

              if (reimport === undefined) {
                reimport = false;
              }

              if (reimport === true) {
                method = rootState.c3s.client.apis.Projects.reimport_tasks_csv;
              }

              return _context8.abrupt("return", makeRequest(commit, method, {
                pid: pid
              }, csv, undefined));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function importCSV(_x15, _x16) {
      return _importCSV.apply(this, arguments);
    }

    return importCSV;
  }(),

  /**
   * @description Create an array of tasks
   * @param {Array<Object>} tasks Array of tasks to be created
   */
  createTasks: function () {
    var _createTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee9(_ref13, tasks) {
      var state, commit, dispatch, rootState, res;
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              state = _ref13.state, commit = _ref13.commit, dispatch = _ref13.dispatch, rootState = _ref13.rootState;
              res = makeRequest(commit, rootState.c3s.client.apis.Tasks.create_tasks, {}, tasks, undefined);
              return _context9.abrupt("return", res);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function createTasks(_x17, _x18) {
      return _createTasks.apply(this, arguments);
    }

    return createTasks;
  }(),

  /**
   * Deletes an array of tasks
   * @param {Array<Object>} tasks Tasks to be deleted, ID is required as a key here
   */
  deleteTasks: function deleteTasks(_ref14, tasks) {
    var state = _ref14.state,
        commit = _ref14.commit,
        dispatch = _ref14.dispatch,
        rootState = _ref14.rootState;
    dispatch('SET_TASKS', null);
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.delete_tasks, undefined, tasks, 'c3s/task/SET_TASKS');
  },

  /**
   * Deletes a single task
   * @param {int} id Task ID to delete
   */
  deleteTask: function deleteTask(_ref15, id) {
    var state = _ref15.state,
        commit = _ref15.commit,
        dispatch = _ref15.dispatch,
        rootState = _ref15.rootState;
    return makeRequest(commit, rootState.c3s.client.apis.Tasks.delete_tasks, {
      tid: id
    }, tasks, 'c3s/task/SET_TASKS');
  }
};
/** mutations
 * @namespace mutations
 */

var mutations$2 = {
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
  state: state$2,
  getters: getters$2,
  actions: actions$2,
  mutations: mutations$2
};

/**
 * @module c3s/member
 */
/**
 *
 */

var state$3 = {
  members: [],
  member: undefined
};
/**
 * @namespace getters
 */

var getters$3 = {};
/**
 * @namespace actions
 */

var actions$3 = {};
/**
 * @namespace mutations
 */

var mutations$3 = {};
/**
 * @name c3s/media
 */

var member = {
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
      var state, commit, rootState, _ref3, search, limit, offset;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
              _ref3 = _slicedToArray(_ref2, 3), search = _ref3[0], limit = _ref3[1], offset = _ref3[2];
              search = rison.encode(search);
              return _context.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.get_submissions, {
                search_term: search || undefined,
                limit: limit || 100,
                offset: offset || 0
              }, undefined, 'c3s/submission/SET_SUBMISSIONS'));

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
              }, undefined, undefined));

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
                uid: rootState.c3s.client.apis.Users.current_user.id
              }, undefined, 'c3s/submission/SET_SUBMISSIONS'));

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
              return _context4.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.create_submission, undefined, state.submission, 'c3s/submission/SET_SUBMISSION'));

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
  createSubmissionWithObject: function () {
    var _createSubmissionWithObject = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee5(_ref7, payload) {
      var state, commit, rootState, dispatch;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref7.state, commit = _ref7.commit, rootState = _ref7.rootState, dispatch = _ref7.dispatch;
              return _context5.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.create_submission, undefined, payload, 'c3s/submission/SET_SUBMISSION'));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function createSubmissionWithObject(_x7, _x8) {
      return _createSubmissionWithObject.apply(this, arguments);
    }

    return createSubmissionWithObject;
  }(),

  /**
   * Update a submission based on the ID
   * @param {Object} submission
   * @returns {Promise<*|boolean|void>}
   */
  updateSubmission: function () {
    var _updateSubmission = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee6(_ref8, submission) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
              return _context6.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Submissions.update_submission, {
                sid: submission.id
              }, submission, 'submission/c3s/SET_SUBMISSION'));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function updateSubmission(_x9, _x10) {
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

    var _ref3 = _slicedToArray(_ref2, 4),
        search = _ref3[0],
        commitMsg = _ref3[1],
        limit = _ref3[2],
        offset = _ref3[3];

    search = rison.encode(search);
    return makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {
      search_term: search || undefined,
      limit: limit || 100,
      offset: offset || 0
    }, undefined, commitMsg);
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
      mid: id
    }, undefined, undefined);
  },

  /**
   * Upload a file
   * @param {FormData} medium File to upload
   */
  upload: function upload(_ref5, _ref6) {
    var state = _ref5.state,
        commit = _ref5.commit,
        rootState = _ref5.rootState;

    var _ref7 = _slicedToArray(_ref6, 2),
        url = _ref7[0],
        file = _ref7[1];

    return window.fetch(url, {
      method: 'PUT',
      body: file
    });
  },
  createMedium: function createMedium(_ref8, medium) {
    var state = _ref8.state,
        commit = _ref8.commit,
        rootState = _ref8.rootState;
    return makeRequest(commit, rootState.c3s.client.apis.Media.create_medium, undefined, medium, undefined);
  },
  getPresigned: function getPresigned(_ref9, _ref10) {
    var state = _ref9.state,
        commit = _ref9.commit,
        rootState = _ref9.rootState;

    var _ref11 = _slicedToArray(_ref10, 2),
        sourceID = _ref11[0],
        filename = _ref11[1];

    return makeRequest(commit, rootState.c3s.client.apis.Media.get_pre_signed_url, {
      source_id: sourceID,
      filename: filename
    }, undefined, undefined);
  },
  uploadMedia: function uploadMedia(_ref12, _ref13) {
    var state = _ref12.state,
        commit = _ref12.commit,
        dispatch = _ref12.dispatch,
        rootState = _ref12.rootState;

    var _ref14 = _slicedToArray(_ref13, 3),
        sourceID = _ref14[0],
        key = _ref14[1],
        meta = _ref14[2];

    return dispatch('getPresigned', ['builder', sourceID + '/' + meta.name]).then(function (resp) {
      if (resp) {
        var url = resp.body.data;
        return dispatch('upload', [url, meta]).then(function (res) {
          if (res) {
            var medium = {
              source_id: sourceID,
              name: meta.name,
              filetype: meta.type,
              path: 'https://objects.citizenscience.ch/builder/' + sourceID + '/' + meta.name
            };

            if (key) {
              medium[key] = sourceID;
            }

            return dispatch('createMedium', medium).then(function (medium) {
              return medium;
            })["catch"](function (err) {
              console.error(err);
            });
          }
        });
      }
    });
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
  addID: function addID(_ref, _ref2) {
    var state = _ref.state,
        commit = _ref.commit,
        rootState = _ref.rootState;

    var _ref3 = _slicedToArray(_ref2, 2),
        id = _ref3[0],
        path = _ref3[1];

    commit('SET_ID', id);
    console.log('updating');
    console.log(id);

    var _loop = function _loop(i) {
      commit('c3s/settings/SET_LOADING', true, {
        root: true
      });
      console.log(state.content[i]);
      rootState.c3s.client.apis.Media.put_medium({
        id: state.content[i]
      }, {
        media: {
          id: state.content[i],
          source_id: id || state.id,
          path: path
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
 * @constant
 * @property {Array} [projects=[]]
 * @property {Object} [project=null]
 * @property {Object} [stats=null]
 * @property {Array} [media=[]]
 * @property {Array} [comments=[]]
 */

var state$7 = {
  projects: [],
  project: null,
  tasks: [],
  task: null,
  stats: null,
  media: [],
  comments: []
};
var path$2 = 'c3s.client.apis.Projects';
/**
 * @type Object
 * @constant
 */

var getters$7 = {};
/**
 *  actions
  * @constant
	@type {object}
    @namespace actions
*/

var actions$7 = {
  /**
   * Retrieve an array of projects based on a provided query object
   * @param {Array<Object, number>} search An array containing the search object and the limit for the number of results to return
   */
  getProjects: function getProjects(_ref, _ref2) {
    var state = _ref.state,
        commit = _ref.commit,
        dispatch = _ref.dispatch,
        rootState = _ref.rootState;

    var _ref3 = _slicedToArray(_ref2, 3),
        search = _ref3[0],
        limit = _ref3[1],
        offset = _ref3[2];

    if (search !== undefined) {
      search = rison.encode(search);
    }

    var method = '.get_projects';
    return makeRequest(commit, getNested(rootState, path$2 + method), {
      search_term: search || undefined,
      offset: offset || 10,
      limit: limit || 100
    }, undefined, 'c3s/project/SET_PROJECTS');
  },

  /**
   * Retrieve a single project based on the ID
   * @param {Array<string, boolean>} ID An array containing the ID of the project and a boolean to determine whether or not to retrieve the media and comments also
   * @returns {Promise<*|boolean|void>}
   */
  getProject: function () {
    var _getProject = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref4, id) {
      var state, commit, dispatch, rootState, method;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
              method = '.get_project';
              return _context.abrupt("return", makeRequest(commit, getNested(rootState, path$2 + method), {
                pid: id
              }, undefined, 'c3s/project/SET_PROJECT'));

            case 3:
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
  getProjectMedia: function () {
    var _getProjectMedia = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref5, id) {
      var state, commit, dispatch, rootState, method;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, dispatch = _ref5.dispatch, rootState = _ref5.rootState;
              method = '.get_project_media';
              return _context2.abrupt("return", makeRequest(commit, getNested(rootState, path$2 + method), {
                pid: id
              }, undefined, 'c3s/project/SET_PROJECT_MEDIA'));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getProjectMedia(_x3, _x4) {
      return _getProjectMedia.apply(this, arguments);
    }

    return getProjectMedia;
  }(),
  getProjectTask: function () {
    var _getProjectTask = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3(_ref6, _ref7) {
      var state, commit, dispatch, rootState, pid, random, index, payload, method;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit, dispatch = _ref6.dispatch, rootState = _ref6.rootState;
              pid = _ref7.pid, random = _ref7.random, index = _ref7.index;
              console.log(pid, random, index);
              payload = {
                pid: pid
              };

              if (index > -1) {
                payload.index = index;
              } else {
                payload.random = true;
              }

              method = '.get_project_task';
              return _context3.abrupt("return", makeRequest(commit, getNested(rootState, path$2 + method), payload, undefined, 'c3s/project/SET_PROJECT_TASK'));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getProjectTask(_x5, _x6) {
      return _getProjectTask.apply(this, arguments);
    }

    return getProjectTask;
  }(),
  getProjectTasks: function () {
    var _getProjectTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4(_ref8, id) {
      var state, commit, dispatch, rootState, method;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref8.state, commit = _ref8.commit, dispatch = _ref8.dispatch, rootState = _ref8.rootState;
              method = '.get_project_tasks';
              return _context4.abrupt("return", makeRequest(commit, getNested(rootState, path$2 + method), {
                pid: id
              }, undefined, 'c3s/project/SET_PROJECT_TASKS'));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function getProjectTasks(_x7, _x8) {
      return _getProjectTasks.apply(this, arguments);
    }

    return getProjectTasks;
  }(),
  getStats: function () {
    var _getStats = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee5(_ref9, id) {
      var state, commit, rootState, method;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref9.state, commit = _ref9.commit, rootState = _ref9.rootState;
              method = '.get_stats';
              return _context5.abrupt("return", makeRequest(commit, getNested(rootState, path$2 + method), {
                pid: id
              }, undefined, 'c3s/project/SET_STATS'));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function getStats(_x9, _x10) {
      return _getStats.apply(this, arguments);
    }

    return getStats;
  }(),

  /**
   * Create a project
   * @param {Object} project
   * @returns {Promise<*|boolean|void>}
   */
  createProject: function createProject(_ref10, project) {
    var state = _ref10.state,
        commit = _ref10.commit,
        rootState = _ref10.rootState;
    var method = '.create_project';
    return makeRequest(commit, getNested(rootState, path$2 + method), undefined, project, 'c3s/project/SET_PROJECT');
  },

  /**
   * Update a project
   * @param {Array<string, boolean>} Array containing the ID and object of the project to be modified
   * @returns {Promise<*|boolean|void>}
   */
  updateProject: function updateProject(_ref11, _ref12) {
    var state = _ref11.state,
        commit = _ref11.commit,
        rootState = _ref11.rootState;

    var _ref13 = _slicedToArray(_ref12, 2),
        id = _ref13[0],
        project = _ref13[1];

    var method = '.update_project';
    return makeRequest(commit, getNested(rootState, path$2 + method), {
      pid: id
    }, project, 'c3s/project/SET_PROJECT');
  },

  /**
   * Delete a project matching the supplied ID
   * @param {Array<string, boolean>} ID An array containing the ID of the project and a boolean to determine whether or not to remove from the store also
   * @returns {Promise<*|boolean|void>}
   */
  deleteProject: function deleteProject(_ref14, _ref15) {
    var state = _ref14.state,
        commit = _ref14.commit,
        rootState = _ref14.rootState;

    var _ref16 = _slicedToArray(_ref15, 2),
        id = _ref16[0],
        localRemove = _ref16[1];

    var method = '.delete_project';
    if (localRemove) commit('c3s/project/SET_PROJECT', null);
    return makeRequest(commit, getNested(rootState, path$2 + method), {
      pid: id
    }, undefined, undefined);
  }
};
/**
 * @constant mutations All mutations one can commit to the project submodule
 * @type {object}
 * @namespace mutations
 */

var mutations$7 = {
  /**
   * Sets the projects in the store
   * @param {Array} acts
   */
  SET_PROJECTS: function SET_PROJECTS(state, acts) {
    state.projects = acts;
  },

  /**
   * Sets a single project
   * @param {Object} act
   */
  SET_PROJECT: function SET_PROJECT(state, act) {
    state.project = act;
  },

  /**
   * Set statistics for a project
   * @param {Object} stats
   */
  SET_STATS: function SET_STATS(state, stats) {
    state.stats = stats;
  },

  /**
   * Set comments for a project
   * @param {Arrya} cmts
   */
  SET_COMMENTS: function SET_COMMENTS(state, cmts) {
    state.comments = cmts;
  },
  SET_PROJECT_TASKS: function SET_PROJECT_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  SET_PROJECT_TASK: function SET_PROJECT_TASK(state, task) {
    state.task = task;
  },

  /**
   * Set media for a project
   * @param {Array} media
   */
  SET_PROJECT_MEDIA: function SET_PROJECT_MEDIA(state, media) {
    state.media = media;
  }
};
/**
 * A module for linking projects to the API
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
    _regeneratorRuntime.mark(function _callee(_ref, _ref2) {
      var state, commit, rootState, _ref3, search, limit, offset;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
              _ref3 = _slicedToArray(_ref2, 3), search = _ref3[0], limit = _ref3[1], offset = _ref3[2];
              search = rison.encode(search);
              return _context.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Comments.get_all, {
                search_term: search || undefined,
                limit: limit || 100,
                offset: offset || 0
              }, undefined, 'c3s/comments/SET_COMMENTS'));

            case 4:
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
  createComment: function createComment(_ref4, cmt) {
    var state = _ref4.state,
        commit = _ref4.commit,
        rootState = _ref4.rootState;
    return makeRequest(commit, rootState.c3s.client.apis.Comments.create_comment, undefined, cmt, 'c3s/comments/ADD_COMMENT');
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
  task: task,
  member: member,
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
  name: ['c3s', 'member'],
  module: member
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
        });
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

module.exports = index;
