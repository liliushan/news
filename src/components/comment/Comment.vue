<template>
  <div class="comment">
    <div class="comment-title">
      <span>用户评论:</span>
      <span class="iconfont icon-gengduo"></span>
    </div>
    <div class="comment-content" v-for="(item,index) in commentData" :key="index">
      <div class="mime">
        <span>{{item.uname}}:</span>
        <span>{{item.content}}</span>
      </div>
      <div class="comment-time">发表时间:2017-09-09 12:00:00</div>
    </div>
    <m-button type="primary" size="large" @click.native="getMore" v-show="isShow">加载更多</m-button>
    <m-button
      type="primary"
      size="large"
      v-show="isShow === false"
      disabled
    >人家是有底线的~~~</m-button>
    <textarea placeholder="发表评论:" v-model="pubData"></textarea>
    <m-button type="primary" size="large" plain @click.native="pubComment">发表评论</m-button>
  </div>
</template>

<script>
import { request1, request } from "network/request";
import { Toast } from "mint-ui";
export default {
  props: {
    id: {
      type:Number
    }
  },
  data() {
    return {
      page: 1,
      commentData: [],
      isShow: true,
      pubData: ""
    };
  },
  methods: {
    getData() {
      request1({
        url: "/comment",
        params: {
          page: this.page
        }
      }).then(res => {
        if (parseInt(res) === 0) {
          this.isShow = false; 
        } else {     
          this.commentData.push(...res)
          console.log(this.commentData)
        }  
      })
    },
    getMore() {
      this.page++;
      this.getData();
    },
    pubComment() {
      // 发表评论
      console.log(this.pubData)
      request1({
        url:'/comment',
        method: 'post',
        data: {
            uname: "匿名用户",
            time: Date.now(),
            content: this.pubData.trim()
          }
      }).then(res=>{
        console.log(Date.now())
        this.commentData.unshift({
            uname: "匿名用户",
            content: this.pubData.trim()
          })
          this.pubData = ''
      })
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.comment {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 10px 60px 10px;
  .comment-title {
    display: flex;
    justify-content: space-between;
  }
  .comment-content {
    margin-top: 10px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .mime {
      color: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
      span:nth-child(1) {
        margin-right: 10px;
      }
    }
    .comment-time {
      font-size: 12px;
      color: skyblue;
    }
  }
  .mint-button {
    margin-top: 10px;
  }
  textarea {
    margin: 0 auto;
    margin-top: 10px;
    width: 100%;
    height: 100px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>