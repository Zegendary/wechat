<template>
  <div class="edit-price">
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
    <transition name="slide">
      <footer v-show="selectedDates.length && !editPrice">
        <div class="text">已选择 <span>{{selectedDates.length}}</span>天</div>
        <button @click="cancel">取消</button>
        <button @click="editPrice = true">调整价格</button>
      </footer>
    </transition>
    <div class="model" v-if="editPrice">
      <div class="input-wrapper">
        <p class="header">
          <span class="cancel" @click="cancelPrice">取消</span>
          <span>输入价格</span>
          <span class="confirm" @click="savePrice">确定</span>
        </p>
        <div class="input">
          <span>售价</span>
          <input type="number" v-model="price" v-focus>
          <span>元</span>
        </div>
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
      savePrice(){
        let params = new URLSearchParams()
        for(let i = 0;i<this.day.length;i++){
          params.append('day[]',this.day[i])
        }
        params.append('price',this.price)
        this.$http.post(`http://api.xcm168.com/api/bus/house/price/${this.$route.query.id}`,params).then((response)=>{
          this.$message.success('提交成功')
          location.reload()
        })
      },
      cancelPrice(){
        this.editPrice = false
      },
      cancel(){
        this.selectedDates = []
      },
      goBack(){
        this.$router.push({path:'/editPrice/index'})
      },
      selectDate(val){
        let index = this.selectedDates.indexOf(val)
        if(index == -1){
          this.selectedDates.push(val)
        }else if(index > -1){
          this.selectedDates.splice(index,1)
        }
      }
    },
    computed:{
      day(){
        return this.selectedDates.map((s)=>{
          return `${s.year}-${s.month}-${s.date.day}`
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";

  .edit-price{
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
    footer{
      @include border-1px-top($border-color)
      position: fixed;
      padding: 12px;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fafafa;
      div{
        flex: 1;
        span{
          margin: 0 4px;
          color: $red;
        }
      }
      button{
        border-radius: 4px;
        font-size: 14px;
        outline: none;
      }
      button:first-of-type{
        border: 1px solid $silver;
        padding: 8px 24px;
        color: $silver;
        background-color: transparent;
      }
      button:last-child{
        margin-left: 8px;
        padding: 8px;
        border: 1px solid $red;
        color: #ffffff;
        background-color: $red;
      }
    }
    .slide-enter-active, .slide-leave-active {
      transition: all .5s
    }
    .slide-enter, .slide-leave-to{
      transform: translateY(60px);
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
        width: 100%;
        background: $background;
        .header{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          background: #ffffff;
          color: $black;
          .cancel,.confirm{
            color: $green;
          }
        }
        .input{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 24px 12px;
          padding: 8px;
          background: #fff;
          color: $silver;
          input{
            outline: none;
            flex: 1;
            margin: 4px 12px;
          }
        }
      }
    }
  }
</style>
