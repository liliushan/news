import Vue from 'vue'
import {Swipe, SwipeItem,Button,Switch} from 'mint-ui'

let Mint = {
  install(){
    Vue.component('m-swiper', Swipe)
    Vue.component('m-swiper-item', SwipeItem)
    Vue.component('m-button', Button)
    Vue.component('m-switch', Switch)
  }
}

export default Mint
 
