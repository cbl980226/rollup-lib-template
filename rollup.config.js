const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const fs = require('./tools/fs');
const pkg = require('./package.json');

console.log((process.env.NODE_ENV = 'production'));

/**
 * @type {import("rollup").RollupOptions}
 */
module.exports = (cmd) => {
  const outputDir = cmd.dir || 'dist';

  fs.deleteOutputDir(outputDir);

  return {
    input: {
      index: 'src/index.ts',
    },
    output: [
      {
        format: 'umd',
        name: 'rollupLib',
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name].[format].js',
      },
      {
        format: 'esm',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
      {
        format: 'cjs',
        entryFileNames: '[name].cjs',
        chunkFileNames: '[name].cjs',
      },
    ].map((out) => ({
      ...out,
      dir: outputDir,
      banner: '/* my-library version ' + pkg.version + ' */',
      sourcemap: true,
    })),
    plugins: [
      resolve(),
      commonjs({ extensions: ['.js', '.ts'] }),
      babel({
        babelrc: false,
        babelHelpers: 'runtime',
        exclude: [/node_modules(?!lodash)/],
      }),
      typescript({
        tsconfig: 'tsconfig.lib.json',
      }),
    ],
  };
};
