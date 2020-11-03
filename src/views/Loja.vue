<template>
  <v-app>
    <v-container>
      <h1>Produtos</h1>
      <v-row>
        <v-col md="4" sm="6" xs="12" v-for="(produto, index) in produtos" :key="index">
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

            <v-card-subtitle class="pb-0">
              {{produto.preco | grana}} 
              {{produto.desconto | grana}}
            </v-card-subtitle>

            <v-card-text class="text--primary descricao">
              {{produto.descricao}}
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                block
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
export default {
  data() {
    return {
      produtos: [],
    }
  },
  async mounted() {
    this.produtos = await this.buscarProdutos();
  },
  methods: {
    async buscarProdutos() {
      const { data } = await api.get("produtos");
      return data;
    },
  }
}
</script>

<style scoped>
.descricao {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
