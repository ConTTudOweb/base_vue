<template>
  <div id="bankForm">
    <v-dialog v-model="dialog"
              width="800px"
              persistent>
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Cadastros  de Bancos
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-alert color="error" icon="warning" :value="alert.show" outline>
            <h4>Ops!</h4>
            <p>{{alert.message}}</p>
          </v-alert>
          <v-layout row wrap>
            <v-flex xs3>
              <v-text-field
                prepend-icon="account_balance"
                placeholder="Código"
                v-model="form.code"
                autofocus
                required
              />
            </v-flex>
            <v-flex xs9>
              <v-text-field
                placeholder="Descrição"
                v-model="form.description"
                required
              />
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="red" @click="dialog = false">Cancelar</v-btn>
          <v-spacer/>
          <v-btn flat color="success" @click="save" :disabled="!valid">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'formBank',
  data () {
    return {
      dialog: false,
      form: {},
      alert: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    show (data) {
      if (typeof data !== 'undefined') {
        this.form = data
      } else {
        this.form = {
          id: 0,
          code: '',
          description: ''
        }
      }
      this.dialog = true
    },
    save () {
      let method = this.edit ? 'PUT' : 'POST'
      let url = this.edit ? `api/banks/${this.form.id}/` : 'api/banks/'
      this.axios({
        url: url,
        method: method,
        data: this.form
      }).then(
        res => {
          this.dialog = false
          this.$emit('update')
        }
      ).catch(
        err => {
          this.dialog = true
          let errRet = err.response.data
          if (errRet.hasOwnProperty('code')) {
            this.alert.message = errRet['code'][0]
            this.alert.show = true
          }
        }
      )
    }
  },
  computed: {
    edit () {
      return this.form.id !== 0
    },
    valid () {
      return this.form.code !== '' && this.form.description !== ''
    }
  }
}
</script>
