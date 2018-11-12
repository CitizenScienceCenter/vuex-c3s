import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  // {
  // 	entry: 'src/index.js',
  // 	format: 'umd',
  // 	moduleName: 'c3s',
  // 	plugins: [
  // 		babel({
  // 			exclude: ['node_modules/**']
  // 		}),
  // 		commonjs()
  // 	]
  // },
  {
    input: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
		babelrc: true,
		externalHelpers: true,
		runtimeHelpers: true

      }),
      commonjs(),

    ],
    output: [{
        file: 'dist/vuex-c3s.es.js',
        format: 'es',
        globals: {
          'swagger-client': 'Swagger',
          'Vuex': 'vuex'
        }
      },
      {
        file: 'dist/vuex-c3s.cjs.js',
        format: 'cjs',
        globals: {
          'swagger-client': 'Swagger',
          'Vuex': 'vuex'
        }
      },
      {
        file: 'dist/vuex-c3s.umd.js',
        format: 'umd',
        name: 'vuexC3S',
        globals: {
          'swagger-client': 'Swagger',
          'vuex': 'Vuex'
        }
      }
    ]
  }

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  // {
  // 	entry: 'src/index.js',
  // 	external: ['swagger-client', 'store'],
  // 	targets: [
  // 		{ dest: pkg.main, format: 'cjs' },
  // 		{ dest: pkg.module, format: 'es' }
  // 	],
  // 	plugins: [
  // 		babel({
  // 			exclude: ['node_modules/**']
  // 		})
  // 	]
  // }
];