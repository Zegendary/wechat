<template>
  <div class="choose-room">
    <header>
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <span class="text">顾白白农家乐详情</span>
    </header>
    <ul>
      <li v-for="home in homes" @click="$emit('pushRouter',{homeId: home.id})">
        <span>{{home.name}}</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        homes: []
      }
    },
    created(){
      this.$http.get('http://api.xcm168.com/api/bus/houses').then(({data})=>{
        this.homes = data.data
      })
    },
    methods:{
      goBack(){
        this.$router.push({path:'/index'})
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";
  .choose-room{
    header{
      position: relative;
      padding: 12px;
      text-align: center;
      background: #fff;
      @include border-1px-bottom($border-color);
      .text{color: $black}
      >i{color: #7e8c8d;position: absolute;top: 12px;left: 12px;}
    }
    ul>li{
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      span,i{color: $black;}
      @include border-1px-bottom($border-color);
    }
  }
</style>
