<template>
  <v-container>
    <h3>Fila do Banho</h3>
    <v-simple-table v-if="clientes.length > 0">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Nome</th>
            <th class="text-center">Idade</th>
            <th class="text-center">Raça</th>
            <th class="text-center">Tosa?</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="index">
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.idade }}</td>
            <td>{{ cliente.raca }}</td>
            <td>{{ cliente.servico.extra | pergunta }}</td>
            <td>
              <v-btn @click="finalizarServico(cliente)">Finalizar Serviço</v-btn>
            </td>
          </tr>
        </tbody>
    </template>
    </v-simple-table>
    <div v-else>
      Nenhum cliente aguardando
    </div>
  </v-container>
</template>

<script>
import Servico from '@/components/Servicos';
export default {
  props: ['clientes'],
  filters: {
    pergunta: (value) => {
      if (value === undefined) {return 'Não'};
      if (typeof value !== 'boolean') {
        return value;
      }
      return value ? 'Sim' : 'Não';
    }
  },
  extends: Servico
}
</script>

<style scoped>
  .atendido{
    color: rgb(40, 156, 40);
    font-weight: bold;
  }

  table{
    width: 100%;
    text-align: center;
  }
</style>