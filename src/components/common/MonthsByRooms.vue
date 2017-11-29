<template>
  <el-collapse class="monthsByRooms">
    <el-collapse-item v-for="(item,index) in monthsByRooms" :key="index" :class="{green: price}">
      <template slot="title">
        <p class="title"><span>{{item.name}}</span><span class="price" v-show="price">¥{{allPrice || 0}}</span></p>
      </template>
      <ul>
        <li v-for="child in item.children" @click="checkRoom(item.id,child.month)">
          <p>
            <span>{{child.month}}月</span>
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
    props: ['monthsByRooms','price'],
    methods: {
      checkRoom(id,month){
        this.$emit('pushRouter',{ month: month,id: id })
      }
    },
    computed:{
      allPrice(){
        if(this.monthsByRooms.children){
          return this.monthsByRooms.children.reduce(a,b=>a.price+b.price)
        }else{
          return 0
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  @import "../../common/css/mixin.scss";

  .monthsByRooms{
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
