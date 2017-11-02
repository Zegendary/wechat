<template>
  <div class="choose-room">
    <header>
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <span class="text">顾白白农家乐详情</span>
    </header>
    <ul>
      <li v-for="room in rooms" @click="$emit('pushRouter',{room: room})">
        <span>{{room}}</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        rooms: ["A栋","B栋","C栋"]
      }
    },
    created(){
      //ajax
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
