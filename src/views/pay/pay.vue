<template>
  <div class="pay">
    <div class="address">
      <span>默认</span>
      <span>公司</span>
      <span>{{addressDetail}}</span>
      <p>{{address}}</p>
      <div>李留杉&nbsp;159****0874</div>
    </div>
    <div class="shop" v-for="(item,index) in $store.state.checkShop.list" :key="index">
      <div class="right">
        <img :src="item.src.src" alt />
      </div>
      <div class="left">
        <div class="title">{{item.title}}</div>
        <div class="price">￥{{item.newPrice}}</div>
      </div>
    </div>
    <div class="jiezhang">
      <p>￥{{getFullPrice}}</p>
      <span @click="commitPay">提交订单</span>
    </div>
    <div class="erweima" v-show="isShow">
      <img :src="erweima" alt="">
    </div>
  </div>
</template>

<script>
import {request2} from 'network/request'
import randomString from 'utils/randomString'
export default {
  data() {
    return {
      addressDetail: "",
      address: "",
      erweima:'',
      isShow:false
    };
  },
  created() {
    let option = {
      enableHighAcuracy: true,
      maximumAge: 0,
      timeout: 600000
    };
    if (navigator.geolocation) {
      // 判断是否支持该属性
      navigator.geolocation.getCurrentPosition(this.showPostion,this.showError, option);
    } else {
      console.log("浏览器不支持该属性");
    }
  },
  computed: {
    getFullPrice() {
      let sum = 0;
      this.$store.state.checkShop.list.forEach(value => {
        sum = sum + value.newPrice;
      });
      return sum;
    }
  },
  methods: {
    showPostion(position) {
      console.log(position.coords.latitude); // 纬度
      console.log(position.coords.longitude); //  经度
      this.$jsonp("http://api.map.baidu.com/reverse_geocoding/v3/", {
        ak: "8KQHRo0qQmm9SdUspA2SRdIhSShMiG7q",
        output: "json",
        coordtype: "wgs84ll",
        location: position.coords.latitude + "," + position.coords.longitude
      }).then(res => {
        this.addressDetail = res.result.formatted_address
        this.address = res.result.addressComponent.district +res.result.addressComponent.street+ res.result.addressComponent.street_number
      });
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("您拒绝了地理定位服务");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("无法获取您的位置");
          break;
        case error.TIMEOUT:
          alert("超时");
          break;
      }
    },
    commitPay(){
      
      let orderNo = randomString() // 随机生成订单号
      request2({
        method:'post',
        url:'http://120.78.142.80/myPay/pay_skm',
        data:{
          payTo:'wxgrskm',
          appId:'XNYBCrNxBVcA1431895D382697995C11',
          orderNo:orderNo,
          money:'100',
          minMoney:'1',
          maxMoney:'100',
          notifyUrl:'http://106.13.70.93/completePay'
        }
      }).then(res=>{
        console.log(res)
        document.querySelector('#app').className = 'addBgc'
        this.erweima = res.orderInfo.qrcodeURL
        this.isShow = true
        setTimeout(()=>{
          this.isShow = false
        },10000)
      })
    }
  }
};
</script>

<style lang="less" >
.pay {
  .address {
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    span {
      font-size: 12px;
      margin-right: 5px;
      padding: 3px;
      color: #fff;
    }
    span:first-child {
      background-color: red;
    }
    span:nth-child(2) {
      background-color: blue;
    }
    span:nth-child(3) {
      color: #000;
    }
    p {
      font-weight: 600;
      margin: 10px 0;
    }
    div {
      font-size: 12px;

      margin-bottom: 10px;
    }
  }
  .shop {
    display: flex;
    padding: 10px;
    height: 80px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    .right {
      flex: 2;
      text-align: center;
      img {
        width: 70%;
        height: 100%;
      }
    }
    .left {
      flex: 4;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .title {
        font-size: 13px;
      }
      .price {
        color: red;
      }
    }
  }
  .jiezhang {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    font-size: 13px;
    position: fixed;
    bottom: 49px;
    width: 100%;
    color: #000;
    p {
      width: 50%;
      margin: 0;
      float: left;
      position: relative;
      padding-left: 20px;
      color: red;
      font-size: 18px;
      font-weight: 600;
      section {
        display: block;
        width: 14px;
        height: 14px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 14px;
        text-align: center;
      }
    }
    span {
      float: right;
      width: 20%;
      color: #fff;
      background-color: red;
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
      text-align: center;
      margin-top: 5px;
    }
  }
  .erweima{
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border:2px solid rgba(0, 0, 0, 0.4);
    img{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>