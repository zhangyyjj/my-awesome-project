// const path = require('path')
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const alias = {
    '@': path.resolve(__dirname, './src')
  }
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox等
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ]
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            customCollections: ['zyj']
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ]
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        customCollections: {
          rpa: FileSystemIconLoader('src/assets/svg', (svg) => svg.replace(/^<svg /, '<svg '))
        }
      }),
      Inspect()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 这里写你想导入全局scss变量的路径，注意只能写相对路径，alias貌似在css中不会生效
          //   additionalData: '@use "src/assets/styles/index.scss" as *;'
        }
      }
    },
    server: {
      host: 'localhost',
      port: 8222,
      open: true,
      // 设置 https 代理
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:4523/m1/1307657-0-default',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    base: './',
    //设置别名
    resolve: {
      alias
    }
  }
})
