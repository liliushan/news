<template>
  <div class="new-detail">
    <div class="new-title">
      <section>{{newDetail.title}}</section>
      <div class="new-pub-time">
        <span>发布时间:{{newDetail.add_time | formatDate}}</span>
        <span>点击:{{newDetail.click}}</span>
      </div>
    </div>
    <div class="new-content" v-html="newDetail.content"></div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
import {request} from 'network/request'
import Comment from 'components/comment/Comment'
export default {
  data(){
    return {
      id:parseInt(this.$route.params.id),
      newDetail:{}
    }
  },
  created(){
    request({
      url:`/getnew/${this.id}`
    })
    .then(res=>{
      this.newDetail = res.message[0]
    })
  },
  components:{
    Comment
  }
}
</script>

<style lang="less" scoped>
.new-detail {
  .new-title {
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
    }
    .new-pub-time {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: steelblue;
    }
  }
  .new-content {
    padding: 10px;
    color: #666;
    font-size: 15px;
  }
}
</style>