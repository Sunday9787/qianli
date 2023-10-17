import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import path from 'path/posix'
import outputManifest from 'rollup-plugin-output-manifest'
import terser from '@rollup/plugin-terser'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: ['./frontend/js/layout.ts', './frontend/js/common.ts', './frontend/js/index.ts'],
  external: ['jQuery', 'Swiper', '@sunday9787/log'],
  external: ['jQuery', '@sunday9787/log'],
  output: {
    dir: path.resolve('./public/js'),
    amd: {
      forceJsExtensionForImports: true
    },
    entryFileNames: '[name].[hash:8].js',
    format: 'amd',
    plugins: [
      babel({
        babelHelpers: 'runtime',
        babelrc: false,
        extensions: DEFAULT_EXTENSIONS.concat(['.ts']),
        presets: [
          '@babel/preset-typescript',
          [
            '@babel/preset-env',
            {
              modules: 'cjs',
              useBuiltIns: 'usage',
              targets: 'ie>=9',
              corejs: 3
            }
          ]
        ],
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]]
      })
    ],
    manualChunks: {
      jQuery: ['jQuery'],
      Swiper: ['Swiper'],
      log: ['@sunday9787/log']
    }
  },
  plugins: [
    commonjs(),
    resolve(),
    typescript({ tsconfig: './frontend/tsconfig.json' }),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'cjs',
            useBuiltIns: 'usage',
            targets: { ie: '9' },
            corejs: 3
          }
        ]
      ],
      plugins: [['@babel/plugin-transform-runtime']]
    }),
    outputManifest.default({ publicPath: '/js/', outputPath: './src', fileName: 'js-manifest.json' })
    // terser({ maxWorkers: 4, ecma: 5, ie8: true })
  ]
})
