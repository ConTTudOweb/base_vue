import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLogged: false,
  token: '',
  userData: {}
}

const mutations = {
  AUTH (state, token) {
    state.token = token
  },
  LOGIN (state, userData) {
    state.isLogged = true
    state.userData = userData
  },
  LOGOUT (state) {
    state.isLogged = false
    state.userData = {}
    state.token = ''
    localStorage.clear()
  }
}

export default new Vuex.Store({
  state,
  mutations
})
