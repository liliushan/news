<template>
  <div class="home">
    <!-- 轮播图部分 -->
    <m-swiper :auto="4000">
      <m-swiper-item v-for="(item,index) in swiper" :key="index">
        <img :src="item.img" alt />
      </m-swiper-item>
    </m-swiper>
    <!-- 导航部分 -->
    <ul class="nav">
      <li v-for="(item,index) in nav" :key="index" @click="_go(index)">
        <img :src="item.img" alt />
        <div>{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
    return {
      swiper: [],
      nav: [
        {
          title: "新闻资讯",
          img: "http://www.itcast.cn/files/image/201901/20190102083127893.jpg"
        },
        {
          title: "图片分享",
          img: "http://www.itcast.cn/files/image/201901/20190102083152057.jpg"
        },
        {
          title: "商品购买",
          img: "http://www.itcast.cn/files/image/201901/20190102083127893.jpg"
        },
        {
          title: "留言反馈",
          img: "http://www.itcast.cn/files/image/201901/20190102083226707.jpg"
        },
        {
          title: "视频专区",
          img: "http://www.itcast.cn/files/image/201901/20190102083247404.jpg"
        },
        {
          title: "联系我们",
          img: "http://www.itcast.cn/files/image/201901/20190102083304639.jpg"
        }
      ],
      path: [
        "/home/newslist",
        "/home/imglist",
        "/home/shoplist",
        "/home/newslist",
        "/home/newslist",
        "/home/newslist"
      ]
    };
  },
  created() {
    request({
      url: "/getlunbo"
    }).then(res => {
      this.swiper = res.message;
    });
  },
  methods:{
    _go(index){
      this.$router.push({
        path:this.path[index]
      })
    }
  }
};
</script>

<style scoped lang="less">
.home {
  .mint-swipe {
    height: 190px;
    img {
      width: 100%;
      height: 100%;
    }
  }
.nav{

    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    li{
      width: 33.33%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
             width: 112px / 2;
        height: 112px / 2;  
      }
      div{
        margin:10px 0;
      }
    }
  
}
}

</style>