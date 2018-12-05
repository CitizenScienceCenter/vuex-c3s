import c3s from '../dist/vuex-c3s.es';
import Swagger from 'swagger-client';

export const createStore = (store, url, modules=[], cb) => {
	if (modules && modules.length > 0) {
		for(let i in modules) {
			const m = modules[i];
			store.registerModule(m['name'], m['module']);
		}
	}
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
