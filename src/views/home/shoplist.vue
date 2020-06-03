<template>
  <div class="shoplist">
    <div class="content_2">
      <div
        class="shoplist-item"
        v-for="(item,index) in goodsList"
        :key="index"
        @click="goShopDeatil(item.id)"
      >
        <div class="shop-list-top">
          <img :src="item.img_url" alt />
        </div>
        <div class="shop-list-bottom">
          <div class="shop-price">
            <span>￥{{item.sell_price}}</span>
            <span>￥{{item.market_price}}</span>
          </div>
          <div class="shop-status">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </div>
        </div>
      </div>
    </div>
    <backtop ref="test"></backtop>
  </div>
</template>

<script>
import { request } from "../../network/request";
import BScroll from "better-scroll";
import Backtop from "components/backtop/Backtop";
export default {
  data() {
    return {
      pageIndex: 1,
      goodsList: [],
      scroll: {}
    };
  },
  created() {
    this.getShopData();
  },
  methods: {
    getShopData() {
      request({
        url: `/getgoods`,
        params: {
          pageindex: this.pageIndex
        }
      }).then(res => {
        console.log(res);
        let goods = res.message.filter(
          value =>
            value.img_url !==
            "http://demo.dtcms.net/upload/201504/20/thumb_201504200242250674.jpg"
        );
        this.goodsList.push(...goods);
      });
    },
    goShopDeatil(id) {
      this.$router.push({
        path: `/home/shopdetail/${id}`
      });
    }
  },
  mounted() {
    this.scroll = new BScroll(".shoplist", {
      scrollY: true,
      click: true,
      pullUpLoad: true, // 开启上拉加载更多的功能
      probeType: 3
    });
    this.scroll.on("pullingUp", () => {
      // pullingUp事件在滚动到元素的底部的时候执行
      this.getShopData();
      this.scroll.finishPullUp(); // 通知better-scroll上拉加载完成可以接着监听上拉加载事件
    });
    this.scroll.on("scroll", option => {
      this.$bus.$emit("scroll-y", option.y);
    });
  },
  watch: {
    goodsList: function() {
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  components: {
    Backtop
  },
  activated(){
    // better-scroll切换组件默认存在列表隐藏的原因当切换组件的时候会将has~~设置为false,scrollheight设置0因此不能滚动
    this.scroll.refresh()
  }
};
</script>

<style scoped lang="less">
.shoplist {
  background-color: #f3f3f3;
  overflow: hidden;
  height: 100%;
  .content_2 {
    overflow: hidden;
    .shoplist-item {
      margin-bottom: 5px;
      width: 50%;
      padding: 6px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
      float: left;
      overflow: hidden;
      .shop-list-top {
        width: 100%;
        img {
          width: 100%;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          vertical-align: middle;
        }
      }
      .shop-list-bottom {
        padding: 10px;
        height: 60px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .shop-price span:nth-child(1) {
          color: red;
          font-size: 14px;
          font-weight: 600;
          margin-right: 10px;
        }
        .shop-price span:nth-child(2) {
          color: #666;
          text-decoration: line-through;
          font-size: 12px;
        }
        .shop-status {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>