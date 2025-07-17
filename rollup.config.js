const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;

const config = [
  {
    input: {
      index: 'src/index.ts',
      'api/index': 'src/api/index.ts',
      'api/_enums/index': 'src/api/_enums/index.ts',
      'api/_types/index': 'src/api/_types/index.ts',
    },
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        entryFileNames: '[name].js',
      },
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        entryFileNames: '[name].esm.js',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    external: [
      'react',
      'axios',
      '@nextui-org/modal',
      '@nextui-org/card',
      '@nextui-org/button',
      'framer-motion',
    ],
  },
  {
    input: {
      index: 'src/index.ts',
      'api/index': 'src/api/index.ts',
      'api/_enums/index': 'src/api/_enums/index.ts',
      'api/_types/index': 'src/api/_types/index.ts',
    },
    output: [{ dir: 'dist', format: 'es' }],
    plugins: [dts({ tsconfig: './tsconfig.json' })],
  },
];
module.exports = config;
