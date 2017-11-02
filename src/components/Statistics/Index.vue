<template>
  <div class="statistics" ref="wrapper">
    <div class="content">
      <header>
        <div @click="getYear(-1)">
          <i class="el-icon-arrow-left"></i>
          <span class="year">{{thisYear-1}}</span>
        </div>
        <div class="income" @click="checkoutYearIncome"><span>年收益</span><span class="cutline">|</span><span class="thisYear">{{thisYear}}</span></div>
        <div @click="getYear(1)">
          <span class="year">{{thisYear+1}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </header>
      <div class="tabs">
        <span @click="homeFirst = true" :class="{active: homeFirst}">根据别墅查看</span>
        <span @click="homeFirst = false" :class="{active: !homeFirst}">根据日期查看</span>
      </div>
      <rooms-by-months v-if="homeFirst" @pushRouter="pushRouter" :price="true" :rooms-by-months="roomsByMonths"></rooms-by-months>
      <months-by-rooms v-if="!homeFirst" @pushRouter="pushRouter" :price="true" :months-by-rooms="monthsByRooms"></months-by-rooms>
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
        price: false,
        thisYear: new Date().getFullYear()
      }
    },
    components:{
      RoomsByMonths,
      MonthsByRooms
    },
    created(){
      // ajax
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {click: true})
      })
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      pushRouter({month,room}){
        this.$router.push({path:'/statistics/month',query: { month: month,room: room }})
      },
      getYear(argu){
        this.thisYear += argu
        // ajax fetch year
      },
      checkoutYearIncome(){
        this.$router.push({path:'/statistics/year',query: { year: this.thisYear }})
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
<style lang="scss" type="text/scss">
  @import "../../common/css/mixin.scss";
  .statistics{
    width: 100vw;
    height: 100vh;
    background: $background;
    header {
      position: relative;
      padding: 8px 12px;
      font-size: 14px;
      text-align: center;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .income{
        padding: 8px 16px;
        background-color: #f2f2f2;
        border-radius: 4px;
        color: $black;
        .cutline{
          margin: 0 16px;
          color: #999;
        }
      }
      i{color: #7e8c8d}
    }
  }
  .statistics .tabs{
    margin: 12px 24px;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    overflow:hidden;
    border: 1px solid $green;
    span{
      padding: 8px;
      flex:1;
      text-align: center;
      font-size: 12px;
      background-color: #ffffff;
      color: $green;
      &.active{color: #ffffff;background-color: $green}
    }
  }
</style>
