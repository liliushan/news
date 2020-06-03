<template>
  <div class="newlist">
    <div
      class="newlist-item"
      v-for="(item) in newslist"
      :key="item.id"
      @click="goNewsDetail(item)"
    >
      <div class="left">
        <img :src="item.img_url" alt />
      </div>
      <div class="right">
        <div class="zaiyao">{{item.title}}</div>
        <div class="time">
          <span >发表时间:{{item.add_time | formatDate}}</span>
          <span class="iconfont icon-dianzan" @click.stop="addClickNum(item)">{{item.click}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
    return {
      id:0,
      newslist: []
    };
  },
  created() {
    request({
      url: "/getnewslist"
    }).then(res => {
      this.newslist = res.message;
    })
  },
  methods:{
    goNewsDetail(item){
      this.id = item.id
      this.$router.push({
        path:`/home/newsdetail/${this.id}`
      })
    },
    addClickNum(item){
      localStorage.setItem('newItem',JSON.stringify(this.newslist))
      item.click++
      let saveData = JSON.parse(localStorage.getItem('newItem') || '[]')
      console.log(saveData)
      let newData = saveData.find(value=>value.id === item.id)
      console.log(newData)
      if(newData){
        // 让本地存储的数据和页面的数据保持同步
        newData.click++
        let index = saveData.findIndex(value=>value.id === item.id)
        saveData[index] = newData       
         localStorage.setItem('newItem',JSON.stringify(saveData)) 
      }else{
        saveData.push(item)
        localStorage.setItem('newItem',JSON.stringify(saveData))
      }
    }
  }
};
</script>

<style lang="less" scoped>
// .newlist{
//   padding-bottom: 70px;
// }
.newlist-item {
  height: 80px;
  background-color: #fff;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .left {
    flex: 2;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 6;
    padding: 5px;
    color: #444;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .zaiyao {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time{
      display: flex;
      justify-content: space-between;
      span {
      color: steelblue;
      font-size: 12px;
    }
    }
  }
}
</style>