(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/defineProperty'), require('@babel/runtime/helpers/slicedToArray'), require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('swagger-client')) :
	typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/defineProperty', '@babel/runtime/helpers/slicedToArray', '@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', 'swagger-client'], factory) :
	(global.vuexC3S = factory(global._defineProperty,global._slicedToArray,global._regeneratorRuntime,global._asyncToGenerator,global.Swagger));
}(this, (function (_defineProperty,_slicedToArray,_regeneratorRuntime,_asyncToGenerator,Swagger) { 'use strict';

	_defineProperty = _defineProperty && _defineProperty.hasOwnProperty('default') ? _defineProperty['default'] : _defineProperty;
	_slicedToArray = _slicedToArray && _slicedToArray.hasOwnProperty('default') ? _slicedToArray['default'] : _slicedToArray;
	_regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
	_asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
	Swagger = Swagger && Swagger.hasOwnProperty('default') ? Swagger['default'] : Swagger;

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
	              return _context.abrupt("return", makeRequest(rootState.api.client.apis.Users.login, user, 'SET_CURRENT_USER'));

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
	      var state, commit, dispatch, rootState;
	      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              state = _ref4.state, commit = _ref4.commit, dispatch = _ref4.dispatch, rootState = _ref4.rootState;
	              return _context3.abrupt("return", makeRequest(rootState.api.client.apis.Users.reset, {
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
	              return _context4.abrupt("return", makeRequest(rootState.api.client.apis.Users.verify_reset, {
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
	              commit('settings/SET_LOADING', true, {
	                root: true
	              });
	              return _context5.abrupt("return", makeRequest(rootState.api.client.apis.Users.post, {
	                user: user
	              }, undefined));

	            case 3:
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
	  getUser: function getUser(_ref7, id) {
	    var state = _ref7.state,
	        commit = _ref7.commit,
	        rootState = _ref7.rootState;
	    return makeRequest(rootState.api.client.apis.Users.get_one, {
	      id: id
	    }, 'SET_USER');
	  },
	  updateUser: function () {
	    var _updateUser = _asyncToGenerator(
	    /*#__PURE__*/
	    _regeneratorRuntime.mark(function _callee6(_ref8, _ref9) {
	      var state, commit, rootState, _ref10, id, info;

	      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
	        while (1) {
	          switch (_context6.prev = _context6.next) {
	            case 0:
	              state = _ref8.state, commit = _ref8.commit, rootState = _ref8.rootState;
	              _ref10 = _slicedToArray(_ref9, 2), id = _ref10[0], info = _ref10[1];
	              return _context6.abrupt("return", makeRequest(rootState.api.client.apis.Users.put, {
	                id: id,
	                user: info
	              }, 'SET_CURRENT_USER'));

	            case 3:
	            case "end":
	              return _context6.stop();
	          }
	        }
	      }, _callee6, this);
	    }));

	    return function updateUser(_x10, _x11) {
	      return _updateUser.apply(this, arguments);
	    };
	  }(),
	  validate: function () {
	    var _validate = _asyncToGenerator(
	    /*#__PURE__*/
	    _regeneratorRuntime.mark(function _callee7(_ref11, id) {
	      var state, commit, rootState;
	      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
	        while (1) {
	          switch (_context7.prev = _context7.next) {
	            case 0:
	              state = _ref11.state, commit = _ref11.commit, rootState = _ref11.rootState;

	              if (!(state.currentUser.api_key !== undefined)) {
	                _context7.next = 3;
	                break;
	              }

	              return _context7.abrupt("return", makeRequest(rootState.api.client.apis.Users.validate, {
	                key: state.currentUser.api_key
	              }, 'SET_CURRENT_USER'));

	            case 3:
	            case "end":
	              return _context7.stop();
	          }
	        }
	      }, _callee7, this);
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

	function makeRequest$1(_x, _x2, _x3) {
	  return _makeRequest.apply(this, arguments);
	}

	function _makeRequest() {
	  _makeRequest = _asyncToGenerator(
	  /*#__PURE__*/
	  _regeneratorRuntime.mark(function _callee(method, data, commmitMsg) {
	    var response;
	    return _regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.prev = 0;
	            commit('settings/SET_LOADING', true, {
	              root: true
	            });
	            _context.next = 4;
	            return method(data);

	          case 4:
	            response = _context.sent;

	            if (commit !== undefined) {
	              commit(commitMsg, response.body);
	            }

	            commit('settings/SET_LOADING', false, {
	              root: true
	            });
	            return _context.abrupt("return", response.body);

	          case 10:
	            _context.prev = 10;
	            _context.t0 = _context["catch"](0);
	            console.error(_context.t0);
	            commit('settings/SET_ERROR', 'Could not get Tasks', {
	              root: true
	            });
	            commit('settings/SET_LOADING', false, {
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
	  getActivities: function getActivities(_ref, search) {
	    var state = _ref.state,
	        commit = _ref.commit,
	        dispatch = _ref.dispatch,
	        rootState = _ref.rootState;
	    return makeRequest$1(rootState.api.client.apis.Activities.get_activities, {
	      search_term: search || undefined
	    }, 'SET_ACTIVITIES');
	  },
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
	              return _context.abrupt("return", makeRequest$1(rootState.api.client.apis.Activities.get_activity, {
	                id: id
	              }, 'SET_ACTIVITY'));

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
	    return makeRequest$1(rootState.api.client.apis.Activities.activity_stats, {
	      id: id
	    }, 'SET_STATS');
	  },
	  createActivity: function createActivity(_ref6, activity) {
	    var state = _ref6.state,
	        commit = _ref6.commit,
	        rootState = _ref6.rootState;
	    return makeRequest$1(rootState.api.client.apis.Activities.create_activity, {
	      activity: activity
	    }, 'SET_ACTIVITY');
	  },
	  deleteActivity: function deleteActivity(_ref7, pid) {
	    var state = _ref7.state,
	        commit = _ref7.commit,
	        rootState = _ref7.rootState;
	    commit('SET_ACTIVITY', null);
	    return makeRequest$1(rootState.api.client.apis.Activities.create_activity, {
	      activity: activity
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
	var activity$1 = {
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
	              return _context.abrupt("return", makeRequest$1(rootState.api.client.apis.Tasks.get_tasks, {
	                search_term: search || undefined
	              }, 'SET_TASKS'));

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
	  getTask: function () {
	    var _getTask = _asyncToGenerator(
	    /*#__PURE__*/
	    _regeneratorRuntime.mark(function _callee3(_ref5, id) {
	      var state, commit, rootState;
	      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              state = _ref5.state, commit = _ref5.commit, rootState = _ref5.rootState;
	              return _context3.abrupt("return", makeRequest$1(rootState.api.client.apis.Tasks.get_task, {
	                id: id
	              }, 'SET_TASK'));

	            case 2:
	            case "end":
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this);
	    }));

	    return function getTask(_x5, _x6) {
	      return _getTask.apply(this, arguments);
	    };
	  }(),
	  activityTasks: function () {
	    var _activityTasks = _asyncToGenerator(
	    /*#__PURE__*/
	    _regeneratorRuntime.mark(function _callee4(_ref6, id) {
	      var state, commit, rootState;
	      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              state = _ref6.state, commit = _ref6.commit, rootState = _ref6.rootState;
	              return _context4.abrupt("return", undefined);

	            case 2:
	            case "end":
	              return _context4.stop();
	          }
	        }
	      }, _callee4, this);
	    }));

	    return function activityTasks(_x7, _x8) {
	      return _activityTasks.apply(this, arguments);
	    };
	  }(),
	  addTasks: function () {
	    var _addTasks = _asyncToGenerator(
	    /*#__PURE__*/
	    _regeneratorRuntime.mark(function _callee5(_ref7, tasks) {
	      var state, commit, dispatch, rootState;
	      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
	        while (1) {
	          switch (_context5.prev = _context5.next) {
	            case 0:
	              state = _ref7.state, commit = _ref7.commit, dispatch = _ref7.dispatch, rootState = _ref7.rootState;
	              res = makeRequest$1(rootState.api.client.apis.Tasks.create_tasks, {
	                tasks: tasks
	              }, undefined);
	              dispatch('upload/addID', res[0].id, {
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

	    return function addTasks(_x9, _x10) {
	      return _addTasks.apply(this, arguments);
	    };
	  }(),
	  deleteTasks: function deleteTasks(_ref8, tasks) {
	    var state = _ref8.state,
	        commit = _ref8.commit,
	        dispatch = _ref8.dispatch,
	        rootState = _ref8.rootState;
	    dispatch('SET_TASKS', null);
	    return umakeRequest(rootState.api.client.apis.Tasks.delete_tasks, {
	      tasks: tasks
	    }, 'SET_TASKS');
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
	  submission: {}
	}; // getters

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
	  media: []
	}; // getters

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

	// initial state
	// shape: [{ id, quantity }]
	var state$7 = {
	  comments: [],
	  comment: null
	}; // getters

	var getters$7 = {}; // actions

	var actions$7 = {
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
	              commit('settings/SET_LOADING', true, {
	                root: true
	              });
	              _context.next = 5;
	              return rootState.api.client.apis.Comments.get_all({
	                search_term: search || undefined
	              });

	            case 5:
	              res = _context.sent;
	              commit('SET_COMMENTS', req.body);
	              commit('settings/SET_LOADING', false, {
	                root: true
	              });
	              _context.next = 14;
	              break;

	            case 10:
	              _context.prev = 10;
	              _context.t0 = _context["catch"](1);
	              commit('settings/SET_LOADING', false, {
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
	  postComment: function postComment(_ref2, cmt) {
	    var state = _ref2.state,
	        commit = _ref2.commit,
	        rootState = _ref2.rootState;
	    commit('settings/SET_LOADING', true, {
	      root: true
	    });
	    rootState.api.client.apis.Comments.post({
	      comment: cmt
	    }).then(function (req) {
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
	    });
	  }
	}; // mutations

	var mutations$7 = {
	  SET_MEDIA: function SET_MEDIA(state, media) {
	    state.media = media;
	  }
	};
	var comments = {
	  namespaced: true,
	  state: state$7,
	  getters: getters$7,
	  actions: actions$7,
	  mutations: mutations$7
	};

	// TODO add project store module

	var C3SStore = /*#__PURE__*/Object.freeze({
		api: api,
		user: user,
		activity: activity$1,
		task: task,
		submission: submission,
		media: media,
		upload: upload,
		comments: comments
	});

	var modules = [{
	  name: 'c3s',
	  module: api
	}, {
	  name: ['c3s', 'user'],
	  module: user
	}, {
	  name: ['c3s', 'activity'],
	  module: activity$1
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

	return C3SPlugin;

})));
