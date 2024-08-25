import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
      },
    ],
    plugins: [typescript(), nodeResolve()],
    external: ['react', 'axios'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: 'src/hooks/bridge/index.ts',
    output: [
      {
        file: 'dist/bridge/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/bridge/index.mjs',
        format: 'es',
      },
    ],
    plugins: [typescript(), nodeResolve()],
    external: ['react', 'axios'],
  },
  {
    input: 'src/hooks/bridge/index.ts',
    output: [{ file: 'dist/bridge/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

export default config;
