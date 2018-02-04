<template>
  <div id="bank">
    <cont-form-bank ref="bankForm" @update="fetchBanks"></cont-form-bank>
    <!--<cont-remove ref="bankRemove" @update="fetchBanks" api="api/bank/" key="id"></cont-remove>-->
    <v-layout child-flex wrap xs12>
      <v-data-table
        :headers="headers"
        :items="banks"
        :loading="loading"
        :total-items="banks.length"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.code }}</td>
          <td>{{ props.item.description }}</td>
        </template>
      </v-data-table>
      <!--<v-data-table-->
        <!--:headers="headers"-->
        <!--:items="banks"-->
        <!--hide-actions-->
        <!--class="elevation-1"-->
        <!--key="code"-->
      <!--&gt;-->
        <!--<template slot="banks" slot-scope="props">-->
          <!--<td>{{ props.item.id }}</td>-->
          <!--<td>{{ props.item.code }}</td>-->
          <!--<td>{{ props.item.description }}</td>-->
        <!--</template>-->
      <!--</v-data-table>-->
    </v-layout>
    <v-btn
      fab
      bottom
      right
      color="primary"
      dark
      fixed
      @click="showForm()"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'Banks',
    data () {
      return {
        loading: true,
        headers: [
          { text: 'Código', value: 'code' },
          { text: 'Descrição', value: 'description' }
        ],
        banks: [],
        dialog: false
      }
    },
    methods: {
      showForm (data) {
        this.$refs.bankForm.show(data)
      },
      fetchBanks () {
        this.loading = true
        this.axios.get('api/bank/').then((response) => {
          this.banks = response.data
          this.loading = false
        })
      },
      remove (data) {
        this.$refs.bankRemove.show(data)
      }
    },
    mounted () {
      this.fetchBanks()
    }
  }
</script>
