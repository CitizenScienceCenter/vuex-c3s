// note: this will require a install of the rollup utility to process
// our plugin code

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.js',
	plugins: [
		babel({
			externalHelpers: true,
			runtimeHelpers: true,
			exclude : 'node_modules/**',
		}),
		commonjs()
	],
	output: [
		{ file: 'dist/vuex-c3s.es.js', format: 'es', globals: { 'swagger-client': 'Swagger', 'Vuex': 'vuex'} },
		{ file: 'dist/vuex-c3s.cjs.js', format: 'cjs', globals: { 'swagger-client': 'Swagger', 'Vuex': 'vuex'} },
		{ file: 'dist/vuex-c3s.umd.js', format: 'umd', name: 'vuexC3S', globals: { 'swagger-client': 'Swagger', 'vuex': 'Vuex'} }
	]
};
