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
      proxy: {
        '/api/v0': {
          target: BASE_ENV.api,
          changeOrigin: true,
          rewrite: (path) => {
            console.log('api', path)
            return path.replace('/api/v0', '')
          }
        }
      }
    },
  }
})
