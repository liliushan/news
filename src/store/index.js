import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isFlag:false, // 控制全选
    shopList:[],
    checkShop:[],
    clickNum:0
  },
  mutations: {
    addShop(state,payload){
      let item = state.shopList.find(value=>value.id===payload.id)
     if(item){
       item.num++
      console.log('数量增加了')
     }else{
       Vue.set(state.shopList,state.shopList.length,payload)
       console.log(payload)
       console.log('商品添加了')
       state.isFlag = true
     }
    },
    numAdd(state,payload){
      let shop = state.shopList.find(value=>value.id === payload.id)
      shop.num++
    },
    numReduce(state,payload){
      let shop = state.shopList.find(value=>value.id === payload.id)  
      // shop.num = shop.num + payload.num  
      if(shop.num > 1){
        shop.num--
      }
    },
    removeShop(state,payload){
      let index = state.shopList.findIndex(value=>value.id === payload.id)  
      Vue.delete(state.shopList,index)
      if(state.shopList.length === 0){
        state.isFlag = false
      }
    },
    editFlag(state,payload){
      let shop = state.shopList.find(value=>value.id === payload.id)  
      shop.flag = !shop.flag
      let shops = state.shopList.filter(value=>value.flag === false)
      if(shops.length!==0){
        state.isFlag = false
      }else{
        state.isFlag = true
      }
    },
    checkedAll(state,payload){
      state.isFlag = !state.isFlag
      state.shopList.forEach(value=>{
        value.flag = state.isFlag
      })
    },
    getShop(state){
      // 获取所有选中的商品
      let list = state.shopList.filter(value=>value.flag === true)
      console.log(list)
      Vue.set(state.checkShop,'list',list)
    },
  },
  getters:{
    getNum(state,getters){
      let fullnum = 0
      if(state.shopList.length !==0){
        state.shopList.forEach(value=>{
          fullnum = fullnum + value.num
        })
      }
      return fullnum
    },
    fullPrice(state,getters){
      let fullprice = 0
      state.shopList.forEach(value=>{
        if(value.flag === true){
          fullprice = fullprice + (value.num * value.newPrice)
        }
      })
      return fullprice.toFixed(2)
    },
    fullNum(state,getters){
      let fullnum = 0
      state.shopList.forEach(value=>{
        if(value.flag === true){
          fullnum = fullnum + value.num
        }
      })
      return fullnum
    }
  },
  actions: {
  },
  modules: {
  }
})
