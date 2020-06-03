<template>
  <div class="shop-detail">
    <div class="shop-swiper">
      <m-swiper :auto="4000">
        <m-swiper-item v-for="(item,index) in swiperData" :key="index">
          <img :src="item.src" alt />
        </m-swiper-item>
      </m-swiper>
    </div>
    <div class="shop-params">
      <h4>商品信息</h4>
      <div class="title">{{shopData.title}}</div>
      <div class="price">
        <span>活动价:￥{{shopData.sell_price}}</span>
        <span>市场价:￥{{shopData.market_price}}</span>
        <div>发布时间:{{shopData.add_time|formatDate}}</div>
      </div>
    </div>
    <div class="shop-info">
      <h4>其它信息</h4>
      <div>商品编号:{{shopData.goods_no}}</div>
      <div>库存情况:{{shopData.stock_quantity}}</div>
      <div>快递:顺丰包邮(边远地区除外)</div>
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <section v-show="isShow"></section>
      </transition>
    </div>
    <m-button type="danger" size="large" plain @click.native="addCart">加入购物车</m-button>
    <section>
      <m-button type="primary" class="btn1" @click.native="tuwenjieshao">图文介绍</m-button>
      <m-button type="danger" @click.native="shopcomment">商品评论</m-button>
    </section>
  </div>
</template>

<script>
import { request } from "network/request";

export default {
  name: "shopdetail",
  data() {
    return {
      id: this.$route.params.id,
      swiperData: [],
      shopData: {},
      isShow: false,
      num: 0
    };
  },
  methods: {
    tuwenjieshao() {
      // 图文详情
      this.$router.push(`/home/shopdesc/${this.id}`);
    },
    shopcomment() {
      // 商品评论
      this.$router.push("/home/shopcomment");
    },
    addCart() {
      // 添加到购物车
      this.isShow = true;
      this.num++;
      let shop = {
        oldPrice: this.shopData.market_price,
        newPrice: this.shopData.sell_price,
        id: this.shopData.id,
        title: this.shopData.title,
        flag: true,
        num: this.num,
        src: this.swiperData[0]
      };
      this.$store.commit("addShop", shop);
    },
    beforeEnter(el) {
      // 动画开始之前
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      // 动画运行中
      let moveY =
        document.querySelector(".tabbar-item section").getBoundingClientRect()
          .top -
        document.querySelector(".shop-info section").getBoundingClientRect()
          .top;
      let moveX =
        document.querySelector(".tabbar-item section").getBoundingClientRect()
          .left -
        document.querySelector(".shop-info section").getBoundingClientRect()
          .left;
      el.offsetWidth;
      el.style.transition = "all .5s";
      el.style.transform = `translate(${moveX}px,${moveY}px)`;
      done();
    },
    afterEnter(el) {
      // 动画完成后
      this.isShow = false;
    }
  },
  created() {
    request({
      // 请求商品详情页轮播图的数据
      url: `/getthumimages/${this.id}`
    }).then(res => {
      this.swiperData = res.message;
    });
    request({
      // 请求商品详情页的展示数据
      url: `/goods/getinfo/${this.id}`
    }).then(res => {
      this.shopData = res.message[0];
    });
  }
};
</script>

<style scoped lang="less">
.shop-detail {
  .shop-swiper {
    padding: 10px;
    height: 160px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    img {
      height: 100%;
    }
  }
  .shop-params {
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    height: 140px;
    h4 {
      margin: 0;
      padding: 10px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .title {
      font-size: 14px;
      margin-top: 10px;
    }
    .price {
      font-size: 12px;
      margin-top: 14px;
      span:first-child {
        color: red;
        margin-right: 50px;
      }
      span:nth-child(2) {
        text-decoration: line-through;
      }
      div {
        font-size: 14px;
        margin-top: 14px;
        color: #666;
      }
    }
  }
  .shop-info {
    padding: 10px;
    position: relative;
    section {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      right: 60%;
      line-height: 16px;
      transform: translateX(120%);
      top: 0;
      color: #fff;
      font-size: 12px;
      text-align: center;
      z-index: 99;
    }
    h4 {
      margin: 0;
      padding: 10px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    div {
      margin: 10px 0;
      font-size: 13px;
      color: #666;
    }
  }
  section {
    text-align: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    .mint-button {
      padding: 10px;
      margin: 0 20px;
      margin: 15px;
    }
  }
}
</style>