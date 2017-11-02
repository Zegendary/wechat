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
    <VCalendar :datePrice="datePrice" @selectDate="selectDate" :selectedDates="selectedDates"></VCalendar>
    <VCalendar :datePrice="datePrice1" @selectDate="selectDate" :selectedDates="selectedDates"></VCalendar>
    <div class="model" v-if="editPrice">
      <div class="input-wrapper">
        <p class="header">
          <span>关闭日期</span>
          <i class="el-icon-close cancel" @click="cancelEdit"></i>
        </p>
        <ul class="input">
          <li><span>日期:</span><span>{{selectedDates[0].date}}</span></li>
          <li><span>预定:</span><input type="text" v-model="selectedDates[0].platform"></li>
          <li><span>价格:</span><input type="number" v-model="selectedDates[0].price"></li>
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
        datePrice:{
          year: 2017,
          month: 11,
          data:[
            {date:'2017-11-1',price:1000,platform:"携程"},
            {date:'2017-11-2',price:1000,platform:"携程"},
            {date:'2017-11-3',price:1000,platform:"携程"},
            {date:'2017-11-4',price:1000,platform:"携程"},
            {date:'2017-11-5',price:1000,platform:"携程"},
            {date:'2017-11-6',price:1000,platform:"携程"},
            {date:'2017-11-7',price:1000,platform:"驴妈妈"},
            {date:'2017-11-8',price:1000,platform:"携程"},
            {date:'2017-11-9',price:1000,platform:"携程"},
            {date:'2017-11-10',price:1000,platform:"携程"},
            {date:'2017-11-11',price:1000,platform:"携程"},
            {date:'2017-11-12',price:1000,platform:"携程"},
            {date:'2017-11-13',price:1000,platform:"携程"},
            {date:'2017-11-14',price:1000,platform:"携程"},
            {date:'2017-11-15',price:1000,platform:"携程"},
            {date:'2017-11-16',price:1000,platform:"携程"},
            {date:'2017-11-17',price:1000,platform:""},
            {date:'2017-11-18',price:1000,platform:""},
            {date:'2017-11-19',price:1000,platform:""},
            {date:'2017-11-20',price:1000,platform:""},
            {date:'2017-11-21',price:1000,platform:"携程"},
            {date:'2017-11-22',price:1000,platform:"携程"},
            {date:'2017-11-23',price:1000,platform:"携程"},
            {date:'2017-11-24',price:1000,platform:"携程"},
            {date:'2017-11-25',price:1000,platform:"携程"},
            {date:'2017-11-26',price:1000,platform:"携程"},
            {date:'2017-11-27',price:1000,platform:"携程"},
            {date:'2017-11-28',price:1000,platform:"携程"},
            {date:'2017-11-29',price:1000,platform:"携程"},
            {date:'2017-11-30',price:1000,platform:"携程"},
          ]
        },
        datePrice1:{
          year: 2017,
          month: 12,
          data:[
            {date:'12-1',price:1000,platform:"携程"},
            {date:'12-2',price:1000,platform:"携程"},
            {date:'12-3',price:1000,platform:"携程"},
            {date:'12-4',price:1000,platform:"携程"},
            {date:'12-5',price:1000,platform:"携程"},
            {date:'12-6',price:1000,platform:"携程"},
            {date:'12-7',price:1000,platform:"驴妈妈"},
            {date:'12-8',price:1000,platform:"携程"},
            {date:'12-9',price:1000,platform:"携程"},
            {date:'12-10',price:1000,platform:"携程"},
            {date:'12-11',price:1000,platform:"携程"},
            {date:'12-12',price:1000,platform:"携程"},
            {date:'12-13',price:1000,platform:"携程"},
            {date:'12-14',price:1000,platform:"携程"},
            {date:'12-15',price:1000,platform:"携程"},
            {date:'12-16',price:1000,platform:"携程"},
            {date:'12-17',price:1000,platform:""},
            {date:'12-18',price:1000,platform:""},
            {date:'12-19',price:1000,platform:""},
            {date:'12-20',price:1000,platform:""},
            {date:'12-21',price:1000,platform:"携程"},
            {date:'12-22',price:1000,platform:"携程"},
            {date:'12-23',price:1000,platform:"携程"},
            {date:'12-24',price:1000,platform:"携程"},
            {date:'12-25',price:1000,platform:"携程"},
            {date:'12-26',price:1000,platform:"携程"},
            {date:'12-27',price:1000,platform:"携程"},
            {date:'12-28',price:1000,platform:"携程"},
            {date:'12-29',price:1000,platform:"携程"},
            {date:'12-30',price:1000,platform:"携程"},
            {date:'12-31',price:1000,platform:"携程"},
          ]
        },
        selectedDates: [],
        editPrice: false
      }
    },
    components: {
      VCalendar
    },
    methods:{
      selectDate(val){
        this.selectedDates = [val]
        this.editPrice = true
      },
      goBack(){
        this.$router.push({path:'/viewCalendar'})
      },
      cancelEdit(){
        this.editPrice = false
        this.selectedDates = []
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
