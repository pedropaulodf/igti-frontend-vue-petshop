import Vue from 'vue'
import VueRouter from 'vue-router'
import Loja from '../views/Loja'
// import Admin from '@/views/Admin'

import Petshop from '@/views/Petshop'
import ProdutosLista from '@/components/ProdutosLista'
import ProdutosDetalhe from '@/components/ProdutosDetalhe'

Vue.use(VueRouter)

const routes = [
  {
    path: '/petshop',
    name: 'Petshop',
    component: Petshop
  },
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: Admin,
  //   meta: {
  //     protegida: true
  //   }
  // },
  {
    path: '/',
    name: 'Loja',
    component: Loja,
      children: [
        { path: '', name: 'ProdutosLista', component: ProdutosLista },
        { path: 'loja', name: 'ProdutosLista', component: ProdutosLista },
        { path: ':id', name: 'ProdutosDetalhe', component: ProdutosDetalhe }
      ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   // console.log('Verificando se rota é protegida ou não');
//   if (to.meta.protegida) {
//     // console.log('Tentou acessar página protegida');
//     router.push('/');
//   }
//   next();
// })

export default router
