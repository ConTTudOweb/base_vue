<template>
  <v-dialog v-model="dialog"
            max-width="400px"
            persistent
            lazy>
    <v-card>
      <v-card-title
        class="grey lighten-4 py-4 title"
      >
        Login
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-alert :color="logon.status"
                 :icon="logon.icon"
                 v-model="logon.show"
                 outline
                 transition="fadeIn">
          {{logon.message}}
        </v-alert>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              prepend-icon="account_circle"
              placeholder="Usuário"
              v-model="form.email"
              autofocus=""
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              type="password"
              prepend-icon="lock"
              placeholder="Senha"
              v-model="form.password"
            />
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon color="primary" @click="login" v-on:key.enter="login">
          <v-icon>done</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      logon: {
        status: 'warning',
        icon: 'warning',
        show: false,
        message: ''
      },
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    check (reload) {
      reload = typeof reload === 'undefined' ? false : reload
      this.$store.commit('AUTH', localStorage.getItem('api_token'))
      if (this.$store.state.token !== null) {
        this.axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.state.token
        $.ajaxSetup({
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
          beforeSend (xhr, options) {
            options.url = 'http://127.0.0.1:8000/' + options.url
          }
        })
        this.axios.get('rest-auth/user/').then(
          res => {
            this.$store.commit('LOGIN', res.data)
            this.dialog = false
            if (reload) {
              this.$router.go({
                path: '/',
                force: true
              })
            }
          },
          err => {
            this.logout()

            this.dialog = true

            if ('detail' in err.response.data) {
              this.showAlert(1, err.response.data['detail'])
            } else {
              this.showAlert(1, err.response.data)
            }
          }
        ).catch(err => {
          this.logout()
          this.dialog = true

          if ('detail' in err.response.data) {
            this.showAlert(1, err.response.data['detail'])
          } else {
            this.showAlert(1, err.response.data)
          }
        })
      } else {
        this.logout()
        this.showAlert(1)
        this.dialog = true
      }
    },
    logout () {
      this.$store.commit('LOGOUT')
      delete this.axios.defaults.headers.common['Authorization']
      $.ajaxSetup({
        headers: {},
        beforeSend (xhr, options) {
          options.url = 'http://127.0.0.1:8000/' + options.url
        }
      })
    },
    login () {
      this.axios.post('rest-auth/login/', this.form)
        .then(
          response => {
            localStorage.setItem('api_token', response.data.key)
            this.check(true)
          }
        ).catch(
          err => {
            this.logout()
            this.dialog = true
            if ('detail' in err.response.data) {
              this.showAlert(1, err.response.data['detail'])
            } else if ('non_field_errors' in err.response.data) {
              this.showAlert(1, err.response.data['non_field_errors'][0])
            } else {
              this.showAlert(1, err.response.data)
            }
          }
        )
    },
    showAlert (type, message) {
      type = typeof type === 'undefined' ? 0 : type
      message = typeof message === 'undefined' ? 'Inicie uma sessão para continuar' : message
      const alertType = [{
        status: 'warning',
        icon: 'warning'
      }, {
        status: 'error',
        icon: 'error'
      }, {
        status: 'success',
        icon: 'info'
      }]
      this.logon = Object.assign(alertType[type], { show: true, message: message })
    }
  },
  created () {
    this.check()
  }
}
</script>
