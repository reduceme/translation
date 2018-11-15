<template>
  <div class="out-content">
    <div class="img-content"></div>
    <div class="login-content">
      <div class="login-title">
        <p>科普中国，绿色核能</p>
      </div>
      <div class="login-input-content">
        <div class="login-input-parent">
          <el-input
            placeholder="请输入用户名称"
            v-model="emailAddress">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </div>
        <div class="login-input-parent">
          <el-input
            placeholder="请输入登录密码"
            type="password"
            name="password"
            auto-complete="off"
            v-model="password">
            <i slot="prefix" class="el-input__icon el-icon-view"></i>
          </el-input>
        </div>
        <div class="login-input-parent" style="display: none">
          <el-input
            placeholder="请输入验证码"
            v-model="code"
            style="width: 70%; float: left">
            <i slot="prefix" class="el-input__icon el-icon-picture"></i>
          </el-input>
          <div @click="getCode()" class="login-code-content">
            <img :src="imgUrl">
          </div>
        </div>
        <div class="login-input-parent">
          <el-button type="primary" @click.native="login()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-view',
  data () {
    return {
      imgUrl: 'http://115.29.106.226:1111/user/getCode',
      serverUrl: 'http://115.29.106.226:1111/user/getCode'
    }
  },
  computed: {
    emailAddress: {
      get () {
        return this.$store.state.login.emailAddress
      },
      set (value) {
        this.$store.commit('updateEmailAddress', value)
      }
    },
    password: {
      get () {
        return this.$store.state.login.password
      },
      set (value) {
        this.$store.commit('updatePassword', value)
      }
    },
    code: {
      get () {
        return this.$store.state.login.code
      },
      set (value) {
        this.$store.commit('updateCode', value)
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login')
    },
    RndNum (n) {
      var rnd = ''
      for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10)
      }
      return rnd
    },
    getCode () {
      this.imgUrl = this.serverUrl + '?code=' + this.RndNum(5)
    }
  }
}
</script>

<style scoped>
  .out-content {
    position: relative;
    width: 100%;
    height: 800px;
  }

  .login-content {
    border: solid 1px #D7D6D7;
    box-shadow: darkgrey 0px 0px 10px 0px;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 420px;
    height: 480px;
    transform: translate(-50%, -50%);
    background: white;
  }

  .login-title {
    height: 150px;
  }

  .login-title p {
    display: block;
    height: 150px;
    line-height: 150px;
    font-size: 33px;
    font-weight: 700;
    margin: 0;
    color: #3a8ee6;
  }

  .login-input-content {
    height: calc(100% - 150px);
  }

  .login-input-parent {
    width: calc(100% - 80px);
    padding: 20px 40px 10px 40px;
    height: 40px;
  }

  .el-button--primary {
    width: 100%;
    /*background: #0BE897;*/
    /*border-color: #0BE897;*/
  }

  /*.el-button--primary:hover {
    background: #06F9A0;
  }*/

  .register-content {
    width: 100%;
    height: 50px;
  }

  .register-inner-content {
    width: calc(100% - 40px);
    margin-right: 40px;
    text-align: right;
  }

  .register-inner-content a {
    cursor: pointer;
    color: #0BE897;
    text-decoration: none;
  }

  .login-code-content {
    float: right;
    display: block;
    width: 29%;
    cursor: pointer;
  }
</style>
