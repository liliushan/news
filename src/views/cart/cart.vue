<template>
  <div class="cart">
    <div class="cart-item" v-for="(item,index) in shopList" :key="index">
      <div class="left">
        <img :src="item.src.src" alt="">
        <div class="check-item" @click="checked(item)">
          <span class="iconfont icon-xuanzhong" v-show="item.flag"></span>
        </div>
      </div>
      <div class="right">
        <div class="title">{{item.title}}</div>
        <div class="price">
          <span>￥{{item.newPrice}}</span>
           <div>
            <section @click="numJs(item)">-</section>
            <section>{{item.num}}</section>
            <section  @click="numAdd(item)">+</section>
          </div>
          <span @click="removeShop(item)">删除</span>
        </div>
      </div>
    </div>
    <div class="jisuan">
      <p @click="checkedAll">全选<section><span class="iconfont icon-xuanzhong" v-show="$store.state.isFlag"></span></section></p>
      <span>合计:￥{{$store.getters.fullPrice}}</span>
      <span @click="colse">去结算({{$store.getters.fullNum}})</span>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data(){
    return {
      shopList:this.$store.state.shopList
    }
  },
  methods:{
    checked(item){
      this.$store.commit('editFlag',item)
    },
    checkedAll(){
      this.$store.commit('checkedAll')
    },
    numJs(item){
      this.$store.commit('numReduce',item)
    },
    numAdd(item){
      this.$store.commit('numAdd',item)
    },
    removeShop(item){
      this.$store.commit('removeShop',item)
    },
    fullNum(){
      this.$store.commit('fullNum')
    },
    colse(){
      if(this.$store.state.shopList.length === 0){
        Toast({
        message:'客官还没有商品哦~~'
      })
      }
      this.$store.commit('getShop')
      this.$router.push({
        path:'/pay'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart{
  .cart-item{
    padding: 10px;
    height: 80px;
    background-color:#eee;
    border-bottom: 1px solid rgba(0,0,0,.2);
    display: flex;
    .left{
      flex: 2;
      text-align: center;  
      position: relative;
      img{
        width: 70%;
        height: 100%;
      }
      .check-item{
        width: 14px;
        height: 14px;
        background-color:#fff;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        line-height: 14px;
        text-align: center;

      }
    }
    .right{
      font-size: 13px;
      flex: 4;
      display:flex;
      flex-direction: column;
      justify-content: space-between;
              white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      .title{

      }
      .price{
        display: flex;
        justify-content:space-between;
             div{
        
        height: 20px;
        background-color:#fff;
        display: flex;
        justify-content: space-between;
        section{
          height: 20px;
          width: 20px;
          line-height: 18px;
          text-align: center;
          color: #000;
          border: 1px solid rgba(0,0,0,.2);
        }
        section:first-child{
          border-right:none;
        }
              section:nth-child(2){
          border-right:none;
        }
      }
        span{
          color: red;
          
        }
      }
    }
  }
  .jisuan{
    height: 40px;
    background-color:#e3e3e3;
    line-height: 40px;
    font-size: 13px;
    p{
      width: 25%;
      margin: 0;
      text-align:center;;
      float: left;
      position: relative;
      section{
        display: block;
         width: 14px;
        height: 14px;
        background-color:#fff;
        border-radius: 50%;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 14px;
        text-align: center;
      }
    }
    span:nth-child(2){
      text-align: center;
      float: left;
      width: 50%;
    }
    span:nth-child(3){
      float: left;
      width: 21%;
      color:#fff;
      background-color: red;
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
      margin: 5px 2%;
      text-align: center;
    }
  }
}

</style>