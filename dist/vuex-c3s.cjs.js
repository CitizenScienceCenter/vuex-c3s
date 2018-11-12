'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vuex = _interopDefault(require('vuex'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var Swagger = _interopDefault(require('swagger-client'));

// initial state
// shape: [{ id, quantity }]
var state = {
  client: null,
  host: undefined // getters

};
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
  currentUser: null,
  settings: null,
  // TODO split this out into separate store
  taskProgress: 0 // getters

};
var getters$1 = {}; // actions

var actions$1 = {
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref, user) {
      var state, commit, dispatch, rootState, res;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, dispatch = _ref.dispatch, rootState = _ref.rootState;
              commit('settings/SET_LOADING', true, {
                root: true
              });
              _context.prev = 2;
              _context.next = 5;
              return rootState.api.client.apis.Users.login(user);

            case 5:
              res = _context.sent;
              commit('SET_CURRENT_USER', res.body);
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context.abrupt("return", res.body);

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);
              dispatch('settings/setError', 'Anmeldung fehlgeschlagen', {
                root: true
              });
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context.abrupt("return", false);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 11]]);
    }));

    return function login(_x, _x2) {
      return _login.apply(this, arguments);
    };
  }(),
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
              commit('settings/SET_LOADING', true, {
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
  logout: function logout(_ref3) {
    var state = _ref3.state,
        commit = _ref3.commit;
    commit('user/SET_CURRENT_USER', null, {
      root: true
    });
  },
  requestReset: function () {
    var _requestReset = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3(_ref4, email) {
      var state, commit, dispatch, rootState, res;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
              _context3.prev = 1;
              _context3.next = 4;
              return rootState.api.client.apis.Users.reset({
                email: email
              });

            case 4:
              res = _context3.sent;
              return _context3.abrupt("return", res);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              console.error(_context3.t0);
              dispatch('settings/setError', _context3.t0, {
                root: true
              });
              return _context3.abrupt("return", false);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 8]]);
    }));

    return function requestReset(_x4, _x5) {
      return _requestReset.apply(this, arguments);
    };
  }(),
  resetPwd: function () {
    var _resetPwd = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4(_ref5, reset) {
      var state, commit, rootState, res;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
              _context4.prev = 1;
              _context4.next = 4;
              return rootState.api.client.apis.Users.verify_reset({
                reset: reset
              });

            case 4:
              res = _context4.sent;
              commit('SET_CURRENT_USER', null);
              return _context4.abrupt("return", res);

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](1);
              console.log(_context4.t0);
              commit('settings/SET_ERROR', 'Token ungültig oder Systemfehler', {
                root: true
              });
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context4.abrupt("return", false);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 9]]);
    }));

    return function resetPwd(_x6, _x7) {
      return _resetPwd.apply(this, arguments);
    };
  }(),
  register: function () {
    var _register = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee5(_ref6, user) {
      var state, commit, rootState, res;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit, rootState = _ref6.rootState;
              commit('settings/SET_LOADING', true, {
                root: true
              });
              _context5.prev = 2;
              _context5.next = 5;
              return rootState.api.client.apis.Users.post({
                user: user
              });

            case 5:
              res = _context5.sent;
              commit('SET_CURRENT_USER', res.body);
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context5.abrupt("return", res.body);

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](2);
              console.log(_context5.t0);
              commit('settings/SET_ERROR', _context5.t0, {
                root: true
              });
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context5.abrupt("return", false);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[2, 11]]);
    }));

    return function register(_x8, _x9) {
      return _register.apply(this, arguments);
    };
  }(),
  getUser: function getUser(_ref7, id) {
    var state = _ref7.state,
        commit = _ref7.commit,
        rootState = _ref7.rootState;
    rootState.api.client.apis.Users.get_one({
      id: id
    }).then(function (req) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      commit('SET_USER', req.body);
    }).catch(function (err) {
      console.error(err);
      commit('settings/SET_ERROR', err, {
        root: true
      });
    });
  },
  updateUser: function () {
    var _updateUser = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee6(_ref8, _ref9) {
      var state, commit, rootState, _ref10, id, info, res;

      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
              _ref10 = _slicedToArray(_ref9, 2), id = _ref10[0], info = _ref10[1];
              _context6.prev = 2;
              _context6.next = 5;
              return rootState.api.client.apis.Users.put({
                id: id,
                user: info
              });

            case 5:
              res = _context6.sent;
              commit('SET_CURRENT_USER', res.body);
              return _context6.abrupt("return", res);

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](2);
              console.log(_context6.t0);
              commit('settings/SET_ERROR', _context6.t0, {
                root: true
              });
              return _context6.abrupt("return", false);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[2, 10]]);
    }));

    return function updateUser(_x10, _x11) {
      return _updateUser.apply(this, arguments);
    };
  }(),
  validate: function () {
    var _validate = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee7(_ref11, id) {
      var state, commit, rootState, res;
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              state = _ref11.state, commit = _ref11.commit, rootState = _ref11.rootState;
              _context7.prev = 1;

              if (!(state.currentUser.api_key !== undefined)) {
                _context7.next = 10;
                break;
              }

              _context7.next = 5;
              return rootState.api.client.apis.Users.validate({
                key: state.currentUser.api_key
              });

            case 5:
              res = _context7.sent;
              commit('SET_CURRENT_USER', res.body);
              return _context7.abrupt("return", true);

            case 10:
              return _context7.abrupt("return", false);

            case 11:
              _context7.next = 16;
              break;

            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](1);
              return _context7.abrupt("return", false);

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[1, 13]]);
    }));

    return function validate(_x12, _x13) {
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

// initial state
// shape: [{ id, quantity }]
var state$2 = {
  projects: [],
  selectedProject: null,
  selectedMedia: [],
  selectedStats: null,
  selectedTasks: [] // getters

};
var getters$2 = {}; // actions

var actions$2 = {
  getProjects: function getProjects(_ref, search) {
    var state = _ref.state,
        commit = _ref.commit,
        dispatch = _ref.dispatch,
        rootState = _ref.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Projects.get_projects({
      search_term: search || undefined
    }).then(function (req) {
      commit('SET_PROJECTS', req.body);
      commit('settings/SET_LOADING', false, {
        root: true
      });
    }).catch(function (err) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      commit('settings/SET_ERROR', err, {
        root: true
      });
      console.log(err);
    });
  },
  getProject: function () {
    var _getProject = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
      var state, commit, dispatch, rootState, _ref4, id, associated, res;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, dispatch = _ref2.dispatch, rootState = _ref2.rootState;
              _ref4 = _slicedToArray(_ref3, 2), id = _ref4[0], associated = _ref4[1];
              commit('settings/SET_LOADING', true, {
                root: true
              });
              _context.prev = 3;
              _context.next = 6;
              return rootState.api.client.apis.Projects.get_project({
                id: id
              });

            case 6:
              res = _context.sent;
              commit('SET_PROJECT', res.body);
              commit('settings/SET_LOADING', false, {
                root: true
              });

              if (associated) {
                dispatch('getMedia', id);
                dispatch('getTasks', [id, 1, 0]);
              }

              dispatch('getStats', id);
              return _context.abrupt("return", res.body);

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              console.log(_context.t0);
              commit('settings/SET_LOADING', false, {
                root: true
              });
              commit('settings/SET_ERROR', _context.t0, {
                root: true
              });
              return _context.abrupt("return", false);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 14]]);
    }));

    return function getProject(_x, _x2) {
      return _getProject.apply(this, arguments);
    };
  }(),
  getTasks: function () {
    var _getTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref5, _ref6) {
      var state, commit, rootState, _ref7, id, _ref7$, limit, _ref7$2, offset, tasks;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
              _ref7 = _slicedToArray(_ref6, 3), id = _ref7[0], _ref7$ = _ref7[1], limit = _ref7$ === void 0 ? 20 : _ref7$, _ref7$2 = _ref7[2], offset = _ref7$2 === void 0 ? 0 : _ref7$2;
              commit('settings/SET_LOADING', true, {
                root: true
              });
              _context2.prev = 3;
              _context2.next = 6;
              return rootState.api.client.apis.Projects.project_tasks({
                id: id,
                limit: limit,
                offset: offset
              });

            case 6:
              tasks = _context2.sent;
              console.log(id);
              commit('settings/SET_LOADING', false, {
                root: true
              });
              commit('SET_TASKS', tasks.body);
              return _context2.abrupt("return", tasks.body);

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](3);
              commit('settings/SET_LOADING', false, {
                root: true
              });
              commit('settings/SET_LOADING', false, {
                root: true
              });
              console.log(_context2.t0);
              return _context2.abrupt("return", false);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 13]]);
    }));

    return function getTasks(_x3, _x4) {
      return _getTasks.apply(this, arguments);
    };
  }(),
  getStats: function getStats(_ref8, id) {
    var state = _ref8.state,
        commit = _ref8.commit,
        rootState = _ref8.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Projects.project_stats({
      id: id
    }).then(function (req) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      commit('SET_STATS', req.body);
    }).catch(function (err) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      commit('settings/SET_LOADING', false, {
        root: true
      });
      console.log(err);
    });
  },
  getMedia: function getMedia(_ref9, search) {
    var state = _ref9.state,
        commit = _ref9.commit,
        rootState = _ref9.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Media.get_media({
      search_term: search || undefined
    }).then(function (req) {
      commit('SET_MEDIA', req.body);
      commit('settings/SET_LOADING', false, {
        root: true
      });
    }).catch(function (err) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      console.log(err);
    });
  },
  createProject: function createProject(_ref10, project) {
    var state = _ref10.state,
        commit = _ref10.commit,
        rootState = _ref10.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Projects.post({
      project: project
    }).then(function (req) {
      console.log(req);
      commit('settings/SET_LOADING', false, {
        root: true
      });
      commit('SET_PROJECT', req.body);
    }).catch(function (err) {
      commit('settings/SET_ERROR', err, {
        root: true
      });
      commit('settings/SET_LOADING', false, {
        root: true
      });
      console.log(err);
    });
  },
  deleteProject: function deleteProject(_ref11, pid) {
    var state = _ref11.state,
        commit = _ref11.commit,
        rootState = _ref11.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Projects.delete({
      id: pid
    }).then(function (req) {
      commit('SET_PROJECT', null);
      commit('settings/SET_LOADING', false, {
        root: true
      });
    }).catch(function (err) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      commit('settings/SET_LOADING', false, {
        root: true
      });
      console.log(err);
    });
  }
}; // mutations

