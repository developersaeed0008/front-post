import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './plugins/sweetalert2';
import '@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false

//store.$axios = axios;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
