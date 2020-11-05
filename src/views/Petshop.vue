<template>
  <v-app>

    <v-container>
      <v-row>
        <!-- <v-col md="6" sm="12"> -->
        <v-col>
          <v-card >
            <Recepcao @novo-cadastro="encaminharCliente"></Recepcao>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mb-4">
            <Veterinario 
              :clientes="clientesVeterinario" 
              @atendido="finalizarConsulta"
            ></Veterinario>
          </v-card>
          <v-card>
            <Banho 
              :clientes="clientesBanho" 
              @atendido="finalizarBanho"
            ></Banho>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col md="12" sm="12">
          <v-card>
            <Balanco :clientes="clientesAtendidos" ></Balanco>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>

<script>
import Recepcao from '@/components/Recepcao';
import Veterinario from '@/components/Veterinario';
import Banho from '@/components/Banho';
import Balanco from '@/components/Balanco';

export default {
  components: {
    Recepcao,
    Veterinario,
    Banho,
    Balanco
  },
  data() {
    return {
      clientesVeterinario: [{'nome': 'Teste 2','idade': 10,'raca': 'Pincher','servico': {'nome': 'Banho e Tosa', 'preco': 60}}],
      clientesBanho: [{'nome': 'Teste 1','idade': 5,'raca': 'Vira-lata','servico': {'nome': 'Banho', 'preco': 40}}],
      clientesAtendidos: []
    }
  },
  methods: {
    encaminharCliente(cliente) {
      cliente.servico.tipo === 'banho'
        ? this.clientesBanho.push(cliente)
        : this.clientesVeterinario.push(cliente)
    },
    finalizarConsulta(cliente) {
      this.clientesAtendidos.push(cliente);
      // RETIRAR O ITEM DO ARRAY NAO DISPARA O RE-RENDER
      // temos que setar o estado dele de novo
      this.$delete(this.clientesVeterinario, this.clientesVeterinario.findIndex(clienteAntendido => clienteAntendido.nome === cliente.nome), cliente)
    },
    finalizarBanho(cliente) {
      this.clientesAtendidos.push(cliente);
      // RETIRAR O ITEM DO ARRAY NAO DISPARA O RE-RENDER
      // temos que setar o estado dele de novo
      this.clientesBanho = this.clientesBanho.filter(clienteAtendido => clienteAtendido.nome !== cliente.nome);
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>