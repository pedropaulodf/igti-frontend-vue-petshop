<template>
  <v-app>
    <CarrinhoComprasIcone :listaCarrinhoCompras="listaCarrinho"></CarrinhoComprasIcone>
    <v-container>
      <h1>Produtos</h1>
      <v-row>
        <v-col md="4" sm="6" xs="12" v-for="(produto, index) in produtos" :key="index">
          <v-card>
            <v-img
              class="white--text align-end cardImg"
              height="200px"
              :src="produto.foto"
              @click="verDetalhesProduto(produto.id)"
            >
            </v-img>

            <v-card-title>
              {{produto.nome}}
            </v-card-title>

            <v-card-subtitle class="pb-0 precos">
              <span v-if="produto.desconto" class="preco ">
                {{produto.desconto | grana}}
              </span>
              <span :class="produto.desconto ? 'preco desconto' : 'preco'">
                {{produto.preco | grana}} 
              </span>
            </v-card-subtitle>

            <v-card-text class="text--primary descricao">
              {{produto.descricao}}
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                block
                @click="adicionarAoCarrinho(produto)"
              >
                Comprar
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import api from "@/services/api.js";
import { mapState, mapMutations } from 'vuex';
import CarrinhoComprasIcone from '@/components/CarrinhoComprasIcone';

export default {
  components:{
    CarrinhoComprasIcone
  },
  data() {
    return {
      produtos: [],
      listaCarrinho: []
    }
  },
  async mounted() {
    // this.produtos = localStorage.getItem('listaCarrinho');
    this.produtos = await this.buscarProdutos();
  },
  methods: {
    async buscarProdutos() {
      const { data } = await api.get("produtos");
      return data;
    },
    verDetalhesProduto(produtoId) {
     this.$router.push({name: 'ProdutosDetalhe', params: {id: produtoId}}) 
    },
    adicionarAoCarrinho(produto){
      // code
      // this.listaCarrinho.push(produto);
      this.$store.commit('adicionarItemCart', produto);
      this.$toast.success(`<p style="font-family:Roboto, sans-serif;">Produto (${produto.nome}) adicionado ao carrinho!</p>`,{
        type: "success",
        duration: 4000,
      })
      // localStorage.setItem('listaCarrinho', JSON.stringify(this.listaCarrinho));
      // alert(nome + " • de " + preco + " / por" + desconto);
    },
    ... mapMutations([
      'adicionarItemCart'
    ])
  },
  computed: {
    ... mapState({
      listaCart: state => state.listaCart,
    })
  }
}
</script>

<style scoped>
.descricao {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.desconto {
  text-decoration: line-through;
  opacity: 0.5;
  float: right;
  margin-right: 5px;
}
.precos{
  margin-bottom: 30px;
}
span.preco {
  font-size: 1.4em;
  float: right;
  font-weight: bold;
}
.cardImg{
  cursor: pointer;
}
</style>