const env = import.meta.env.MODE || 'production'
const envConfig = {
  development: {
    baseApi: '/api',
    // 开发环境mock地址
    mockApi: 'http://127.0.0.1:4523/m1/1319371-0-default'
  },
  production: {
    baseApi: '/api',
    mockApi: ''
  }
}

export default {
  env,
  mock: false,
  projectName: 'zyj',
  namespace: 'zyj',
  ...envConfig[env]
}
