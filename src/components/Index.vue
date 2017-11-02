<template>
  <div class="index">
    <router-link to="/viewCalendar">
      <div class="icon-wrapper blue">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#demo-calendar"></use>
        </svg>
      </div>
      <div class="text">
        <p>查看/关闭</p>
        <p>日历</p>
      </div>
      <i class="el-icon-arrow-right"></i>
    </router-link>
    <router-link to="/statistics">
      <div class="icon-wrapper purple">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#demo-statistics"></use>
        </svg>
      </div>
      <div class="text">
        <p>收入</p>
        <p>统计</p>
      </div>
      <i class="el-icon-arrow-right"></i>
    </router-link>
    <router-link to="/editAllPrice/index">
      <div class="icon-wrapper orange">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#demo-all-price"></use>
        </svg>
      </div>
      <div class="text">
        <p>调整</p>
        <p>全部价格</p>
      </div>
      <i class="el-icon-arrow-right"></i>
    </router-link>
    <router-link to="/editPrice/index">
      <div class="icon-wrapper pink">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#demo-price"></use>
        </svg>
      </div>
      <div class="text">
        <p>调整</p>
        <p>单个价格</p>
      </div>
      <i class="el-icon-arrow-right"></i>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
  @import "../common/css/mixin.scss";

  .index{
    padding: 24px 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    a{
      width: 48%;
      padding: 16px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-radius: 5px;
      background-color: #f8f8f8;
      .icon-wrapper{
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 50%;
        &.blue{background-color: #59bcfc;}
        &.purple{background-color: #576b92;}
        &.orange{background-color: #f4a636;}
        &.pink{background-color: #f46e70;}
      }
      .text{
        margin-left: 8px;
        font-size: 12px;
        color: $black;
        flex: 1;
        p:first-of-type{
          margin-bottom: 8px;
        }
      }
    }

  }
  svg.icon{
    width: 1.1em; height: 1.1em;
    vertical-align: -0.15em;
    fill: #fff;
    overflow: hidden;
  }
</style>
