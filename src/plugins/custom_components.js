import Vue from 'vue'

import toolbar from '@/components/Toolbar'
import remove from '@/components/common/Remove'
import login from '@/components/Login'
import formBank from '@/components/banks/Form'
import formDepositAccount from '@/components/deposit_accounts/Form'

Vue.component('cont-toolbar', toolbar)
Vue.component('cont-login', login)
Vue.component('cont-form-bank', formBank)
Vue.component('cont-form-deposit-account', formDepositAccount)
Vue.component('cont-remove', remove)
