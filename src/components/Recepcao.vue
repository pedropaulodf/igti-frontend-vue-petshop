<template>
  <v-container>
    <h1>Bem vindo ao Petshop</h1>
    <v-form @submit.prevent="cadastrarCliente">
      <v-text-field
        label="Nome do cliente"
        v-model="cliente.nome"
        outlined
      ></v-text-field>

      <v-select
        label="Raça do cachorro"
        v-model="cliente.raca"
        :items="racas"
        item-text="nome"
        outlined
      ></v-select>

      <v-text-field
        type="number"
        label="Idade"
        v-model="cliente.idade"
        :rules="rulesInputIdade"
        outlined
      ></v-text-field>

      <v-select
        label="Serviço"
        v-model="cliente.servico"
        :items="servicos"
        outlined
      >
        <template v-slot:selection="data">
          {{ data.item.nome }}
        </template>

        <template v-slot:item="data">
          {{ data.item.nome }} ({{ data.item.preco | grana }})
        </template>
      </v-select>

      <v-textarea
        v-if="cliente.servico.tipo === 'consulta'"
        v-model="cliente.servico.observacoes"
        label="Sintomas"
        outlined
      ></v-textarea>

      <v-btn
        color="success"
        @click="cadastrarCliente"
        v-bind:disabled="
          cliente.idade >= 30 ||
          cliente.nome.length === 0 ||
          cliente.raca.length === 0 ||
          cliente.idade.length === 0 ||
          cliente.servico.tipo.length === 0
        "
      >
        Cadastrar cliente
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import api from "@/services/api.js";
import Cachorro from "@/models/cachorro";

export default {
  data() {
    return {
      cliente: new Cachorro(),
      racas: [],
      servicos: [],
      rulesInputIdade: [
        (value) => !!value || "Required.",
        (value) => value <= 30 || "Tem certeza que é um cahorro?",
      ],
    };
  },
  async created() {
    this.racas = await this.buscarRacas();
    this.servicos = await this.buscarServicos();
  },
  methods: {
    async buscarRacas() {
      const { data } = await api.get("racas?_sort=nome");
      return data;
    },
    async buscarServicos() {
      const { data } = await api.get("servicos?_sort=nome");
      return data;
    },
    cadastrarCliente() {
      this.$emit("novo-cadastro", this.cliente);
      this.cliente = new Cachorro();
    },
    setaNomesRacas() {
      console.log(this.racas);
    },
  },
};
</script>

<style scoped>
form div {
  margin-bottom: 10px;
}
.erro {
  color: red;
  font-weight: bold;
}
.espaco-abaixo {
  margin-bottom: 10px;
}

.espaco-lado {
  margin-right: 10px;
}
input,
select,
textarea {
  width: 90%;
  box-sizing: border-box;
}
</style>