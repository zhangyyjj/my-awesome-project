import { createRouter, createWebHistory } from 'vue-router'

const generalRouter = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/NetworkError',
    name: 'NetworkError',
    meta: {
      title: 'NetworkError'
    },
    component: () => import('@/views/error/NetworkError.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: generalRouter
})

export default router
