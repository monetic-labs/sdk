const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;

const config = [
  {
    input: {
      index: 'src/index.ts',
      hooks: 'src/hooks/index.ts',
      api: 'src/api/index.ts',
      components: 'src/components/index.ts',
    },
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
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
      hooks: 'src/hooks/index.ts',
      api: 'src/api/index.ts',
      enums: 'src/api/_enums/index.ts',
      types: 'src/api/_types/index.ts',
      components: 'src/components/index.ts',
    },
    output: [{ dir: 'dist', format: 'es' }],
    plugins: [dts({ tsconfig: './tsconfig.json' })],
  },
];
module.exports = config;
