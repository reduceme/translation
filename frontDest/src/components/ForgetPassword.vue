<template>
  <div>
    <p class="title">重置密码</p>
    <el-popover
      placement="right"
      title=""
      width="200"
      trigger="manual"
      content="请输入邮箱"
      v-model="isAbled.emailAddress">
      <el-input @keyup.native="keyupFn" slot="reference" v-model="emailAddress" placeholder="邮箱"></el-input>
    </el-popover>
    <el-popover
      placement="right"
      title=""
      width="200"
      trigger="manual"
      content="请输入验证码"
      v-model="isAbled.code">
      <el-input
        slot="reference"
        v-model="code"
        @keyup.native="keyupFn"
        placeholder="请输入验证码"
        style="width: 54%; float: left">
        <i slot="prefix" class="el-input__icon el-icon-picture"></i>
      </el-input>
      <div  slot="reference" class="login-code-content">
        <el-button class="code-btn" type="primary" :disabled="isDisabled" @click.native="sendMsg">{{buttonName}}</el-button>
      </div>
    </el-popover>
    <el-popover
      placement="right"
      title=""
      width="200"
      trigger="manual"
      content="请输入新密码"
      v-model="isAbled.newPassword">
      <el-input @keyup.native="keyupFn" slot="reference" v-model="newPassword" type="password" placeholder="新密码"></el-input>
    </el-popover>
    <el-popover
      placement="right"
      title=""
      width="200"
      trigger="manual"
      content="请确认密码"
      v-model="isAbled.confirmPwd">
      <el-input @keyup.native="keyupFn" slot="reference" v-model="confirmPwd" type="password" placeholder="确认密码"></el-input>
    </el-popover>
    <div class="font-btn-content">
      <el-button class="submit" @click.native="resetPwd" type="primary">重置密码</el-button>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import Axios from 'axios'
import QS from 'qs'
export default{
  name: 'forget-password-component',
  data () {
    return {
      buttonName: '获取验证码',
      isDisabled: false,
      time: 60,
      isAbled: {
        emailAddress: false,
        code: false,
        newPassword: false,
        confirmPwd: false
      }
    }
  },
  methods: {
    resetPwd () {
      let flag = true
      for (let i in this.isAbled) {
        if (this[i] === '') {
          this.isAbled[i] = true
          flag = false
        }
      }
      if (!flag) {
        return
      }
      if (this.newPassword === this.confirmPwd) {
        this.$store.dispatch('resetPwd')
      } else {
        Message.error({
          message: '两次密码输入不一致'
        })
      }
    },
    isUser () {
      Axios.post('isUser', QS.stringify({
        emailAddress: this.emailAddress
      })).then(response => {
        let data = response.data
        if (!data.success) {
          Message.error({
            message: '该邮箱未注册'
          })
          return
        }
        this.sendEmail()
      })
    },
    sendMsg () {
      if (this.emailAddress !== '') {
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!regEmail.test(this.emailAddress)) {
          Message.error({
            message: '请输入有效的邮箱地址'
          })
          return
        }
        this.isUser()
      } else {
        Message.error({
          message: '请输入邮箱'
        })
      }
    },
    sendEmail () {
      let me = this
      me.isDisabled = true
      me.buttonName = '发送中……'
      Axios.post('sendCodeEmail', QS.stringify({
        emailAddress: this.emailAddress
      })).then(response => {
        let data = response.data
        if (data.success) {
          Message.success({
            message: '邮件已发送，请前往邮箱获取验证码'
          })
          me.isDisabled = true
          let interval = window.setInterval(function () {
            me.buttonName = '（' + me.time + '秒）后重发'
            --me.time
            if (me.time < 0) {
              me.buttonName = '重新发送'
              me.time = 60
              me.isDisabled = false
              window.clearInterval(interval)
            }
          }, 1000)
        } else {
          Message.error({
            message: '邮件发送失败'
          })
          me.buttonName = '重新发送'
          me.time = 60
          me.isDisabled = false
        }
      }).catch(response => {
        Message.error({
          message: '邮件发送失败'
        })
        me.buttonName = '重新发送'
        me.time = 60
        me.isDisabled = false
      })
    },
    keyupFn () {
      for (let i in this.isAbled) {
        this.isAbled[i] = false
      }
    }
  },
  computed: {
    emailAddress: {
      get () {
        return this.$store.state.Login.forgetPwd.emailAddress
      },
      set (value) {
        this.$store.commit('updatePwdEmailAddress', value)
      }
    },
    newPassword: {
      get () {
        return this.$store.state.Login.forgetPwd.newPassword
      },
      set (value) {
        this.$store.commit('updatePwd', value)
      }
    },
    confirmPwd: {
      get () {
        return this.$store.state.Login.forgetPwd.confirmPwd
      },
      set (value) {
        this.$store.commit('updatePwdConfirm', value)
      }
    },
    code: {
      get () {
        return this.$store.state.Login.forgetPwd.code
      },
      set (value) {
        this.$store.commit('updatePwdCode', value)
      }
    }
  }
}
</script>

<style scoped>
  .title{
    font-size: 30px;
  }

  .el-input{
    margin-bottom: 15px;
  }

  .code-btn {
    display: block;
    float: right;
    width: 140px;
    background: #2E9400;
    border: solid 1px #2E9400;
  }

  .submit {
    background: #2E9400;
    border: solid 1px #2E9400;
    width: 100%;
  }

  .code-btn:hover, .submit:hover {
    opacity: 0.8;
  }
</style>

<style>
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    background: #2E9400;
    border: solid 1px #2E9400;
    opacity: 0.8;
  }
</style>
