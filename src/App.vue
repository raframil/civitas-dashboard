<template>
  <v-app id="app">
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from './components/layout/Header';
//import Footer from './components/layout/Footer';

export default {
  name: 'app',

  components: {
    Header
    //Footer
  },

  data: () => ({
    //
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
