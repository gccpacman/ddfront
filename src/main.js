// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueAnalytics from 'vue-analytics'

Vue.prototype.$axios = Axios
Vue.config.productionTip = false

if (process.env.GA) {
  Vue.use(VueAnalytics, {
    id: process.env.GA,
    disableScriptLoader: true,
    router,
    autoTracking: {
      pageviewOnLoad: false
    }
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
