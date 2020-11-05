<template>
  <div class="text-center">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="diretaTopo">
            <v-badge overlap :content="listaCart.length <= 0 ? '0' : listaCart.length" color="deep-orange">
              <v-btn
                class="mx-2"
                fab
                dark
                color="deep-orange darken-4"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark> mdi-cart </v-icon>
              </v-btn>
            </v-badge>
          </div>
        </template>

        <v-card>

          <v-list v-for="(item, index) in listaCart" :key="index">

            <v-list-item-group color="primary">
              <v-list-item>

                <v-list-item-avatar>
                  <v-img :src="item.foto"></v-img>
                </v-list-item-avatar>

                <v-list-item-title>{{item.nome}} • ({{item.desconto ? item.desconto : item.preco | grana}})</v-list-item-title>
                <v-list-item-icon @click="retirarItemCart(index)">
                  <v-icon>mdi-close</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>

          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-list-item-title>Total: {{totalListaCart | grana}}</v-list-item-title>
            </v-list-item>
          </v-list>

        </v-card>
      </v-menu>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['listaCarrinhoCompras'],
  data: () => {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  computed: {
    carrinhoLista: function () {
      // let lista = localStorage.getItem('listaCarrinho');
      // return JSON.parse(lista);
      return this.listaCarrinhoCompras;
    },
    totalCarrinho: function () {
      let totalSoma = this.carrinhoLista.reduce((acc, cur) => {
        return acc += cur.preco;
      }, 0);
      return totalSoma;
    },
    ... mapState({
      listaCart: state => state.listaCart,
      totalListaCart: state => state.totalListaCart
    })
  },
  methods: {
    removeItemLista(item) {
      this.$delete(this.carrinhoLista, this.carrinhoLista.findIndex(itemRemocao => itemRemocao.id === item.id), item);
      // localStorage.setItem('listaCarrinho', JSON.stringify(this.carrinhoLista));
    },
    ... mapMutations([
      'retirarItemCart'
    ])
  }
}
</script>

<style>
.diretaTopo {
  position: fixed;
  right: 20px;
  top: 86px;
  z-index: 1;
}
</style>