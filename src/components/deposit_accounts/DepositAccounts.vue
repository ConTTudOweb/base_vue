<template>
  <div id="depositAccount">
    <cont-form-deposit-account ref="depositAccountForm" @update="load"></cont-form-deposit-account>
    <cont-remove ref="depositAccountRemove" @update="load" api="api/deposit_accounts/"></cont-remove>
    <v-layout child-flex wrap xs12>
      <kendo-grid :data-source="dsDepositAccount"
                  :pageable="true"
                  :sortable="true"
                  ref="grid">
        <kendo-grid-column field="name"
                           title="Descriçao"></kendo-grid-column>
        <kendo-grid-column field="type_display"
                           title="Tipo"></kendo-grid-column>
        <kendo-grid-column field="bank_display"
                           title="Banco"></kendo-grid-column>
        <kendo-grid-column :command="actionsCommand" :width="220"></kendo-grid-column>
      </kendo-grid>
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
    name: 'DepositAccounts',
    data () {
      return {
        dialog: false
      }
    },
    computed: {
      dsDepositAccount () {
        return new kendo.data.DataSource({
          transport: {
            read: 'api/deposit_accounts/'
          }
        })
      },
      actionsCommand () {
        let self = this
        return [
          {
            name: 'edit',
            text: 'Editar',
            iconClass: 'k-icon k-i-edit',
            click (e) {
              e.preventDefault()
              let data = this.dataItem($(e.currentTarget).closest('tr'))
              self.showForm(data)
            }
          },
          {
            name: 'remove',
            text: 'Apagar',
            className: 'red--text',
            iconClass: 'k-icon k-i-close',
            click (e) {
              e.preventDefault()
              let data = this.dataItem($(e.currentTarget).closest('tr'))
              self.$refs.depositAccountRemove.show(data)
            }
          }
        ]
      }
    },
    methods: {
      load () {
        this.dsDepositAccount.read()
      },
      showForm (data) {
        this.$refs.depositAccountForm.show(data)
      }
    }
  }
</script>
