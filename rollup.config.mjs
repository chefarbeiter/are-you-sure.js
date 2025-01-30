import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/confirmation.js',
  output: {
    file: 'dist/are-you-sure.bundle.js',
    format: 'umd',
    name: "areYouSure"
  },
  plugins: [
    nodeResolve({
      exportConditions: ['development']
    })
  ],
};