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
      <keep-alive>
        <rooms-by-months v-if="homeFirst" @pushRouter="pushRouter" :price="false" :rooms-by-months="roomsByMonths"></rooms-by-months>
        <months-by-rooms v-if="!homeFirst" @pushRouter="pushRouter" :price="false" :months-by-rooms="monthsByRooms"></months-by-rooms>
      </keep-alive>
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
        roomsByMonths:[],
        monthsByRooms:[]
      }
    },
    components:{
      RoomsByMonths,
      MonthsByRooms
    },
    created(){
      this.$http.get('http://api.xcm168.com/api/bus/houses').then(({data})=>{
        this.homes = data.data
        this.initData()
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
      pushRouter({month,id}){
        this.$router.push({path:'/viewCalendar/detail',query: { month: month,id: id }})
      },
      initData(){
        let month = new Date().getMonth()+1
        let year = new Date().getFullYear()
        for(let i = 0;i<4;i++){
          if(month+i>12){
            month = month - 12
            year = year + 1
          }
          this.months.push({month:`${year}-${month+i}`})
          this.roomsByMonths.push({month:`${year}-${month+i}`,children:this.homes})
        }
         this.homes.forEach((h)=>{
          h.children = this.months
        })
        this.monthsByRooms = this.homes
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
