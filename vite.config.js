import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const BASE_ENV = JSON.parse(env.VITE_BASE_ENV)
  return {
    base: '/api/conweb/',
    plugins: [
      vue(), vueJsx(),
      Components({
        resolvers: [VantResolver()],
      }),
      // legacy({
      //   targets: ['defaults', 'not IE 11'],
      // }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      cors:true,    //允许跨域
      proxy: {
        '/api/v0': {
          // autoRewrite:true,
          target: BASE_ENV.api,
          // target: 'http://test.aicaring.com',
          changeOrigin: false,
          ws:true,
          rewrite: (path) => {
            console.log('api', path)
            // return path.replace('^/api/v0', '/api/v0')
            return path.replace('/api/v0', '')
            // return path
          }
        }
      }
    },
  }
})
