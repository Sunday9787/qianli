import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import path from 'path/posix'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuePugPlugin from 'vue-pug-plugin'
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(function (env) {
  return {
    mode: env.mode,
    server: {
      port: 5173
    },
    plugins: [
      vue({
        template: {
          preprocessOptions: {
            plugins: [vuePugPlugin]
          }
        }
      }),
      vueJsx(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: loadEnv(env.mode, process.cwd())
        },
        entry: '/src/main.ts',
        template: 'index.html'
      }),
      AutoImport({
        dts: './src/@types/auto-imports.d.ts',
        imports: [
          'vue',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ]
      }),
      Components({
        extensions: ['vue', 'tsx', 'jsx', 'ts'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx/, /\.jsx/],
        dts: './src/@types/components.d.ts',
        exclude: ['./src/components/index.ts'],
        resolvers: [NaiveUiResolver()]
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.join(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      manualChunksPlugin(),
      splitVendorChunkPlugin()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            if (!assetInfo.name) return 'index'

            const info = assetInfo.name.split('.')
            let extType = info[info.length - 1]

            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'media'
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = 'img'
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = 'fonts'
            }

            return `static/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'static/js/[name].[hash].js',
          entryFileNames: 'static/js/[name].[hash].js'
        }
      }
    }
  }
})
