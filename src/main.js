import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import JwPagination from 'jw-vue-pagination';



//import './public_start/css/style.css' 

Vue.config.performance = true
//Vue.config.productionTip = false
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.component('jw-pagination', JwPagination);

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
