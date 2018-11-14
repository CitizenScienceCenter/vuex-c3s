'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var Swagger = _interopDefault(require('swagger-client'));

// initial state
// shape: [{ id, quantity }]
var state = {
  client: null,
  host: undefined
}; // getters

var getters = {}; // actions

var actions = {
  setClient: function setClient(_ref, client) {
    var commit = _ref.commit;
    commit('SET_API', client);
  }
}; // mutations

var mutations = {
  SET_API: function SET_API(state, client) {
    state.client = client;
  },
  SET_HOST: function SET_HOST(state, h) {
    state.host = h;
  }
};
var api = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

var SHA256 = require('crypto-js/sha256'); // initial state
// shape: [{ id, quantity }]


var state$1 = {
  user: null,
  currentUser: null
}; // getters

var getters$1 = {}; // actions

var actions$1 = {
  /**
   * Login user
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param user
   * @returns {Promise<*|boolean|void>}
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
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @returns {Promise<*>}
   */
  generateAnon: function () {
    var _generateAnon = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref2) {
      var state, commit, dispatch, rootState, now, id, pwd, u;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, dispatch = _ref2.dispatch, rootState = _ref2.rootState;
              commit('c3s/settings/SET_LOADING', true, {
                root: true
              });
              now = '' + Date.now();
              id = 'anon' + SHA256(now);
              pwd = '' + SHA256(id);
              _context2.next = 7;
              return dispatch('register', {
                'username': id,
                'pwd': pwd
              });

            case 7:
              u = _context2.sent;
              return _context2.abrupt("return", u);

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
   * @param state
   * @param commit
   */
  logout: function logout(_ref3) {
    var state = _ref3.state,
        commit = _ref3.commit;
    commit('c3s/user/SET_CURRENT_USER', null, {
      root: true
    });
  },

  /**
   * Request to reset password
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param email
   * @returns {Promise<*|boolean|void>}
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
   * @param state
   * @param commit
   * @param rootState
   * @param reset
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
   * @param state
   * @param commit
   * @param rootState
   * @param user
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
              return _context5.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.post, {
                user: user
              }, undefined));

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
   * Retrieve a list of users
   * @param state
   * @param commit
   * @param rootState
   * @param id
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
   * @param state
   * @param commit
   * @param rootState
   * @param id
   * @param info
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
              return _context7.abrupt("return", makeRequest(commit, rootState.c3s.client.apis.Users.put, {
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
   * @param state
   * @param commit
   * @param rootState
   * @param id
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
}; // mutations

var mutations$1 = {
  SET_USER: function SET_USER(state, user) {
    state.user = user;
  },
  SET_CURRENT_USER: function SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  SET_TASK_PROGRESS: function SET_TASK_PROGRESS(state, prog) {
    state.taskProgress = prog;
  }
};
var user = {
  namespaced: true,
  state: state$1,
  getters: getters$1,
  actions: actions$1,
  mutations: mutations$1
};

function makeRequest$1(_x, _x2, _x3, _x4) {
  return _makeRequest.apply(this, arguments);
}

function _makeRequest() {
  _makeRequest = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(commit, method, data, commmitMsg) {
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

            if (commit !== undefined) {
              commit(commitMsg, response.body, {
                root: true
              });
            }

            commit('c3s/settings/SET_LOADING', false, {
              root: true
            });
            return _context.abrupt("return", response.body);

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
            return _context.abrupt("return", false);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));
  return _makeRequest.apply(this, arguments);
}

// shape: [{ id, quantity }]

var state$2 = {
  activities: [],
  activity: null,
  stats: null,
  media: []
}; // getters

var getters$2 = {}; // actions

var actions$2 = {
  /**
   * Retrieve an array of activities based on a provided query object
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param search
   * @returns {Promise<*|boolean|void>}
   */
  getActivities: function getActivities(_ref, search) {
    var state = _ref.state,
        commit = _ref.commit,
        dispatch = _ref.dispatch,
        rootState = _ref.rootState;
    return makeRequest$1(commit, rootState.c3s.client.apis.Activities.get_activities, {
      search_term: search || undefined
    }, 'activity/SET_ACTIVITIES');
  },

  /**
   * Retrieve a single activity based on the ID
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param id
   * @param associated
   * @returns {Promise<*|boolean|void>}
   */
  getActivity: function () {
    var _getActivity = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var state, commit, dispatch, rootState, _ref4, id, associated;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, dispatch = _ref2.dispatch, rootState = _ref2.rootState;
              _ref4 = _slicedToArray(_ref3, 2), id = _ref4[0], associated = _ref4[1];

              if (associated) {
                dispatch('media/getMedia', id, {
                  root: true
                });
                dispatch('media/getTasks', [id, 1, 0], {
                  root: true
                });
              }

              dispatch('getStats', id);
              return _context.abrupt("return", makeRequest$1(commit, rootState.c3s.client.apis.Activities.get_activity, {
                id: id
              }, 'c3s/activity/SET_ACTIVITY'));

            case 5:
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
  getStats: function getStats(_ref5, id) {
    var state = _ref5.state,
        commit = _ref5.commit,
        rootState = _ref5.rootState;
    return makeRequest$1(commit, rootState.c3s.client.apis.Activities.activity_stats, {
      id: id
    }, 'c3s/activity/SET_STATS');
  },

  /**
   * Create an activity
   * @param state
   * @param commit
   * @param rootState
   * @param activity
   * @returns {Promise<*|boolean|void>}
   */
  createActivity: function createActivity(_ref6, activity) {
    var state = _ref6.state,
        commit = _ref6.commit,
        rootState = _ref6.rootState;
    return makeRequest$1(commit, rootState.c3s.client.apis.Activities.create_activity, {
      activity: activity
    }, 'c3s/activity/SET_ACTIVITY');
  },

  /**
   * Delete an activity matching the supplied ID
   * @param state
   * @param commit
   * @param rootState
   * @param pid
   * @param localRemove
   * @returns {Promise<*|boolean|void>}
   */
  deleteActivity: function deleteActivity(_ref7, _ref8) {
    var state = _ref7.state,
        commit = _ref7.commit,
        rootState = _ref7.rootState;

    var _ref9 = _slicedToArray(_ref8, 2),
        pid = _ref9[0],
        localRemove = _ref9[1];

    if (localRemove) commit('c3s/activity/SET_ACTIVITY', null);
    return makeRequest$1(commit, rootState.c3s.client.apis.Activities.delete_activity, {
      id: pid
    }, undefined);
  }
}; // mutations

var mutations$2 = {
  SET_ACTIVITIES: function SET_ACTIVITIES(state, acts) {
    state.activities = acts;
  },
  SET_ACTIVITY: function SET_ACTIVITY(state, act) {
    state.activity = act;
  },
  SET_STATS: function SET_STATS(state, stats) {
    state.stats = stats;
  }
};
var activity = {
  namespaced: true,
  state: state$2,
  getters: getters$2,
  actions: actions$2,
  mutations: mutations$2
};

// shape: [{ id, quantity }]

var state$3 = {
  tasks: [],
  task: null,
  media: []
}; // getters

var getters$3 = {// https://vuex.vuejs.org/guide/getters.html#method-style-access
  // allTasks: state => state.tasks.concat(state.clientTasks)
}; // actions

var actions$3 = {
  /**
   * Retrieve all tasks matching the supplied query object
   * @param state
   * @param commit
   * @param rootState
   * @param search
   * @returns {Promise<*|boolean|void>}
   */
  getTasks: function () {
    var _getTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref, search) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
              return _context.abrupt("return", makeRequest$1(commit, rootState.c3s.client.apis.Tasks.get_tasks, {
                search_term: search || undefined
              }, 'c3s/task/SET_TASKS'));

            case 2:
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
  getTaskRegion: function () {
    var _getTaskRegion = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref2, _ref3) {
      var state, commit, rootState, _ref4, pid, region;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, rootState = _ref2.rootState;
              _ref4 = _slicedToArray(_ref3, 2), pid = _ref4[0], region = _ref4[1];
              return _context2.abrupt("return", undefined);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function getTaskRegion(_x3, _x4) {
      return _getTaskRegion.apply(this, arguments);
    };
  }(),
  getTaskMedia: function () {
    var _getTaskMedia = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3(_ref5, _ref6) {
      var state, commit, rootState, _ref7, pid, region;

      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
              _ref7 = _slicedToArray(_ref6, 2), pid = _ref7[0], region = _ref7[1];
              return _context3.abrupt("return", undefined);

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
   * Retrieve task matching an ID
   * @param state
   * @param commit
   * @param rootState
   * @param pid
   * @param region
   * @returns {Promise<undefined>}
   */
  getTask: function () {
    var _getTask = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4(_ref8, id) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
              return _context4.abrupt("return", makeRequest$1(commit, rootState.c3s.client.apis.Tasks.get_task, {
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
  activityTasks: function () {
    var _activityTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee5(_ref9, id) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref9.state, commit = _ref9.commit, rootState = _ref9.rootState;
              return _context5.abrupt("return", undefined);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function activityTasks(_x9, _x10) {
      return _activityTasks.apply(this, arguments);
    };
  }(),

  /**
   * Create an array of tasks
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param tasks
   * @returns {Promise<*>}
   */
  createTasks: function () {
    var _createTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee6(_ref10, tasks) {
      var state, commit, dispatch, rootState;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref10.state, commit = _ref10.commit, dispatch = _ref10.dispatch, rootState = _ref10.rootState;
              res = makeRequest$1(commit, rootState.c3s.client.apis.Tasks.create_tasks, {
                tasks: tasks
              }, undefined);
              dispatch('c3s/upload/addID', res[0].id, {
                root: true
              });
              return _context6.abrupt("return", res);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function createTasks(_x11, _x12) {
      return _createTasks.apply(this, arguments);
    };
  }(),

  /**
   * Delete an array of tasks
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param tasks
   * @returns {Promise<*|boolean|void>}
   */
  deleteTasks: function deleteTasks(_ref11, tasks) {
    var state = _ref11.state,
        commit = _ref11.commit,
        dispatch = _ref11.dispatch,
        rootState = _ref11.rootState;
    dispatch('SET_TASKS', null);
    return makeRequest$1(commit, rootState.c3s.client.apis.Tasks.delete_tasks, {
      tasks: tasks
    }, 'c3s/task/SET_TASKS');
  }
}; // mutations

var mutations$3 = {
  SET_TASKS: function SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  SET_TASK: function SET_TASK(state, task) {
    state.task = task;
  },
  UPDATE_TASK: function UPDATE_TASK(state, index, params) {
    Object.assign(state.tasks[index], _defineProperty({}, params.field, params.value));
  }
};
var task = {
  namespaced: true,
  state: state$3,
  getters: getters$3,
  actions: actions$3,
  mutations: mutations$3
};

// shape: [{ id, quantity }]

var state$4 = {
  media: undefined,
  submission: {},
  submissions: []
}; // getters

var getters$4 = {}; // actions

var actions$4 = {
  /**
   * Retrieve submissions matching the query object
   * @param state
   * @param commit
   * @param rootState
   * @param search
   * @returns {Promise<*|boolean|void>}
   */
  getSubmissions: function () {
    var _getSubmissions = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref, search) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
              return _context.abrupt("return", makeRequest$1(commit, rootState.c3s.client.apis.Submissions.get_submissions, {
                search_term: search || undefined
              }, 'c3s/submission/SET_SUBMISSIONS'));

            case 2:
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
   * Create a submission
   * @param state
   * @param commit
   * @param rootState
   * @param dispatch
   * @returns {Promise<*|boolean|void>}
   */
  createSubmission: function () {
    var _createSubmission = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref2) {
      var state, commit, rootState, dispatch;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, rootState = _ref2.rootState, dispatch = _ref2.dispatch;
              return _context2.abrupt("return", makeRequest$1(commit, rootState.c3s.client.apis.Submissions.create_submission, {
                submission: state.submission
              }, 'c3s/submission/SET_SUBMISSION'));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function createSubmission(_x3) {
      return _createSubmission.apply(this, arguments);
    };
  }(),

  /**
   * Update a submission based on the ID
   * @param state
   * @param commit
   * @param rootState
   * @param submission
   * @returns {Promise<*|boolean|void>}
   */
  updateSubmission: function () {
    var _updateSubmission = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3(_ref3, submission) {
      var state, commit, rootState;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref3.state, commit = _ref3.commit, rootState = _ref3.rootState;
              return _context3.abrupt("return", makeRequest$1(commit, rootState.c3s.client.apis.Submissions.update_submission, {
                id: submission.id,
                submission: submission
              }, 'submission/c3s/SET_SUBMISSION'));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function updateSubmission(_x4, _x5) {
      return _updateSubmission.apply(this, arguments);
    };
  }()
}; // mutations

var mutations$4 = {
  SET_MEDIA: function SET_MEDIA(state, media) {
    state.media = media;
  },
  SET_SUBMISSION: function SET_SUBMISSION(state, sub) {
    state.submission = sub;
  },
  SET_SUBMISSION_RESPONSE: function SET_SUBMISSION_RESPONSE(state, r, i) {
    state.submission.content.responses[i] = r;
  },
  SET_SUBMISSION_RESPONSES: function SET_SUBMISSION_RESPONSES(state, r) {
    state.submission.content.responses = r;
  }
};
var submission = {
  namespaced: true,
  state: state$4,
  getters: getters$4,
  actions: actions$4,
  mutations: mutations$4
};

// initial state
// shape: [{ id, quantity }]
var state$5 = {
  media: []
}; // getters

var getters$5 = {}; // actions

var actions$5 = {
  getMedia: function getMedia(_ref, search) {
    var state = _ref.state,
        commit = _ref.commit,
        rootState = _ref.rootState;
    commit('c3s/settings/SET_LOADING', true, {
      root: true
    });
    rootState.c3s.client.apis.Media.get_media({
      search_term: search || undefined
    }).then(function (req) {
      commit('SET_MEDIA', req.body);
      commit('c3s/settings/SET_LOADING', false, {
        root: true
      });
    }).catch(function (err) {
      if (err.response.status === 404) ;
    });
  },
  deleteMedium: function deleteMedium(_ref2, id) {
    var state = _ref2.state,
        commit = _ref2.commit,
        dispatch = _ref2.dispatch,
        rootState = _ref2.rootState;
    commit('c3s/settings/SET_LOADING', true, {
      root: true
    });
    rootState.c3s.client.apis.Media.delete_medium({
      id: id || undefined
    }).then(function (req) {
      commit('c3s/settings/SET_LOADING', false, {
        root: true
      });
      dispatch('getMedia');
    }).catch(function (err) {
      console.log(err);

      if (err.response.status === 404) ;
    });
  },
  upload: function upload(_ref3, medium) {
    var _this = this;

    var state = _ref3.state,
        commit = _ref3.commit,
        rootState = _ref3.rootState;
    commit('c3s/settings/SET_LOADING', true, {
      root: true
    });
    rootState.c3s.client.Media.upload(medium).then(function (req) {
      commit('c3s/settings/SET_LOADING', false, {
        root: true
      });
      console.log(req);
      _this.fileSaved = true;
    }).catch(function (e) {
      commit('c3s/settings/SET_LOADING', false, {
        root: true
      });
      console.error(e);
    });
  }
}; // mutations

var mutations$5 = {
  SET_MEDIA: function SET_MEDIA(state, media) {
    state.media = media;
  }
};
var media = {
  namespaced: true,
  state: state$5,
  getters: getters$5,
  actions: actions$5,
  mutations: mutations$5
};

// initial state
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

// shape: [{ id, quantity }]

var state$7 = {
  projects: [],
  project: null,
  stats: null,
  media: []
}; // getters

var getters$7 = {}; // actions

var actions$7 = {
  /**
   * Retrieve an array of projects based on a provided query object
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param search
   * @returns {Promise<*|boolean|void>}
   */
  getProjects: function getProjects(_ref, search) {
    var state = _ref.state,
        commit = _ref.commit,
        dispatch = _ref.dispatch,
        rootState = _ref.rootState;
    return makeRequest$1(commit, rootState.c3s.client.apis.Projects.get_projects, {
      search_term: search || undefined
    }, 'c3s/project/SET_PROJECTS');
  },

  /**
   * Retrieve a single activity based on the ID
   * @param state
   * @param commit
   * @param dispatch
   * @param rootState
   * @param id
   * @param associated
   * @returns {Promise<*|boolean|void>}
   */
  getActivity: function () {
    var _getActivity = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var state, commit, dispatch, rootState, _ref4, id, associated;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, dispatch = _ref2.dispatch, rootState = _ref2.rootState;
              _ref4 = _slicedToArray(_ref3, 2), id = _ref4[0], associated = _ref4[1];

              if (associated) {
                dispatch('media/getMedia', id, {
                  root: true
                });
                dispatch('media/getTasks', [id, 1, 0], {
                  root: true
                });
              }

              dispatch('getStats', id);
              return _context.abrupt("return", makeRequest$1(commit, rootState.c3s.client.apis.Projects.get_project, {
                id: id
              }, 'c3s/project/SET_PROJECT'));

            case 5:
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
   * Create a project
   * @param state
   * @param commit
   * @param rootState
   * @param activity
   * @returns {Promise<*|boolean|void>}
   */
  createProject: function createProject(_ref5, activity) {
    var state = _ref5.state,
        commit = _ref5.commit,
        rootState = _ref5.rootState;
    return makeRequest$1(commit, rootState.c3s.client.apis.Projects.create_project, {
      project: project
    }, 'c3s/project/SET_PROJECT');
  },

  /**
   * Delete a project matching the supplied ID
   * @param state
   * @param commit
   * @param rootState
   * @param pid
   * @param localRemove
   * @returns {Promise<*|boolean|void>}
   */
  deleteProject: function deleteProject(_ref6, _ref7) {
    var state = _ref6.state,
        commit = _ref6.commit,
        rootState = _ref6.rootState;

    var _ref8 = _slicedToArray(_ref7, 2),
        pid = _ref8[0],
        localRemove = _ref8[1];

    if (localRemove) commit('c3s/project/SET_PROJECT', null);
    return makeRequest$1(commit, rootState.c3s.client.apis.Projects.delete_project, {
      id: pid
    }, undefined);
  }
}; // mutations

var mutations$7 = {
  SET_PROJECTS: function SET_PROJECTS(state, ps) {
    state.projects = ps;
  },
  SET_PROJECT: function SET_PROJECT(state, p) {
    state.project = p;
  },
  SET_STATS: function SET_STATS(state, stats) {
    state.stats = stats;
  }
};
var project$1 = {
  namespaced: true,
  state: state$7,
  getters: getters$7,
  actions: actions$7,
  mutations: mutations$7
};

// initial state
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
      var state, commit, rootState, res;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
              _context.prev = 1;
              commit('c3s/settings/SET_LOADING', true, {
                root: true
              });
              _context.next = 5;
              return rootState.c3s.client.apis.Comments.get_all({
                search_term: search || undefined
              });

            case 5:
              res = _context.sent;
              commit('SET_COMMENTS', req.body);
              commit('c3s/settings/SET_LOADING', false, {
                root: true
              });
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              commit('c3s/settings/SET_LOADING', false, {
                root: true
              });
              commit('settings/SET_ERROR', _context.t0, {
                root: true
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 10]]);
    }));

    return function getComments(_x, _x2) {
      return _getComments.apply(this, arguments);
    };
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
    commit('c3s/settings/SET_LOADING', true, {
      root: true
    });
    rootState.c3s.client.apis.Comments.create_comment({
      comment: cmt
    }).then(function (req) {
      commit('c3s/settings/SET_LOADING', false, {
        root: true
      });
    }).catch(function (err) {
      commit('c3s/settings/SET_LOADING', false, {
        root: true
      });
      commit('c3s/settings/SET_ERROR', err, {
        root: true
      });
    });
  }
}; // mutations

var mutations$8 = {
  SET_MEDIA: function SET_MEDIA(state, media) {
    state.media = media;
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
  loading: false
}; // getters

var getters$9 = {}; //actions

var actions$9 = {}; // mutations

var mutations$9 = {
  SET_LOADING: function SET_LOADING(state, l) {
    state.loading = l;
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
	project: project$1,
	comments: comments,
	settings: settings
});

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
  name: ['c3s', 'projects'],
  module: project$1
}, {
  name: ['c3s', 'settings'],
  module: settings
}];
var C3SPlugin = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var store = options.store;
    var swaggerURL = options.swaggerURL;

    if (!store || !swaggerURL) {
      console.error('C3S: Missing store and/or Swagger URL params.');
      return;
    }

    for (var i in modules) {
      var m = modules[i];
      store.registerModule(m['name'], m['module']); // if (store.state.hasOwnProperty(m['name']) === false) {
      // 	console.error('C3S: C3S vuex module is not correctly initialized. Please check the module name:', m['name']);
      // 	return;
      // }
      // TODO check why store reports this as false when it is created
    }

    Swagger({
      url: options.swaggerURL,
      requestInterceptor: function requestInterceptor(req) {// let u = store.getters['user/currentUser']
        // if (u !== null) {
        //   req.headers['X-API-KEY'] = u.api_key
        // }
        // return req
      }
    }).then(function (client) {
      console.log('Loaded');
      store.commit('c3s/SET_API', client);
      Vue.prototype.$c3s = {
        store: C3SStore
      };
      Vue.c3s = {
        store: C3SStore
      };
    }).catch(function (err) {
      console.error('C3S: URL was not found or an initialisation error occurred');
      console.error(err);
      return;
    });
  }
};

module.exports = C3SPlugin;
