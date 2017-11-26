<template>
  <div class="detail">
    <header>
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <span class="text">日期选择</span>
    </header>
    <ul class="week">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <VCalendar :year="year" :month="month" @selectDate="selectDate" :selectedDates="selectedDates"></VCalendar>
    <VCalendar :year="nextYear" :month="nextMonth" @selectDate="selectDate" :selectedDates="selectedDates"></VCalendar>
    <div class="model" v-if="editPrice">
      <div class="input-wrapper">
        <p class="header">
          <span>关闭日期</span>
          <i class="el-icon-close cancel" @click="cancelEdit"></i>
        </p>
        <ul class="input">
          <li><span>日期:</span><span>{{selectedDates[0].year}}年{{selectedDates[0].month}}月{{selectedDates[0].date.day}}日</span></li>
          <li><span>预定:</span><input type="text" v-model="channel"></li>
          <li><span>价格:</span><input type="number" v-model="price"></li>
          <li><button @click="confirm">确定</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VCalendar from '../common/VCalendar.vue'

  export default{
    data(){
      return {
        year:'',
        month:'',
        nextYear:'',
        nextMonth:'',
        selectedDates: [],
        editPrice: false,
        channel: '',
        price: ''
      }
    },
    created(){
      let id = this.$route.query.id
      let dateArr = this.$route.query.month.split('-');
      this.year = dateArr[0]
      this.month = dateArr[1]
      if(dateArr[1] == 12){
        dateArr[0] = +dateArr[0]+1
        dateArr[1] = +dateArr[1]-12
      }
      this.nextYear = dateArr[0]
      this.nextMonth = +dateArr[1]+1
    },
    components: {
      VCalendar
    },
    methods:{
      selectDate(val){
        this.price = val.date.priceChange_day||val.date.priceChange_week||val.date.price
        this.selectedDates = [val]
        this.editPrice = true
      },
      goBack(){
        this.$router.push({path:'/viewCalendar'})
      },
      cancelEdit(){
        this.editPrice = false
        this.selectedDates = []
      },
      confirm(){
        this.$http.post(`http://api.xcm168.com/api/bus/house/calendar/close/${this.$route.query.id}`,{
          day: `${this.selectedDates[0].year}-${this.selectedDates[0].month}-${this.selectedDates[0].date.day}`,
          note: this.channel,
          price: this.price
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";

  .detail{
    width: 100vw;
    height: 100vh;
    position: relative;
    padding-bottom: 50px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    header{
      position: relative;
      padding: 12px;
      text-align: center;
      background: #fff;
      .text{color: $black}
      >i{color: #7e8c8d;position: absolute;top: 12px;left: 12px;}
    }
    .week{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: #fcfcfc;
      @include border-1px-bottom($border-color)
      li{
        text-align: center;
        padding: 8px 0;
        font-size: 14px;
        flex:1;
        &:first-child,&:last-child{
          color: $green;
        }
      }
    }
    .model{
      position: fixed;
      top:0;
      left:0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      background: rgba(0,0,0,.5);
      .input-wrapper{
        position: absolute;
        bottom: 0;
        left: 0;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        width: 100%;
        background:#fff;
        overflow: hidden;
        .header{
          text-align: center;
          padding: 12px 8px;
          font-size: 16px;
          color: $black;
          @include border-1px-bottom($border-color)
          .cancel{
            position: absolute;
            right: 12px;
            top: 14px;
            font-size: 12px;
            color: $silver;
          }
        }
        .input{
          padding: 16px 16px 0 16px;
          background: #fff;
          li{
            margin-bottom: 24px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span:first-child{
              color: $silver;
              margin-right: 12px;
            }
            input{
              flex: 1;
              border: 1px solid $silver;
              outline: none;
              padding: 4px 4px;
            }
            button{
              width: 100%;
              border:none;
              padding: 12px;
              border-radius: 4px;
              background: $green;
              color: #ffffff;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
