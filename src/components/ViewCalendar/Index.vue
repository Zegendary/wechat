<template>
  <div class="view-calendar" ref="wrapper">
    <div class="content">
      <header>
        <i class="el-icon-arrow-left" @click="goBack"></i>
        <span class="text">顾白白农家乐详情</span>
      </header>
      <div class="tabs">
        <span @click="homeFirst = true" :class="{active: homeFirst}">根据别墅查看</span>
        <span @click="homeFirst = false" :class="{active: !homeFirst}">根据日期查看</span>
      </div>
      <rooms-by-months v-if="homeFirst" @pushRouter="pushRouter" :price="false" :rooms-by-months="roomsByMonths"></rooms-by-months>
      <months-by-rooms v-if="!homeFirst" @pushRouter="pushRouter" :price="false" :months-by-rooms="monthsByRooms"></months-by-rooms>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import RoomsByMonths from '../common/RoomsByMonths.vue'
  import MonthsByRooms from '../common/MonthsByRooms.vue'
  import BScroll from 'better-scroll'

  export default{
    data(){
      return {
        homeFirst: true,
        rooms: ['A栋','B栋','C栋'],
        price: false
      }
    },
    components:{
      RoomsByMonths,
      MonthsByRooms
    },
    created(){
      this.$http.get('http://api.xcm168.com/api/bus/houses').then(({data})=>{
        console.log(data)
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {click: true})
      })
    },
    methods:{
      goBack(){
        this.$router.push({path:'/index'})
      },
      pushRouter({month,room}){
        this.$router.push({path:'/viewCalendar/detail',query: { month: month,room: room }})
      }
    },
    computed:{
      roomsByMonths(){
        return [
          {month:6,price: 6000,children:[{room:'A栋',price:1000},{room:'B栋',price:2000},{room:'C栋',price:3000}]},
          {month:7,price: 9000,children:[{room:'A栋',price:2000},{room:'B栋',price:3000},{room:'C栋',price:4000}]},
          {month:8,price: 6000,children:[{room:'A栋',price:3000},{room:'B栋',price:2000},{room:'C栋',price:1000}]},
        ]
      },
      monthsByRooms(){
        return [
          {room: 'A栋',price:30000,children:[{month:6,price:10000},{month:7,price:10000},{month:8,price:10000}]},
          {room: 'B栋',price:30000,children:[{month:6,price:10000},{month:7,price:10000},{month:8,price:10000}]},
          {room: 'C栋',price:30000,children:[{month:6,price:10000},{month:7,price:10000},{month:8,price:10000}]}
        ]
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";
  .view-calendar{
    width: 100vw;
    height: 100vh;
    background: $background;
    header{
      position: relative;
      padding: 12px;
      text-align: center;
      background: #fff;
      .text{color: $black}
      >i{color: #7e8c8d;position: absolute;top: 12px;left: 12px;}
    }
  }
  .view-calendar .tabs{
    margin: 12px 24px;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    overflow:hidden;
    border: 1px solid #4d92df;
    span{
      padding: 8px;
      flex:1;
      text-align: center;
      font-size: 12px;
      background-color: #ffffff;
      color: #4d92df;
      &.active{color: #ffffff;background-color: #4d92df}
    }
  }
</style>
