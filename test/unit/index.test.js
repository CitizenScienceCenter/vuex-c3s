import Vuex from 'vuex';
import Vue from 'vue';
import * as utils from '../utils';
import * as config from '../unit_config';
import {registerAnonymousTest} from "./user";
import {createActivityTest} from "./activity";

Vue.use(Vuex);

let store = new Vuex.Store({});
const swaggerURL = 'http://localhost:8080/api/v2/swagger.json';
let user = null;
beforeAll(function(done) {
    utils.createStore(store, swaggerURL, config.modules, (c) => {
        done();
    });
});

describe('pluginLoadedCheck', () => {
    it('has a client ready and loaded as an object', () => {
        expect(store.state.c3s.hasOwnProperty('client')).toBe(true);
    });
});

registerAnonymousTest(store);
createActivityTest(store);
