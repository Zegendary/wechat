<template>
  <div class="login">
    <p class="title">晓崇明商户管理系统</p>
    <div class="form-wrapper">
      <form>
        <div class="row">
          <span>商家账户:</span>
          <input type="text" v-model="formData.username" placeholder="手机号">
        </div>
        <div class="row">
          <span>密码:</span>
          <input type="password" v-model="formData.password" placeholder="密码">
        </div>
        <div class="actions">
          <el-button @click="signIn" class="submit" type="primary">登录</el-button>
          <span class="errorMessage">{{errorMessage}}</span>
        </div>
      </form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage: ''
      }
    },
    methods: {
      signIn(){
        this.$router.push({path: '/'})
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../common/css/mixin.scss";

  .title{
    text-align: center;
    padding: 16px;
    @include border-1px-bottom($border-color)
  }
  .form-wrapper{
    padding: 8px 16px;
    .row{
      margin-top: 16px;
      padding-bottom: 16px;
      @include border-1px-bottom($border-color);
      input{
        outline: none;
        margin-left: 16px;
      }
      span{
        color: $black;
      }
    }
    .actions{
      margin-top: 32px;
      width: 100%;
      .submit{
        width: 100%;
      }
    }
  }
</style>
