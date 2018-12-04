<template>
  <div>
    <el-input v-model="emailAddress" placeholder="邮箱"></el-input>
    <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
    <el-input
      v-model="code"
      placeholder="请输入验证码"
      style="width: 70%; float: left">
      <i slot="prefix" class="el-input__icon el-icon-picture"></i>
    </el-input>
    <div @click="getCode" class="login-code-content">
      <img :src="imgUrl">
    </div>
    <div style="clear:both;"></div>
    <p class="p-inline forget-or-registered text-left">
      <router-link class="forget-or-registered" :to="{path: 'forgetPsw'}">忘记密码</router-link>
    </p>
    <p class="p-inline text-right">
      <router-link class="forget-or-registered" :to="{path: '/hkjyyds/registered'}">没有账号？立即注册</router-link>
    </p>
    <div style="clear:both;"></div>
    <div class="font-btn-content">
      <el-button class="submit-btn" @click.native.enter="login" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
export default{
  name: 'login-component',
  data () {
    return {}
  },
  methods: {
    login () {
      this.$store.dispatch('login')
    },
    getCode () {
      this.$store.commit('updateImgUrl', {
        key: 'imgUrl'
      })
    }
  },
  computed: {
    emailAddress: {
      get () {
        return this.$store.state.Login.userInfo.emailAddress
      },
      set (value) {
        this.$store.commit('updateEmailAddress', value)
      }
    },
    password: {
      get () {
        return this.$store.state.Login.userInfo.password
      },
      set (value) {
        this.$store.commit('updatePassword', value)
      }
    },
    code: {
      get () {
        return this.$store.state.Login.userInfo.code
      },
      set (value) {
        this.$store.commit('updateCode', value)
      }
    },
    imgUrl: {
      get () {
        return this.$store.state.Login.imgUrl
      }
    }
  }
}
</script>

<style scoped>
  .registered-title {
    width: 100%;
    height: 100px;
    background: #2E9400;
  }

  .registered-title h1 {
    height: 100px;
    line-height: 100px;
    color: white;
    font-size: 28px;
  }

  .registered-detail {
    width: 100%;
    height: 385px;
  }

  .title-content {
    width: 100%;
    height: 150px;
    margin-top: 50px;
  }

  .title-content h1 {
    font-size: 30px;
    letter-spacing: 5px;
  }

  .title-content p {
    font-size: 20px;
    letter-spacing: 5px;
  }

  .login-inline {
    float: left;
    display: block;
    height: 500px;
  }

  .login-content-left {
    width: 250px;
    background: url("../images/7-0登录_03.jpg") no-repeat bottom center;
  }

  .login-content-right {
    width: 310px;
    height: 380px;
    padding: 60px 120px;
  }

  .forget-or-registered{
    font-size: 14px;
    color: #333333;
    text-decoration: none;
  }

  .text-right{
    text-align: right;
    margin: 14px 0;
  }

  .el-input{
    padding: 20px 0;
  }

  .login-code-content {
    float: right;
    display: block;
    width: 29%;
    cursor: pointer;
  }

  .text-left{
    text-align: left;
  }

  .font-btn-content{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .submit-btn{
    width: 310px;
    background: #2E9400;
    border: solid 1px #2E9400;
  }

  .login-code-content img{
    padding: 20px 0;
  }

  .p-inline{
    display: block;
    float: left;
    width: 50%;
  }
</style>
