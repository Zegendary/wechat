<template>
  <div class="edit-all-price-index">
    <choose-room @pushRouter="pushRouter"></choose-room>
  </div>
</template>
<script type="text/ecmascript-6">
  import ChooseRoom from '../common/ChooseRoom.vue'

  export default{
    created(){
      // ajax
    },
    components:{
      ChooseRoom
    },
    methods:{
      pushRouter({room}){
        this.$router.push({path:'/editAllPrice/edit',query: { room: room }})
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

