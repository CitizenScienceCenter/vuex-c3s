// note: this will require a install of the rollup utility to process
// our plugin code

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.js',
	plugins: [
		babel({
			externalHelpers: false,
			exclude : 'node_modules/**'
		}),
		commonjs()
	],
	output: [
		{ file: 'dist/vuex-c3s.es.js', format: 'es' },
		{ file: 'dist/vuex-c3s.cjs.js', format: 'cjs' },
		{ file: 'dist/vuex-c3s.umd.js', format: 'umd', name: 'vuexC3S' }
	]
};
