import axios from 'axios'
import config from '@/config'
import { ElMessage, ElLoading, ElMessageBox } from 'element-plus'
import router from '@/router'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
// 接口请求 全局 loading
let loadingInstance
let requestCount = 0
const requestLoading = {
  show: () => {
    if (requestCount === 0) {
      loadingInstance = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    requestCount++
  },
  hide: () => {
    if (requestCount <= 0) return
    requestCount--
    if (requestCount === 0) {
      loadingInstance.close()
    }
  }
}

let service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
  // do something
  return req
})
// 响应拦截
service.interceptors.response.use(
  (res) => {
    // do something
  },
  (error) => {
    if (error.message && !error.config) {
      return Promise.reject(error)
    }
    error.config.hideLoading || requestLoading.hide()
    // 网络请求超时 或 断网情况下发起的请求
    if (error.message.includes('timeout') || error.message === 'Network Error') {
      const route = router.currentRoute._rawValue
      route.path === '/login' || router.push({ path: '/networkError' })
      return Promise.reject({ code: 504, message: '网络请求超时' })
    }
    ElMessage.error('网络连接失败，请稍后重试')
    return Promise.reject(error)
  }
)
/**
 * @description: 请求核心函数
 * @param {*} options - 请求配置
 */
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') options.params = options.data

  let isMock = config.mock
  if (typeof options.mock != 'undefined') {
    isMock = options.mock
  }

  // 避免生产环境调用mock
  if (config.env === 'production') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}
export default request
