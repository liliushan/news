<template>
  <div class="gooddesc">
    <h4>{{gooddesc.title}}</h4>
    <div v-html="gooddesc.content" class="desc"></div>
  </div>
</template>

<script>
import {request} from '../../network/request'
export default {
  data(){
    return {
      id:this.$route.params.id,
      gooddesc:{}
    }
  },
  created(){
    request({
      url:`/goods/getdesc/${parseInt(this.id)}`
    }).then(res=>{
      this.gooddesc = res.message[0]
    })
  }
}
</script>

<style  lang="less" >
.gooddesc{
h4{
  padding: 10px;
  color:skyblue;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid rgba(0,0,0,.2);
}
.desc{
  padding: 10px;
  font-size: 14px;
  img{
    width: 100%;
  }
}
}

</style>