var mutations$2 = {
  SET_PROJECTS: function SET_PROJECTS(state, projects) {
    state.projects = projects;
  },
  SET_PROJECT: function SET_PROJECT(state, project) {
    state.selectedProject = project;
  },
  SET_STATS: function SET_STATS(state, stats) {
    state.selectedStats = stats;
  },
  SET_MEDIA: function SET_MEDIA(state, media) {
    state.selectedMedia = media;
  },
  SET_TASKS: function SET_TASKS(state, tasks) {
    state.selectedTasks = tasks;
  }
};
var project = {
  namespaced: true,
  state: state$2,
  getters: getters$2,
  actions: actions$2,
  mutations: mutations$2
};

// initial state
// shape: [{ id, quantity }]
var state$3 = {
  tasks: [],
  selectedTask: null,
  taskSaved: false // getters

};
var getters$3 = {} // https://vuex.vuejs.org/guide/getters.html#method-style-access
// allTasks: state => state.tasks.concat(state.clientTasks)
// actions
;
var actions$3 = {
  getTasks: function () {
    var _getTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref, search) {
      var state, commit, rootState, _tasks;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref.state, commit = _ref.commit, rootState = _ref.rootState;
              _context.prev = 1;
              commit('settings/SET_LOADING', true, {
                root: true
              });
              console.log(search);
              _context.next = 6;
              return rootState.api.client.apis.Tasks.get_tasks({
                search_term: search || undefined
              });

            case 6:
              _tasks = _context.sent;
              commit('SET_TASKS', _tasks.body);
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context.abrupt("return", _tasks.body);

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              console.error(_context.t0);
              commit('settings/SET_ERROR', 'Could not get Tasks', {
                root: true
              });
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context.abrupt("return", false);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 12]]);
    }));

    return function getTasks(_x, _x2) {
      return _getTasks.apply(this, arguments);
    };
  }(),
  getTaskRegion: function () {
    var _getTaskRegion = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(_ref2, _ref3) {
      var state, commit, rootState, _ref4, pid, region, task;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref2.state, commit = _ref2.commit, rootState = _ref2.rootState;
              _ref4 = _slicedToArray(_ref3, 2), pid = _ref4[0], region = _ref4[1];
              _context2.prev = 2;
              commit('settings/SET_LOADING', true, {
                root: true
              });
              console.log(rootState.api.client.apis.Projects);
              _context2.next = 7;
              return rootState.api.client.apis.Projects.get_task_region({
                id: pid,
                region: region || undefined
              });

            case 7:
              task = _context2.sent;
              commit('settings/SET_LOADING', false, {
                root: true
              });
              console.log(JSON.stringify(tasks));
              return _context2.abrupt("return", tasks.body);

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](2);
              console.error(_context2.t0);
              commit('settings/SET_ERROR', 'Could not get Tasks', {
                root: true
              });
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context2.abrupt("return", false);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 13]]);
    }));

    return function getTaskRegion(_x3, _x4) {
      return _getTaskRegion.apply(this, arguments);
    };
  }(),
  getTask: function () {
    var _getTask = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3(_ref5, id) {
      var state, commit, rootState, task;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
              commit('settings/SET_LOADING', true, {
                root: true
              });
              _context3.prev = 2;
              _context3.next = 5;
              return rootState.api.client.apis.Tasks.get_task({
                id: id
              });

            case 5:
              task = _context3.sent;
              commit('SET_TASK', task.body);
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context3.abrupt("return", task.body);

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](2);
              commit('settings/SET_ERROR', 'Could not get Task', {
                root: true
              });
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context3.abrupt("return", false);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[2, 11]]);
    }));

    return function getTask(_x5, _x6) {
      return _getTask.apply(this, arguments);
    };
  }(),
  randomProjectTask: function () {
    var _randomProjectTask = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4(_ref6, _ref7) {
      var state, commit, rootState, _ref8, id, search, task;

      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              state = _ref6.state, commit = _ref6.commit, rootState = _ref6.rootState;
              _ref8 = _slicedToArray(_ref7, 2), id = _ref8[0], search = _ref8[1];
              commit('settings/SET_LOADING', true, {
                root: true
              });
              _context4.prev = 3;
              _context4.next = 6;
              return rootState.api.client.apis.Projects.get_random({
                id: id,
                search: search
              });

            case 6:
              task = _context4.sent;
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context4.abrupt("return", task.body.task);

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](3);
              console.log(_context4.t0);
              commit('settings/SET_ERROR', 'Could not get random task', {
                root: true
              });
              commit('settings/SET_LOADING', false, {
                root: true
              });
              return _context4.abrupt("return", false);

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[3, 11]]);
    }));

    return function randomProjectTask(_x7, _x8) {
      return _randomProjectTask.apply(this, arguments);
    };
  }(),
  projectTasks: function projectTasks(_ref9, id) {
    var state = _ref9.state,
        commit = _ref9.commit,
        rootState = _ref9.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Projects.project_tasks({
      id: id
    }).then(function (res) {
      res.body.forEach(function (t) {
        t['content_str'] = JSON.stringify(t.content);
      });
      commit('SET_TASKS', res.body);
      commit('settings/SET_LOADING', false, {
        root: true
      });
    }).catch(function (err) {
      console.log(err);
      commit('settings/SET_ERROR', 'Could not get Tasks for Project', {
        root: true
      });
      commit('settings/SET_LOADING', false, {
        root: true
      });
    });
  },
  addTasks: function () {
    var _addTasks = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee5(_ref10, tasks) {
      var state, commit, dispatch, rootState, res;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              state = _ref10.state, commit = _ref10.commit, dispatch = _ref10.dispatch, rootState = _ref10.rootState;
              commit('settings/SET_LOADING', true, {
                root: true
              });
              _context5.prev = 2;
              _context5.next = 5;
              return rootState.api.client.apis.Tasks.create_tasks({
                tasks: tasks
              });

            case 5:
              res = _context5.sent;
              commit('settings/SET_LOADING', false, {
                root: true
              });
              dispatch('upload/addID', res.body[0].id, {
                root: true
              });
              return _context5.abrupt("return", res.body);

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](2);
              console.error(_context5.t0);
              commit('settings/SET_LOADING', false, {
                root: true
              });
              commit('settings/SET_ERROR', _context5.t0, {
                root: true
              });
              return _context5.abrupt("return", false);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[2, 11]]);
    }));

    return function addTasks(_x9, _x10) {
      return _addTasks.apply(this, arguments);
    };
  }(),
  deleteTasks: function deleteTasks(_ref11, tasks) {
    var state = _ref11.state,
        commit = _ref11.commit,
        dispatch = _ref11.dispatch,
        rootState = _ref11.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Tasks.delete_tasks({
      tasks: tasks
    }).then(function (res) {
      commit('SET_TASKS', res.body);
      commit('settings/SET_LOADING', false, {
        root: true
      });
    }).catch(function (e) {
      commit('settings/SET_ERROR', 'Could not delete Tasks', {
        root: true
      });
      commit('settings/SET_LOADING', false, {
        root: true
      });
      console.error(e);
    });
  }
}; // mutations

