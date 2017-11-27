<template>
  <div class="edit-all-price">
    <ul>
      <li cass="header"><span>星期</span><span> 售价</span></li>
      <li v-for="(item,index) in weekPrices" :key="index">
        <span>周{{week[index]}}</span>
        <span><input type="number" v-model="item.price" placeholder="售价"><span class="price">元</span></span>
      </li>
    </ul>
    <div class="desctiption">
      <p>填写须知</p>
      <p>1. 整体调价会覆盖所选时间段内统一价格</p>
      <p>2. 价格为空的状态, 则不改价</p>
    </div>
    <footer>
      <button class="preview" @click="previewCalendar">日历预览</button>
      <button class="savePrice" @click="savePrice">保存修改</button>
    </footer>
  </div>
</template>
<script type="text/ecmascript-6">
  let mydate = new Date();

  export default{
    data(){
      return {
        weekPrices:[
          {price:''},
          {price:''},
          {price:''},
          {price:''},
          {price:''},
          {price:''},
          {price:''}
        ],
        week:["一", "二", "三", "四", "五", "六", "日"],
        month: mydate.getMonth() + 1,
        year: mydate.getFullYear()
      }
    },
    methods:{
      savePrice(){
        let params = new URLSearchParams()
        this.weekPrices.forEach((p,i)=>{
          if(p.price != 0){
            params.append('week[]',i+1)
            params.append('price[]',p.price)
          }
        })
        this.$http.post(`http://api.xcm168.com/api/bus/house/weekPrice/${this.$route.query.homeId}`,params).then(()=>{
          this.$message.success('更新成功')
        })
      },
      previewCalendar(){
        this.$router.push({path: '/editPrice/edit',query:{id: this.$route.query.homeId,month:`${this.year}-${this.month}`}})
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";

  .edit-all-price{
    width: 100vw;
    height: 100vh;
    position: relative;
    background: $background;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    footer{
      @include border-1px-top($border-color)
      position: absolute;
      padding: 12px;
      left: 0;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #fafafa;
      button{
        width: calc(50% - 6px);
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
      }
      button:first-child{
        border: 1px solid $silver;
        color: $silver;
        background-color: transparent;
      }
      button:last-child{
        border: 1px solid $green;
        color: #ffffff;
        background-color: $green;
      }
    }
    li{background-color: #ffffff;padding: 12px;@include border-1px-bottom($extra-light-gray);font-size: 14px;}
    li:first-child{color: $silver}
    li{
      span:first-child{
        margin-right: 16px;
      }
      span.price{color: $silver}
      input{outline: none}
    }
    li:last-child,li:nth-last-child(2){span:first-child{color: $green}}
    .desctiption{
      padding: 16px 12px;
      font-size: 14px;
      color: $silver;
      p{
        margin-bottom: 12px;
      }
    }

  }
</style>
