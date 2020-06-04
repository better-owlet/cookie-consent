import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';

const getVersion = require('./scripts/version');
const pkg = require('./package.json');
async function getConfig() {
  const version = await getVersion();
  const config = {
    input: `src/index.ts`,
    output: [
      {file: pkg.main, name: 'CookieConsent', format: 'umd', sourcemap: true},
      {file: pkg.module, format: 'es', sourcemap: true},
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: 'src/**',
    },
    plugins: [
      postcss({
        minimize: true,
        // extract: path.resolve('dist/cookie-consent.css'),
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        __VERSION__: JSON.stringify(version),
      }),
      // Compile TypeScript files
      typescript({useTsconfigDeclarationDir: true}),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      terser({
        include: [/^.+\.min\.js$/, '*umd*'],
      }),
      filesize(),
    ],
  };
  if (process.env.NODE_ENV === 'development') {
    config.plugins = [
      ...config.plugins,
      serve({
        open: true,
        openPage: '/examples/index.html',
        contentBase: '',
        port: 2046,
        host: '0.0.0.0',
      }),
      livereload({verbose: false}),
    ];
  }
  return config;
}

export default getConfig();
