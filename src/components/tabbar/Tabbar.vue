<template>
  <div class="tabbar">
    <div class="tabbar-item" v-for="(item,index) in title" :key="index" :class="{active:index===current}" @click="toggle(index)">
      <span class="iconfont" :class="icon[index]"></span>
      <span>{{item}}</span>
      <section v-if="index === 1">{{$store.getters.getNum}}</section>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      current:0,
      icon:['icon-shouye','icon-gouwuchekong','icon-wode'],
      title:['首页','购物车','我的'],
      path:['/home','/cart','/mime'],
    }
  },
  methods:{
    toggle(index){
      // 1.给活跃状态的item添加颜色 2.切换组件
      this.current = index
      this.$router.push({
        path:`${this.path[index]}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tabbar{
  display: flex;
  height: 49px;
  border-top: rgba(0,0,0,.2);
  background-color:skyblue;
  justify-content: center;
  font-size: 12px;
  position: fixed;
  max-width: 15rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  color: #fff;
  .tabbar-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    section{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    right: 50%;
    line-height: 16px;
    transform: translateX(120%);
    top: 0;
    color: #fff;
    font-size: 12px;
    text-align: center;
    }
  }
}
.active{
  color: red;
}
</style>