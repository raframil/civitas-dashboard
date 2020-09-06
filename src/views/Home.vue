<template>
  <v-content>
    <v-container fluid>
      <h1>Bem-vindo!</h1>

      <div class="grafico1">
        <v-card class="mt-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Ocorrências por horário</div>
            <div class="subheading font-weight-light grey--text">
              <span class="green--text">
                <v-icon color="green">mdi-arrow-up</v-icon>21%
              </span>
              Aumento percentual em relação ao dia anterior
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>mdi-clock</v-icon>
            <span class="caption grey--text font-weight-light">última atualização há 4 minutos</span>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-content>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240]
  }),
  name: "Home",
  
  mounted() {
    console.log("Home component mounted");
  },
  methods: {}
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>