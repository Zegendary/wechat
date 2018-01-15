<template>
  <div class="login">
    <p class="title">晓崇明商户管理系统</p>
    <div class="form-wrapper">
      <form>
        <div class="row">
          <span>商家账户:</span>
          <input type="text" v-model="formData.email" placeholder="邮箱或者手机号码">
        </div>
        <div class="row">
          <span>密码:</span>
          <input type="password" v-model="formData.password" placeholder="密码">
        </div>
        <div class="actions">
          <el-button @click="signIn" class="submit" type="primary">登录</el-button>
          <el-button @click="wechatSignIn" v-if="$route.query.first_login != 1" class="submit" type="success">微信登录</el-button>
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
          email: '',
          password: '',
          openid: this.$route.query.openid
        },
        errorMessage: ''
      }
    },
    created(){
      console.log(this.$route.query)
      console.log(document.location)
      if(this.$route.query.first_login == 0){
        let token = this.$route.query.token
        this.linkToIndex(token)
      }else if(this.$route.query.first_login == 1){
        this.$message('首次微信登陆需要绑定账号');
      }
    },
    methods: {
      signIn(){
        this.$http.post('http://api.xcm168.com/api/bus/auth',this.formData).then(({data})=>{
          let token = data.token
          this.linkToIndex(token)
        },(error)=>{
          this.$message.error('账号或密码不正确');
        })
      },
      wechatSignIn(){
        location.href = `http://api.xcm168.com/wechat/bus/oauth?callback_url=${encodeURIComponent(document.location.origin+'/#/login')}`
      },
      linkToIndex(token){
        this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        sessionStorage.setItem("token",token)
        this.$router.push({path: '/Index'})
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
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
      display: flex;
      justify-content: flex-start;
      @include border-1px-bottom($border-color);
      input{
        outline: none;
        margin-left: 16px;
        flex:1;
      }
      span{
        color: $black;
      }
    }
    .actions{
      margin-top: 32px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .submit{
        width: 100%;
      }
    }
  }
</style>
