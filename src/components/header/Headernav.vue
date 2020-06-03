<template>
  <header>
    <div class="header-right" @click="back"><slot name="header-right"></slot></div>
    <div class="header-center"><slot name="header-center"></slot></div>
    <div class="header-left"><slot name="header-left"></slot></div>
  </header>
</template>

<script>

export default {
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
header{
  z-index:10;
  height: 49px;
  line-height: 49px;
  text-align: center;
  background-color:skyblue;
  color: #fff;
  border-bottom: 1px solid rgba(0,0,0,.2);
  display: flex;
  font-size: 18px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 15rem;
  margin: 0 auto;
  .header-right,.header-left{
    flex: 2;
  }
  .header-center{
    flex: 4;
  }
}
</style>