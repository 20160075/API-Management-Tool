import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Card from './components/Card.vue'

Vue.config.productionTip = false
Vue.component('app-card',Card)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')