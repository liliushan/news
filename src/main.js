import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'mint-ui/lib/style.css'
import Mint from './mint/index'
import VuePreview from 'vue-preview'
import  VueJsonp  from  'vue-jsonp'
import  setRem from 'utils/rem'
Vue.use(VueJsonp)

Vue.config.productionTip = false

Vue.use(Mint)
Vue.use(VuePreview)

setRem()
window.onresize = ()=>{
  setRem()
}
Vue.prototype.$bus = new Vue()
// 解析时间的过滤器
Vue.filter('formatDate', function (value) {
  let data = new Date(value)
  let y = data.getFullYear()
  let m = (data.getMonth() + 1).toString().padStart(2, '0')
  let d = data.getDate().toString().padStart(2, '0')
  let h = data.getHours().toString().padStart(2, '0')
  let M = data.getMinutes().toString().padStart(2, '0')
  let s = data.getSeconds().toString().padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${M}:${s}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
