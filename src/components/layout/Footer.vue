<template>
  <v-footer dark>
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }} Civitas</div>
  </v-footer>
</template>
<script>
export default {
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>