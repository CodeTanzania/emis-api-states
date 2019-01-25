import babel from 'rollup-plugin-babel'; // eslint-disable-line
import pkg from './package.json';

export default {
  input: 'src/index.js',
  external: [
    '@codetanzania/emis-api-client',
    'axios',
    'inflection',
    'lodash',
    'lodash/camelCase',
    'lodash/forIn',
    'lodash/get',
    'lodash/isFunction',
    'lodash/isObject',
    'lodash/lowerFirst',
    'lodash/merge',
    'lodash/split',
    'lodash/upperFirst',
    'prop-types',
    'react',
    'redux',
    'react-redux',
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
};