import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'

new Vue({
  el: '#app',
  store,
  router,
  
  render: h => h(App)
})
