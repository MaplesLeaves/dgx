/*
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-09-28 17:19:53
 * @LastEditors:  
 * @LastEditTime: 2020-10-10 14:37:02
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
        component: () => import('../views/rule/basics'),
      },
      ]
    }
  ]
}]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router