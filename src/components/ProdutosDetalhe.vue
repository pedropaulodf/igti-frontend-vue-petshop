<template>
  <v-app>
    <CarrinhoComprasIcone :listaCarrinhoCompras="listaCarrinho"></CarrinhoComprasIcone>
    <v-container>
      <v-btn
        color="primary"
        @click="voltarParaLoja"
      >
        Voltar para a loja
      </v-btn>
      
      <v-row>
        <v-col md="12" sm="12" xs="12" v-for="(produto, index) in produtos" :key="index">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              :src="produto.foto"
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
import CarrinhoComprasIcone from '@/components/CarrinhoComprasIcone';

export default {
  components:{
    CarrinhoComprasIcone
  },
  data() {
    return {
      produtos: [],
      listaCarrinho: [],
    }
  },
  async mounted() {
    // this.produtos = await this.buscarProdutos();
    this.produtos = await this.buscarProduto();
  },
  methods: {
    async buscarProduto() {
      const { data } = await api.get(`produtos?id=${this.$route.params.id}`);
      return data;
    },
    voltarParaLoja() {
      this.$router.push({path: '/loja', params: {'listaCarrinho': this.listaCarrinho}});
    },
    adicionarAoCarrinho(produto){
      // code
      this.listaCarrinho.push(produto);
      // localStorage.setItem('listaCarrinho', JSON.stringify(this.listaCarrinho));
      // alert(nome + " • de " + preco + " / por" + desconto);
    }
  }
}
</script>

<style scoped>
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
</style>