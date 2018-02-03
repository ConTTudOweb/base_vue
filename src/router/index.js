import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Banks from '@/components/banks/Banks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/banks',
      name: 'Banks',
      component: Banks
    }
  ]
})
