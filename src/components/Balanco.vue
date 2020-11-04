<template>
  <v-container>


        <h3>Serviços do dia</h3>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  Nome
                </th>
                <th class="text-center">
                  Idade
                </th>
                <th class="text-center">
                  Raça
                </th>
                <th class="text-center">
                  Serviços
                </th>
                <th class="text-center">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cliente, index) in clientes" :key="index" >
                <td>{{ cliente.nome }}</td>
                <td>{{ cliente.idade }}</td>
                <td>{{ cliente.raca }}</td>
                <td>{{ cliente.servico.nome }}</td>
                <td>{{ cliente.servico.preco | grana }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="4" class="text-center" style="font-weight: bold;">{{ totalServicos | grana }}</td>
              </tr>
            </tfoot>
          </template>
        </v-simple-table>


  </v-container>
</template>

<script>
export default {
  props: ["clientes"],
  computed: {
    totalServicos() {
      if(!Array.isArray(this.clientes)) {
        return 0;
      }
      return this.clientes.reduce((total, cliente) => total + cliente.servico.preco, 0);
    }
  }
};
</script>

<style>
  table{
    width: 100%;
    text-align: center;
  }
</style>