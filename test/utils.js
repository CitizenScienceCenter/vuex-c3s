import c3s from '../dist/vuex-c3s.es';
import Swagger from 'swagger-client';

export const createStore = (store, url, cb) => {
	store.registerModule('c3s', c3s.store.api);
	store.registerModule(['c3s', 'user'], c3s.store.user);
	store.registerModule(['c3s', 'settings'], c3s.store.settings);
	Swagger({
		url: url,
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
		cb();
	});
};
