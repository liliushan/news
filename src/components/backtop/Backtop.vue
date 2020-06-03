<template>
  <div class="back-top" v-show="isShow" ref="back" @click="backTop">
    <span class="iconfont icon-fanhuidingbu"></span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isShow:false
    }
  },
  methods:{
    backTop(){
      this.$parent.scroll.scrollTo(0, 0,1000)
    }
  },
  mounted(){
    this.$bus.$on('scroll-y',(y)=>{
      if(Math.abs(y) > 800){
        this.isShow = true
      }else{
        this.isShow = false
      }
    })
  }
}
</script>

<style scoped>
.back-top{
  width: 40px;
  height: 40px;
  background-color: skyblue;
  border-radius: 50%;
  position:absolute;
  right: 10px;
  bottom: 80px;
  line-height: 40px;
  text-align: center;
}
</style>