import Vue from 'vue'

import toolbar from '@/components/Toolbar'
import remove from '@/components/common/Remove'
import login from '@/components/Login'
import formBank from '@/components/banks/Form'

Vue.component('cont-toolbar', toolbar)
Vue.component('cont-login', login)
Vue.component('cont-form-bank', formBank)
Vue.component('cont-remove', remove)
