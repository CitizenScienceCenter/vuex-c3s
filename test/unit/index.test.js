import Vuex from 'vuex'
import Vue from 'vue'
import * as utils from '../utils'
import * as config from '../unit_config'
import * as UserTests from './user'
import * as ActivityTests from './activity'

Vue.use(Vuex)

const store = new Vuex.Store({})
const apiURL = 'https://api-staging.citizenscience.ch/v3/openapi.json'
const server = 'http://localhost:9000/v3/'
const user = null
beforeAll(function (done) {
  utils.createStore(store, {'apiURL': apiURL, 'server': server}, config.modules, (c) => {
    setTimeout(() => {
      done()
    }, 2000);
  })
})

describe('plugin loaded check', () => {
  it('has a client ready and loaded as an object', () => {
    console.dir(store.state.c3s.client.apis.Activities)
    expect(store.state.c3s.hasOwnProperty('client')).toBe(true)
  })
})

UserTests.registerAnonymousTest(store)
// UserTests.registerUserTest(store, config.test_user);
ActivityTests.createActivityTest(store)
