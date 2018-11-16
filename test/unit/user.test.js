import c3s from '../../dist/vuex-c3s.es';
import Vuex from 'vuex';
import Vue from 'vue';
import Swagger from 'swagger-client';

Vue.use(Vuex);

const store = new Vuex.Store({});
const swaggerURL = 'http://localhost:8080/api/v2/swagger.json';

beforeAll(function(done) {
	store.registerModule('c3s', c3s.store.api);
	store.registerModule(['c3s', 'user'], c3s.store.user);
	store.registerModule(['c3s', 'settings'], c3s.store.settings);
	Swagger({
		url: swaggerURL,
		requestInterceptor(req) {
			// req.headers['content-type'] = 'application/json'
			let u = store.state.c3s.user.currentUser;
			if (u) {
				req.headers['X-API-KEY'] = u.api_key;
			}
			return req;
		}
	}).then(client => {
		store.commit('c3s/SET_API', client);
		done();
	});
});

describe('pluginLoading', () => {
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
