import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'

Vue.use(VueRouter)
// SPA
// 首屏加载速度很慢
// 路由懒加载
//  - 使用到了路由页面，再去请求它

// 懒加载的chunk 默认的名字是模块的路径
// webpack魔法注释： /* webpackChunkName: "新名字" */

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base" */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
