<template>
  <v-content>
    <v-container fluid>
      <h1>Ocorrências</h1>
    </v-container>
    <v-container fluid>
      <v-card>
        <v-card-title>
          Tabela
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="reports"
          :search="search"
          :loading="isLoading"
          loading-text="Carregando... Por favor aguarde"
        >
          <template v-slot:item.action="{ item }">
            <!--<v-btn small class="mx-2" fab dark color="orange" @click="editItem(item._id)">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>-->

            <v-btn small class="mx-2" fab dark color="red" @click="deleteDialog(item._id)">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <!-- Delete Confirmation Dialog -->
    <template>
      <v-dialog v-model="delete_dialog" max-width="350">
        <v-card>
          <v-card-title class="headline red accent-3 white--text">Confirmar Exclusão</v-card-title>

          <v-card-text>
            Você tem
            <strong>certeza</strong>
            que deseja excluir esta ocorrência?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" @click="delete_dialog = false">Cancelar</v-btn>
            <v-btn color="red accent-3" @click="deleteConfirm()">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- Snackbar -->
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" color="success">
        {{ snackbarText }}
        <v-btn color="white" text @click="snackbar = false">
          Fechar
        </v-btn>
      </v-snackbar>
    </div>
  </v-content>
</template>

<script>
export default {
  name: 'Reports',

  data() {
    return {
      delete_dialog: false,
      deleteReportId: '',
      // DataTable
      isLoading: false,
      search: '',
      snackbarText: '',
      snackbar: false,
      reports: [
        {
          _id: '',
          description: '',
          reportType: ''
        }
      ],
      headers: [
        { text: '_id', value: '_id' },
        { text: 'Tipo de ocorrência', value: 'reportType' },
        { text: 'Descrição', value: 'description' },
        { text: 'Ações', value: 'action', sortable: false }
      ]
      // End DataTable
    };
  },

  mounted() {
    console.log('Reports component mounted');
    this.getReports();
  },
  methods: {
    getReports() {
      this.isLoading = true;
      var page_url = 'http://18.224.34.157:3000/reports';
      fetch(page_url)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.reports = res;
          this.isLoading = false;
        });
    },

    deleteReport(id) {
      console.log(id);

      var page_url = 'http://18.224.34.157:3000/reports';
      fetch(`${page_url}/${id}`, {
        method: 'delete'
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.snackbar = true;
          this.snackbarText = res.message;
          this.delete_dialog = false;
          this.getReports();
        })

        .catch(err => console.error(err));
    },
    deleteDialog(id) {
      this.delete_dialog = true;
      this.deleteReportId = id;
    },
    deleteConfirm() {
      this.deleteReport(this.deleteReportId);
    }
  }
};
</script>
