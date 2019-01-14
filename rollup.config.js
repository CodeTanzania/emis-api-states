import babel from 'rollup-plugin-babel'; // eslint-disable-line
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: [
      '@codetanzania/emis-api-client',
      'axios',
      'inflection',
      'lodash',
      'lodash/forIn',
      'lodash/get',
      'lodash/isObject',
      'lodash/merge',
      'lodash/toLower',
      'lodash/upperFirst',
      'react',
      'react-redux',
      'redux',
      'redux-starter-kit',
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
];
