import Vue from 'vue'
import App from './App'
import router from './router'
import '@/comment/theme/index.css'
import '@/comment/reset.css'
import http from '@/skyConfig/http'
import '@/skyConfig/request'
import api from '@/skyConfig/api'
import '@/skyConfig/proUrl'
import '@/comment/stylus/base.styl'
import { vali } from '@/skyConfig/libs/validate'
import utils from '@/skyConfig/libs/utils'
import Pagination from '@/pages/acommon/pageination'


Vue.config.productionTip = false
Vue.config.devtools = true

Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.$v = vali
Vue.prototype.$u = utils

Vue.component('Pagination', Pagination)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


