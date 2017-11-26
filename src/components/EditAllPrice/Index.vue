<template>
  <div class="edit-all-price-index">
    <choose-room @pushRouter="pushRouter"></choose-room>
  </div>
</template>
<script type="text/ecmascript-6">
  import ChooseRoom from '../common/ChooseRoom.vue'

  export default{
    components:{
      ChooseRoom
    },
    methods:{
      pushRouter({homeId}){
        this.$router.push({path:'/editAllPrice/edit',query: { homeId }})
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "../../common/css/mixin.scss";
  .edit-all-price-index{
    width: 100vw;
    height: 100vh;
    background: $background;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

