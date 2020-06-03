<template>
  <div id="app">
    <!-- 头部 -->
    <header-nav>
      <template v-slot:header-right>
        <span class="iconfont icon-gongxiangtubiaozhuangtaileicaozuolei59"></span>
      </template>
      <template v-slot:header-center>汇聚天下</template>
      <template v-slot:header-left><span class="iconfont icon-gengduo"></span></template>
    </header-nav>
   
      <keep-alive exclude="shopdetail"><router-view></router-view></keep-alive>

    <!-- tabbar部分 -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import HeaderNav from 'components/header/Headernav'
import Tabbar from 'components/tabbar/Tabbar'
export default {
  components:{
    HeaderNav,
    Tabbar
  }
}
</script>

<style>
@import "assets/css/normalize.css";
@import "assets/css/base.css";
@import "assets/iconfont/iconfont.css";
body{
  max-width: 15rem;
  margin: 0 auto;
}
#app{
  height: 100%;
  padding-top: 49px;
  padding-bottom: 49px;
  overflow-x: hidden;
}
</style>