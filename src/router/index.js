import Vue from 'vue'
import VueRouter from 'vue-router'
import Loja from '../views/Loja.vue'

import Petshop from '@/views/Petshop'

Vue.use(VueRouter)

const routes = [
  {
    path: '/loja',
    name: 'Loja',
    component: Loja
  },
  {
    path: '/petshop',
    name: 'Petshop',
    component: Petshop
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
