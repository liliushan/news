<template>
  <div class="img-detail">
    <div class="img-title">
      <section>{{detailData.title}}</section>
      <div class="img-pub-time">
        <span>发布时间:{{detailData.add_time | formatDate}}</span>
        <span>点击:{{detailData.click}}</span>
      </div>
    </div>
    <div class="img-content" v-html="detailData.content"></div>
    <vue-preview :slides="suolutu" @close="handleClose"></vue-preview>
    <comment :id="id"></comment>
  </div>
</template>

<script>
import { request } from 'network/request'
import Comment from "components/comment/Comment";
export default {
  data(){
    return {
      id:parseInt(this.$route.params.id),
      detailData:[],
      suolutu:[]
    }
  },
  created(){
    request({
      url:`/getimageInfo/${this.id}`,
    })
    .then(res=>{
      this.detailData = res.message[0] || []
    })
    request({
      url:`/getthumimages/${this.id}`,
    })
    .then(res=>{
      res.message.forEach(value=>{
        value.msrc = value.src // msrc小图 src是大图
        value.w = 600 // 预览大图的宽度和高度
        value.h = 400
      })
      this.suolutu = res.message
    })
  },
  methods:{
    handleClose(){
      console.log('img 关闭了')
    }
  },
  components:{
     Comment
  }
}
</script>

<style lang="less" scoped>
.img-detail {
  .img-title {
    height: 80px;
    background-color: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    section {
      color: red;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
    .img-pub-time {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: steelblue;
    }
  }
  .img-content {
    padding: 10px;
    color: #666;
    font-size: 15px;
    line-height: 200%;
  }
}
</style>