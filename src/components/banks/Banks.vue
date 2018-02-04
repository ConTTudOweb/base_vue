<template>
  <div id="bank">
    <cont-form-bank ref="bankForm" @update="load"></cont-form-bank>
    <cont-remove ref="bankRemove" @update="load" api="api/bank/"></cont-remove>
    <v-layout child-flex wrap xs12>
      <kendo-grid :data-source="dsBank"
                  :pageable="true"
                  :sortable="true"
                  ref="grid">
        <kendo-grid-column field="code"
                           title="Código"></kendo-grid-column>
        <kendo-grid-column field="description"
                           title="Descriçao"></kendo-grid-column>
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
    name: 'Banks',
    data () {
      return {
        dialog: false
      }
    },
    computed: {
      dsBank () {
        return new kendo.data.DataSource({
          transport: {
            read: 'api/bank/'
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
              self.$refs.bankRemove.show(data)
            }
          }
        ]
      }
    },
    methods: {
      load () {
        this.dsBank.read()
      },
      showForm (data) {
        this.$refs.bankForm.show(data)
      }
    }
  }
</script>
