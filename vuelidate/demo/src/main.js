import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

// 全局使用vuelidate
Vue.use(Vuelidate)


new Vue({
  render: h => h(App),
}).$mount('#app')
