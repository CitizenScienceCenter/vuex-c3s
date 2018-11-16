import Vuex from 'vuex';
import Vue from 'vue';
import * as utils from '../utils';

Vue.use(Vuex);

let store = new Vuex.Store({});
const swaggerURL = 'http://localhost:8080/api/v2/swagger.json';

beforeAll(function(done) {
	utils.createStore(store, swaggerURL, (c) => {
		done();
	});
});

describe('pluginLoadedCheck', () => {
	it('has a client ready and loaded as an object', () => {
		expect(store.state.c3s.hasOwnProperty('client')).toBe(true);
	});
});

describe('registerAnon', () => {
	it('created an anonymous user', async() => {
		store.dispatch('c3s/user/generateAnon').then(u => {
			expect(u).toBeInstanceOf(Object);
			expect.objectContaining({
				'api_key': expect.any(String),
				'username': expect.any(String),
				'id': expect.any(String)
			});
		});
	});
});
