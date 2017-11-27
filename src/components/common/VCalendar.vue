<template>
  <div class="v-calendar">
    <p class="month">{{year}}年{{month}}月</p>
    <ul class="date-price">
      <li @click="chooseDate(list[0],year,month)" :style="{marginLeft: 100*prevMonthDays/7+'%'}"
        :class="{past: (list[0].day<nowDate && month == nowMonth) || (month < nowMonth && year == nowYear),
        today:list[0].day == nowDate && month == nowMonth,
        later:(list[0].day>nowDate && month == nowMonth)||month > nowMonth||year>nowYear,
        blank: list[0].channel == '',
        selected: selected(list[0])>0}"
      >
        <p class="date">{{list[0].day}}</p>
        <p class="channel">{{list[0].channel|| '无'}}</p>
        <p class="price" v-if="!list[0].state">¥{{list[0].priceChange_day||list[0].priceChange_week||list[0].price}}</p>
        <p class="price">¥{{list[0].channel_price}}</p>
      </li>
      <li v-for="(item,index) in list"
          @click="chooseDate(item,year,month)"
          v-if="index !==0" :class="{
          past: (item.day<nowDate && month == nowMonth) || (month < nowMonth && year == nowYear),
        today:item.day == nowDate && month == nowMonth,
        later:(item.day>nowDate && month == nowMonth)||month > nowMonth||year>nowYear,
        blank: item.channel == '',
        selected: selected(item)>0}">
        <p class="date">{{item.day}}</p>
        <p class="channel">{{item.channel|| '无'}}</p>
        <p class="price" v-if="!item.state">¥{{item.priceChange_day||item.priceChange_week||item.price}}</p>
        <p class="price" v-else>¥{{item.channel_price}}</p>
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
    props:['year','month','selectedDates'],
    data(){
      return {
        prevMonthDays: '',
        list:[{
          day:''
        }],
        nowDate: mydate.getDate(),
        nowMonth: mydate.getMonth() + 1,
        nowYear: mydate.getFullYear()
      }
    },
    created(){
      this.$http.get(`http://api.xcm168.com/api/house/calendar/${this.$route.query.id}?year=${this.year}&month=${this.month}`).then(({data})=>{
        this.list = data[0].list
        this.prevMonthDays = getMonthweek(this.year,this.month)
      })
    },
    methods:{
      chooseDate(date,year,month){
        if (date.channel == ''){
          if((date.day>=this.nowDate && month == this.nowMonth) || month > this.nowMonth || year > this.nowYear){
            this.$emit('selectDate',{date,year,month})
          }
        }
      },
      selected(val){
        return this.selectedDates.filter((item)=>{
          return item.year == this.year && item.month == this.month && item.date.day == val.day
        }).length
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
