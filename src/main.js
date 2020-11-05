import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(Vuex);
Vue.use(VueToast);

const store = new Vuex.Store({
  state: {
    listaCart: [],
    totalListaCart: 0
  },
  mutations: {
    adicionarItemCart: (state, produto) => {
      state.listaCart.push(produto)
      state.totalListaCart = state.listaCart.reduce((acc, cur) => {
        if (cur.desconto) {
          return acc += cur.desconto;
        }
        return acc += cur.preco;
      }, 0);
    },
    retirarItemCart: (state, index) => {
      state.listaCart.splice(index, 1)
      state.totalListaCart = state.listaCart.reduce((acc, cur) => {
        if (cur.desconto) {
          return acc += cur.desconto;
        }
        return acc += cur.preco;
      }, 0);
    },
  },
});


Vue.filter('grana', (value) => {
  if (typeof value !== 'number') {
    return value;
  } 
  return `R$ ${value.toFixed(2)}`;
} );

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
  store
}).$mount('#app')