var mutations$3 = {
  SET_TASKSAVED: function SET_TASKSAVED(state, flag) {
    state.taskSaved = flag;
  },
  SET_TASKS: function SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  SET_TASK: function SET_TASK(state, task) {
    state.selectedTask = task;
  },
  UPDATE_TASK: function UPDATE_TASK(state, index, params) {
    Object.assign(state.getters.allTasks[index], _defineProperty({}, params.field, params.value));
  }
};
var task = {
  namespaced: true,
  state: state$3,
  getters: getters$3,
  actions: actions$3,
  mutations: mutations$3
};

// initial state
// shape: [{ id, quantity }]
var state$4 = {
  media: undefined,
  submission: {} // getters

};
var getters$4 = {}; // actions

var actions$4 = {
  postSubmission: function postSubmission(_ref) {
    var state = _ref.state,
        commit = _ref.commit,
        rootState = _ref.rootState,
        dispatch = _ref.dispatch;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Submissions.create_submission({
      submission: state.submission
    }).then(function (res) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      commit('SET_SUBMISSION', Object.assign({}, res.body));

      if (rootState.upload.content.length > 0) {
        dispatch('upload/addID', res.body.id, {
          root: true
        });
      }
    }).catch(function (err) {
      commit('settings/SET_ERROR', 'Could not create Submission', {
        root: true
      });
      commit('settings/SET_LOADING', false, {
        root: true
      });
      console.log(err);
    });
  },
  putSubmission: function putSubmission(_ref2, submission) {
    var state = _ref2.state,
        commit = _ref2.commit,
        rootState = _ref2.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    console.log(this.user);
    rootState.api.client.apis.Submissions.update_submission({
      id: submission.id,
      submission: submission
    }).then(function (req) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      commit('SET_SUBMISSION', req.body);
    }).catch(function (err) {
      // commit('settings/SET_ERROR', 'Could not modify Submission', {root: true})
      commit('settings/SET_LOADING', false, {
        root: true
      });
      console.log(err);
    });
  }
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
  media: [] // getters

};
var getters$5 = {}; // actions

