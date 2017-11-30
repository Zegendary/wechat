<template>
  <div class="statistics" ref="wrapper">
    <div class="content">
      <header>
        <div @click="getYear(-1)">
          <i class="el-icon-arrow-left"></i>
          <span class="year">{{year-1}}</span>
        </div>
        <div class="income" @click="checkoutYearIncome"><span>年收益</span><span class="cutline">|</span><span class="thisYear">{{year}}</span></div>
        <div @click="getYear(1)">
          <span class="year">{{year+1}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </header>
      <div class="tabs">
        <span @click="homeFirst = true" :class="{active: homeFirst}">根据日期查看</span>
        <span @click="homeFirst = false" :class="{active: !homeFirst}">根据别墅查看</span>
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
        price: false,
        homes:[],
        months:[],
        year: new Date().getFullYear(),
        roomsByMonths:[],
        monthsByRooms:[]
      }
    },
    components:{
      RoomsByMonths,
      MonthsByRooms
    },
    created(){
      this.fetchData()
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
      pushRouter({month,id}){
        this.$router.push({path:'/statistics/month',query: { month: month,house_id: id,year: this.year }})
      },
      getYear(argu){
        this.year += argu
        this.fetchData()
      },
      checkoutYearIncome(){
        this.$router.push({path:'/statistics/year',query: { year: this.year }})
      },
      fetchData(){
        this.$http.get(`http://api.xcm168.com/api/bus/stat/revenue?type=house&year=${this.year}`).then(({data})=>{
          this.homes = data
          this.initData()
        })
        this.$http.get(`http://api.xcm168.com/api/bus/stat/revenue?type=calendar&year=${this.year}`).then(({data})=>{
          this.months = data
        })
      },
      initData(){
        this.homes.forEach((h)=>{
          h.children = h.months
        })
        this.months.forEach((m)=>{
          m.children = m.houses
        })
        this.monthsByRooms = this.homes
        this.roomsByMonths = this.months

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
