import * as C3SStore from './store/index';
import Swagger from 'swagger-client';

const moduleName = 'c3s';
const modules = [
	{
		name: 'c3s',
		module: C3SStore.api
	},
	{
		name: ['c3s', 'user'],
		module: C3SStore.user
	},
	{
		name: ['c3s', 'activity'],
		module: C3SStore.activity
	},
	{
		name: ['c3s', 'task'],
		module: C3SStore.task
	},
	{
		name: ['c3s', 'media'],
		module: C3SStore.media
	},
	{
		name: ['c3s', 'submission'],
		module: C3SStore.submission
	},
	{
		name: ['c3s', 'comments'],
		module: C3SStore.comments
	},
]

const C3SPlugin = {

	install(Vue, options = {}) {

		const store = options.store;
		const swaggerURL = options.swaggerURL;
		if (!store || !swaggerURL) {
			console.error('C3S: Missing store and/or Swagger URL params.');
			return;
		}

		for(let i in modules) {
			const m = modules[i];
			store.registerModule(m['name'], m['module']);
			// if (store.state.hasOwnProperty(m['name']) === false) {
			// 	console.error('C3S: C3S vuex module is not correctly initialized. Please check the module name:', m['name']);
			// 	return;
			// }
			// TODO check why store reports this as false when it is created
		}

		Swagger({
			url: options.swaggerURL,
			requestInterceptor(req) {
				// let u = store.getters['user/currentUser']
				// if (u !== null) {
				//   req.headers['X-API-KEY'] = u.api_key
				// }
				// return req
			}
		}).then(client => {
			console.log('Loaded');
			store.commit('c3s/SET_API', client);


			Vue.prototype.$c3s = {
				store: C3SStore
			};
			Vue.c3s = {
				store: C3SStore
			};
		}).catch(err => {
			console.error('C3S: URL was not found or an initialisation error occurred');
			console.error(err);
			return;
		});
	}
};

export default C3SPlugin;
