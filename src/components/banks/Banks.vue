<template>
  <div id="bank">
    <cont-form-bank></cont-form-bank>
    <v-layout child-flex wrap xs12>
      <table xs12 class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DESCRIÇÃO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>ITAÚ</td>
          </tr>
          <tr v-for="bank in banks" :key="bank.code">
            <td>{{bank.code}}</td>
            <td>{{bank.description}}</td>
          </tr>
        </tbody>
      </table>
    </v-layout>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Banks',
    data () {
      return {
        banks: [],
        dialog: false
      }
    },
    methods: {
      fetchBanks () {
        this.axios.get('api/banks/').then((response) => {
          this.banks = response.data
        })
      }
    },
    created () {
      this.fetchBanks()
    }
  }
</script>

<style lang="scss" scoped>
  table {
    width: 100%;
    padding: 95px;
    th {
      border-bottom: dashed;
      background-color: silver;
    }
    td {
      background-color: antiquewhite;
    }
  }
</style>
