<template>
  <div class="imglist">
    <div class="wrapper">
      <ul class="content" ref="content">
        <li v-for="(item,index) in titleData" :key="index" ref="category" @click="showImg(item.id)">{{item.title}}</li>
      </ul>
    </div>
    <div class="imglist-bottom">
          <div class="img-item" v-for="(item,index) in imgData" :key="index" @click="imgDetail(item.id)">
      <img :src="item.img_url" alt="">
      <p>
        <section v-html="item.title"></section>
        <section v-html="item.content"></section>
      </p>
    </div>
    </div>
  </div>
</template>

<script>
import {request} from 'network/request'
import BScroll from 'better-scroll'
export default {
  data(){
    return{
      titleData:[],
      scrollWidth:0,
      imgData:[],
      scroll:null
    }
  },
  methods:{
    showImg(id){
      request({
        url:`/getimages/${id}`
      }).then(res=>{
       this.imgData = res.message
      })
    },
    imgDetail(id){
      this.$router.push(`/home/imgdetail/${id}`)
    }
  },
  created(){
    request({
      url:'/getimgcategory'
    })
    .then(res=>{
      res.message.unshift({
        title: "全部",
        id: 0
      });
      this.titleData = res.message
      console.log(this.titleData)
    })
    this.showImg(0)
  },
  mounted(){
    this.scroll = new BScroll(".wrapper", {
      startX: 0,
      scrollX: true,
      bounceTime: 2000,
      click:true,
      mouseWheel: true,//开启鼠标滚轮
      disableMouse: false,//启用鼠标拖动
      disableTouch: false//启用手指触摸
    })
  },
  watch:{
    titleData(){
        this.$nextTick(() => {
        this.$refs.category.forEach(value => {
          this.scrollWidth = this.scrollWidth + value.offsetWidth
        });
        this.$refs.content.style.width = this.scrollWidth + "px"
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style scoped lang="less">
.imglist{
  padding-bottom: 49px;
  background-color: #fff;
}
.wrapper {
  width: 100%;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  position: fixed;
  z-index: 20;
  top: 48px;
  ul {
    overflow: hidden;
    white-space: nowrap;
    padding: 0;
    height: 36px;
    line-height: 36px;
    color: #555;
    font-size: 14px;
    li {
      text-align: center;
      padding: 0 10px;
      display: inline-block;
    }
  }
}
.imglist-bottom{
  padding-top: 50px;
}
.img-item{
  width: 80%;
  margin: 10px auto 0;
  box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  img{
    width: 100%;
    vertical-align: middle;
  }
    p{
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: rgba(0,0,0,.3);
    margin: 0;
    max-height: 84px;
    height: 80px;
    overflow: hidden;
    section:first-child{
      font-size: 14px;
      margin-bottom: 5px;
    }
    section:last-child{
      font-size: 12px;
            display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>