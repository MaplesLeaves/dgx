/*
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-09-28 17:19:53
 * @LastEditors:  
 * @LastEditTime: 2020-10-13 10:38:17
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue'),
  meta:{
    title: '主页'
  },
  children: [{
      path: '/tree',
      name: 'tree',
      component: () => import('../views/tree.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo.vue'),
    },
    {
      path: '/carte',
      name: 'carte',
      component: () => import('../views/carte.vue'),
      meta:{
        title: '菜单管理'
      }
    },
    {
      path: '/role',
      name: 'role',
      component: () => import('../views/role.vue'),
      meta: {
        title: '角色管理'
      }
    },
    {
      path: '/rule',
      name: 'Rule',
      component: () => import('../views/rule/index.vue'),
      children: [
        {
          path: '/',
          name: 'Basics',
          meta: { 
            title: '基本法编辑'
          },
          component: () => import('../views/rule/basics'),
        },
        {
          path: 'versions',
          name: 'Versions',
          meta: { 
            title: '机构版本'
          },
          component: () => import('../views/rule/versions.vue'),
        },
        {
          path: 'isPerformance',
          name: 'IsPerformance',
          meta: { 
            title: '时候绩优人力备份'
          },
          component: () => import('../views/rule/isPerformance.vue'),
        },
      ]
    },
    {
      path: '/deploy',
      name: 'deploy',
      component: () => import('../views/deploy.vue'),
      meta: {
        title: '统计报表'
      }
    },
    {
      path: '/deployInfo',
      name: 'deployInfo',
      component: () => import('../views/deployInfo.vue'),
      meta: {
        title: '统计报表详情'
      }
    },
    {
      path: '/detailEdit',
      name: 'detailEdit',
      component: () => import('../views/detailEdit.vue'),
      meta: {
        title: '明细报表'
      }
    },
    {
      path: '/detailInfo',
      name: 'detailInfo',
      component: () => import('../views/detailInfo.vue'),
      meta: {
        title: '明细报表详情'
      }
    },
  ]
}]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router