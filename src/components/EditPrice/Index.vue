<template>
  <div class="edit-price-index">
    <choose-room @pushRouter="pushRouter"></choose-room>
  </div>
</template>
<script type="text/ecmascript-6">
  import ChooseRoom from '../common/ChooseRoom.vue'
  let mydate = new Date();

  export default{
    data(){
      return {
        month: mydate.getMonth() + 1,
        year: mydate.getFullYear()
      }
    },
    components:{
      ChooseRoom
    },
    methods:{
      pushRouter({homeId}){
        this.$router.push({path:'/editPrice/edit',query: { id:homeId,month:`${this.year}-${this.month}` }})
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";
  .edit-price-index{
    width: 100vw;
    height: 100vh;
    background: $background;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

