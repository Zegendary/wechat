<template>
  <el-collapse class="roomsByMonths">
    <el-collapse-item v-for="(item,index) in roomsByMonths" :key="index" :class="{green: price}">
      <template slot="title">
        <p class="title"><span>{{item.month}}月</span><span class="price" v-show="price">¥{{allPrice || 0}}</span></p>
      </template>
      <ul>
        <li v-for="child in item.children" @click="checkRoom(item.month,child.id)">
          <p>
            <span>{{child.name}}</span>
            <span class="price" v-show="price">¥{{child.price}}</span>
          </p>
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
    </el-collapse-item>
  </el-collapse>
</template>
<script type="text/ecmascript-6">
  export default{
    props: ['roomsByMonths','price'],
    methods: {
      checkRoom(month,id){
        this.$emit('pushRouter',{ month: month,id: id })
      }
    },
    computed:{
      allPrice(){
        if(this.roomsByMonths.children){
          return this.roomsByMonths.children.reduce(a,b=>a.price+b.price)
        } else{
          return 0
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  @import "../../common/css/mixin.scss";

  .roomsByMonths{
    border-bottom: none;
    @import "../../common/css/collapse.scss";
    .el-collapse-item__header:before{
      background-color: #4d92df;
    }
    .green .el-collapse-item__header:before{
      background-color: $green;
    }
  }

</style>
