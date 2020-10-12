/*
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-09-28 17:19:53
 * @LastEditors:  
 * @LastEditTime: 2020-10-09 15:12:31
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue'),
  children: [{
      path: '/tree',
      name: 'tree',
      component: () => import('../views/tree.vue'),
    },
    {
      path: '/carte',
      name: 'carte',
      component: () => import('../views/carte.vue'),
    },
    {
      path: '/role',
      name: 'role',
      component: () => import('../views/role.vue'),
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