import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import router from './router'
import VueSpinners from 'vue-spinners'

Vue.use(VueSpinners)
Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  router,
  render: h => h(App)
}).$mount('#app')
