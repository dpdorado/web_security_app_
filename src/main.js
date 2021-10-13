import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import JwPagination from 'jw-vue-pagination';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.performance = true
//Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDp3Ud3SixagW8bJOwtosy5bBMB5JRNS_k",
  },
});

Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.component('jw-pagination', JwPagination);

Vue.prototype.$server='http://3.14.19.238:8000'; 


//Storage
let is_logged = localStorage.getItem ('is_logged');
console.log('main: '+is_logged);
if (is_logged == 0){
  localStorage.setItem ('token', 'NaN')
  localStorage.setItem ('userid', -1)
  localStorage.setItem ('username', 'NaN')
  localStorage.setItem ('email', 'NaN')
  localStorage.setItem ('name', 'NaN')
  localStorage.setItem ('last_name', 'NaN')
  localStorage.setItem ('is_logged', 0)
  var config =  {
    headers: { 
        Authorization: 'Bearer ' 
    }
  }      
  localStorage.setItem('config', JSON.stringify(config));
}
// localStorage.setItem ('token', 'NaN')
// localStorage.setItem ('userid', -1)
// localStorage.setItem ('username', 'NaN')
// localStorage.setItem ('email', 'NaN')
// localStorage.setItem ('name', 'NaN')
// localStorage.setItem ('last_name', 'NaN')
// localStorage.setItem ('is_logged', 0)

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
