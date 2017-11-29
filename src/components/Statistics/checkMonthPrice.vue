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
        <span>{{platforms[0].name}}</span>
        <span class="price">¥{{allPrice()}}</span>
      </li>
      <li v-for="item in platforms">
        <span>{{$route.query.month}}月</span>
        <span>{{item.plat}}</span>
        <span>{{item.name}}</span>
        <span class="price">¥{{item.price}}</span>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        platforms:[]
      }
    },
    created(){
      this.$http.get(`http://api.xcm168.com/api/bus/stat/revenue/channel?year=${this.$route.query.year}&month=${this.$route.query.month}&house_id=${this.$route.query.house_id}`).then(({data})=>{
        this.platforms = data
      })
    },
    methods:{
      allPrice(){
        if(this.platforms.length == 0){
          return 0
        }
        return this.platforms.reduce((a,b)=>a.price+b.price)
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
