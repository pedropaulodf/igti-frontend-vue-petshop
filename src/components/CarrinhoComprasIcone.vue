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
          <v-badge
            overlap
            :value="listaCart.length"
            :content="listaCart.length"
            color="success"
          >
            <v-btn
              class="mx-2"
              fab
              dark
              color="green darken-4"
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

              <v-list-item-title
                >{{ item.nome }} • ({{
                  item.desconto ? item.desconto : item.preco | grana
                }})</v-list-item-title
              >
              <v-list-item-icon @click="removeItemLista(index, item.nome)">
                <v-icon>mdi-close</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-title class="space-between">
              <div>Total:</div>
              <div>
                <strong>{{ totalListaCart | grana }}</strong>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data: () => {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      messages: 0,
    };
  },
  computed: {
    // carrinhoLista: function () {
    //   let lista = localStorage.getItem('listaCarrinho');
    //   return JSON.parse(lista);
    //   return this.listaCarrinhoCompras;
    // },
    // totalCarrinho: function () {
    //   let totalSoma = this.carrinhoLista.reduce((acc, cur) => {
    //     return acc += cur.preco;
    //   }, 0);
    //   return totalSoma;
    // },
    ...mapState({
      listaCart: (state) => state.listaCart,
      totalListaCart: (state) => state.totalListaCart,
    }),
  },
  methods: {
    removeItemLista(item, nome) {
      // this.$delete(this.carrinhoLista, this.carrinhoLista.findIndex(itemRemocao => itemRemocao.id === item.id), item);
      this.$store.commit("retirarItemCart", item);
      this.$toast.info(`<p style="font-family:Roboto, sans-serif;">Produto (${nome}) excluído ao carrinho!</p>`,{
          type: "info",
          duration: 4000,
        }
      );
    }
  },
};
</script>

<style>
.diretaTopo {
  position: fixed;
  right: 20px;
  top: 86px;
  z-index: 1;
}
.space-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>