var actions$5 = {
  getMedia: function getMedia(_ref, search) {
    var state = _ref.state,
        commit = _ref.commit,
        rootState = _ref.rootState;
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Media.get_media({
      search_term: search || undefined
    }).then(function (req) {
      commit('SET_MEDIA', req.body);
      commit('settings/SET_LOADING', false, {
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
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.apis.Media.delete_medium({
      id: id || undefined
    }).then(function (req) {
      commit('settings/SET_LOADING', false, {
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
    commit('settings/SET_LOADING', true, {
      root: true
    });
    rootState.api.client.Media.upload(medium).then(function (req) {
      commit('settings/SET_LOADING', false, {
        root: true
      });
      console.log(req);
      _this.fileSaved = true;
    }).catch(function (e) {
      commit('settings/SET_LOADING', false, {
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
  content: [] // getters

};
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
      commit('settings/SET_LOADING', true, {
        root: true
      });
      console.log(state.content[i]);
      rootState.api.client.apis.Media.put_medium({
        id: state.content[i],
        media: {
          id: state.content[i],
          'source_id': id || state.id
        }
      }).then(function (req) {
        console.log(req);
        commit('settings/SET_LOADING', false, {
          root: true
        });

        if (i === state.content.length - 1) {
          commit('CLEAR');
        }
      }).catch(function (e) {
        commit('settings/SET_LOADING', false, {
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

var state$7 = {
  swissCantons: [{
    'value': 'AG',
    'label': 'Aargau',
    'lang': 'DE'
  }, {
    'value': 'AR',
    'label': 'Appenzell Ausserhoden',
    'lang': 'DE'
  }, {
    'value': 'AI',
    'label': 'Appenzell Innerhoden',
    'lang': 'DE'
  }, {
    'value': 'BS',
    'label': 'Basel-Stadt',
    'lang': 'DE'
  }, {
    'value': 'BL',
    'label': 'Basel-Land',
    'lang': 'DE'
  }, {
    'value': 'BE',
    'label': 'Bern',
    'lang': 'DE'
  }, {
    'value': 'FR',
    'label': 'Freiburg',
    'lang': 'DE'
  }, {
    'value': 'GL',
    'label': 'Glarus',
    'lang': 'DE'
  }, {
    'value': 'GR',
    'label': 'Graubunden',
    'lang': 'RM'
  }, {
    'value': 'JU',
    'label': 'Jura',
    'lang': 'FR'
  }, {
    'value': 'LU',
    'label': 'Luzern',
    'lang': 'DE'
  }, {
    'value': 'SG',
    'label': 'St. Gallen',
    'lang': 'DE'
  }, {
    'value': 'SZ',
    'label': 'Schwyz',
    'lang': 'DE'
  }, {
    'value': 'SH',
    'label': 'Schaffhausen',
    'lang': 'DE'
  }, {
    'value': 'SO',
    'label': 'Solothun',
    'lang': 'DE'
  }, {
    'value': 'TI',
    'label': 'Ticino',
    'lang': 'IT'
  }, {
    'value': 'TG',
    'label': 'Thurgau',
    'lang': 'DE'
  }, {
    'value': 'UR',
    'label': 'Uri',
    'lang': 'DE'
  }, {
    'value': 'NW',
    'label': 'Unterwalden Nidwalden',
    'lang': 'DE'
  }, {
    'value': 'OW',
    'label': 'Unterwalden Obwalden',
    'lang': 'DE'
  }, {
    'value': 'VD',
    'label': 'Vaud',
    'lang': 'FR'
  }, {
    'value': 'VS',
    'label': 'Valais',
    'lang': 'DE'
  }, {
    'value': 'ZG',
    'label': 'Zug',
    'lang': 'DE'
  }, {
    'value': 'ZH',
    'label': 'Zurich',
    'lang': 'DE'
  }],
  otherRegions: [{
    'value': 'ANDERES',
    'label': 'Anderes Land',
    'lang': '?'
  }, {
    'value': 'GE',
    'label': 'Geneva',
    'lang': 'FR'
  }, {
    'value': 'NE',
    'label': 'Neuchatel',
    'lang': 'FR'
  }],
  ageRange: [{
    'value': '0-11',
    'label': 'Unter 12'
  }, {
    'value': '12-17',
    'label': 'Zwischen 12 und 17'
  }, {
    'value': '18-24',
    'label': 'Zwischen 18 und 24'
  }, {
    'value': '25-34',
    'label': 'Zwischen 25 und 34'
  }, {
    'value': '35-44',
    'label': 'Zwischen 35 und 44'
  }, {
    'value': '45-54',
    'label': 'Zwischen 45 und 54'
  }, {
    'value': '55-64',
    'label': 'Zwischen 55 und 64'
  }, {
    'value': '65-74',
    'label': 'Zwischen 65 und 74'
  }, {
    'value': '75+',
    'label': 'Über 75'
  }],
  specialChars: ["e̊", "ĕ", "nbsp;͜", "i̇̄", "üö", "öü", "'", "ạ̈", "m̄", ">", "&", "e̍", "eh", "e̥", "?", "!"] // specialChars: [ "e̊", "ĕ", "nbsp" ,"i̇̄,", "üö", "öü", "ạ̈", "m̄", "e̥" ]

};
var consts = {
  namespaced: true,
  state: state$7
};

var debug = process.env.NODE_ENV !== 'production';
var C3SStore = new Vuex.Store({
  modules: {
    user: user,
    project: project,
    api: api,
    consts: consts,
    task: task,
    media: media,
    upload: upload,
    submission: submission
  },
  strict: debug
});

var moduleName = 'c3s';
var C3SPlugin = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var store = options.store;
    var swaggerURL = options.swaggerURL;

    if (!store || !swaggerURL) {
      console.error("C3S: Missing store and/or Swagger URL params.");
      return;
    }

    store.registerModule(moduleName, C3SStore);

    if (store.state.hasOwnProperty(moduleName) === false) {
      console.error('C3S: C3S vuex module is not correctly initialized. Please check the module name:', moduleName);
      return;
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
      console.log("Loaded"); // store.commit('api/SET_API', client)

      var getStore = function getStore() {
        return store;
      };

      console.log(store.commit);
      Vue.prototype.$c3s = {
        store: getStore
      };
      Vue.c3s = {
        store: getStore
      };
    }).catch(function (err) {
      console.error('C3S: URL was not found or an initialisation error occurred');
      console.error(err);
      return;
    });
  }
};

var index = {
  store: C3SStore,
  plugin: C3SPlugin
};

module.exports = index;
