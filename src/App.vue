<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h3
          @click="irParaHome"
          style="cursor: pointer;"
        >PetshopVue</h3>
      </div>

      <v-spacer></v-spacer>

      <router-link to="/loja">
        <v-btn text>
          Loja
        </v-btn>    
      </router-link>

      <router-link to="/petshop">
        <v-btn text>
          Petshop
        </v-btn>
      </router-link>

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- <Petshop/> -->
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Petshop from './views/Petshop';

export default {
  name: 'App',

  components: {
    Petshop,
  },
  methods: {
    irParaHome(){
      this.$router.push('/');
    }
  }
};
</script>