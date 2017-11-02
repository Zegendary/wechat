<template>
  <div class="year-price">
    <ul>
      <li class="header">
        <span>月份</span>
        <span>渠道</span>
        <span>房屋</span>
        <span>总收入</span>
      </li>
      <li>
        <span>{{$route.query.month}}月</span>
        <span>全平台</span>
        <span>{{$route.query.room}}</span>
        <span class="price">¥{{allPrice()}}</span>
      </li>
      <li v-for="item in platforms">
        <span>{{$route.query.month}}月</span>
        <span>{{item.plat}}</span>
        <span>{{item.room}}</span>
        <span class="price">¥{{item.price}}</span>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        platforms:[
          {month: 6,plat: "携程",room:"A栋",price: 32140},
          {month: 6,plat: "携程",room:"A栋",price: 32140},
          {month: 6,plat: "携程",room:"A栋",price: 32140},
        ]
      }
    },
    created(){
      //ajax
    },
    methods:{
      allPrice(){
        return this.platforms.map(x=>x.price).reduce((a,b)=>a+b)
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";

  .year-price {
    width: 100vw;
    height: 100vh;
    background: $background;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  ul{
    width: 100%;
    font-size: 14px;
  }
  .header{margin-bottom: 8px;}
  li{background-color: #ffffff;display:flex;justify-content:flex-start;padding: 16px;@include border-1px-bottom($border-color)}
  span:first-child{width: 60px}
  span:nth-child(2){width: 80px}
  span:nth-child(3){flex:1}
  span:nth-child(4){width: 70px}
  span.price{color:$red;font-weight:700;}
</style>
