import Vuex from 'vuex';
import Vue from 'vue';
import * as utils from '../utils';
import * as config from '../unit_config';
import * as UserTests from "./user";
import * as ActivityTests from "./activity";

Vue.use(Vuex);

let store = new Vuex.Store({});
const swaggerURL = 'https://wenker.citizenscience.ch/api/v2/swagger.json';
let user = null;
beforeAll(function(done) {
    utils.createStore(store, swaggerURL, config.modules, (c) => {
        done();
    });
});

describe('plugin loaded check', () => {
    it('has a client ready and loaded as an object', () => {
        expect(store.state.c3s.hasOwnProperty('client')).toBe(true);
    });
});

UserTests.registerAnonymousTest(store);
// UserTests.registerUserTest(store, config.test_user);
ActivityTests.createActivityTest(store);
