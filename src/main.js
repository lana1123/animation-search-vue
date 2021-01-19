import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import router from './router'
import VueSpinners from 'vue-spinners'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueSpinners)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  router,
  render: h => h(App)
}).$mount('#app')
