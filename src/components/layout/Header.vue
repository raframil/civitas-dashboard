<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Civitas</v-toolbar-title>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-home", path: "/" },
        { title: "Sobre", icon: "mdi-information", path: "/ocorrencias" },
        { title: "Mapa", icon: "mdi-google-maps", path: "/mapa" }
      ]
    };
  }
};
</script>

<style scoped></style>
