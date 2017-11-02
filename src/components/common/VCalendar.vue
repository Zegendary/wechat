<template>
  <div class="v-calendar">
    <p class="month">{{datePrice.month}}月</p>
    <ul class="date-price">
      <li @click="chooseDate(datePrice.data[0])" :style="{marginLeft: 100*prevMonthDays/7+'%'}"
        :class="{past: datePrice.data[0].date<nowDate || datePrice.month < nowMonth,
        today:datePrice.data[0].date == nowDate && datePrice.month == nowMonth,
        later:(datePrice.data[0].date>nowDate && datePrice.month == nowMonth)||datePrice.month >= nowMonth,
        blank: datePrice.data[0].platform == '',
        selected: selectedDates.indexOf(datePrice.data[0])>-1}"
      >
        <p class="date">{{datePrice.data[0].date.split('-')[2]}}</p>
        <p class="platform">{{datePrice.data[0].platform|| '无'}}</p>
        <p class="price">¥{{datePrice.data[0].price||0}}</p>
      </li>
      <li v-for="(item,index) in datePrice.data"
          @click="chooseDate(item)"
          v-if="index !==0" :class="{
          past: item.date<nowDate || datePrice.month < nowMonth,
        today:item.date == nowDate,
        later:(item.date>nowDate && datePrice.month == nowMonth)||datePrice.month >= nowMonth,
        blank: item.platform == '',
        selected: selectedDates.indexOf(item)>-1}">
        <p class="date">{{item.date.split('-')[2]}}</p>
        <p class="platform">{{item.platform|| '无'}}</p>
        <p class="price">¥{{item.price||0}}</p>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  let mydate = new Date();
  let dateformat = (mydate) => {
    return mydate.getFullYear() + '/' + (mydate.getMonth() + 1) + '/' + mydate.getDate()
  }
  let getMonthweek = (year,month) => { //获取本月第一天是星期几，然后在去向前空几个
    let date_one = new Date(year + "/" + month + "/1")
    return date_one.getDay()
  }
  export default{
    props:['datePrice','selectedDates'],
    data(){
      return {
        prevMonthDays: getMonthweek(this.datePrice.year,this.datePrice.month),
        nowDate: mydate.getDate(),
        nowMonth: mydate.getMonth() + 1
      }
    },
    methods:{
      chooseDate(Date){
        if (Date.platform == ''){
          this.$emit('selectDate',Date)
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";
  .v-calendar{
    background-color: #ffffff;
    padding-bottom: 12px;
    .month{font-size: 20px;color: $black;padding: 8px}
    .date-price{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li{
        width: calc(100% / 7);
        padding: 8px 0;
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        &.later{
          color: #666;
        }
        &.blank{
          color: $red;
        }
        &.past{
          color: #ccc;
        }
        &.today{
          color: $green;
        }
        &.selected{
          color:#ffffff;
          background-color: $green;
        }
        p{
          font-weight: 500;
        }
        p:first-child{
          font-size: 14px;
        }
        p:nth-child(2){
          font-size: 12px;
          height: 24px;
          line-height: 24px;
        }
        p:last-child{
          font-size: 12px;
        }
      }
    }
  }
</style>
