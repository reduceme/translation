<template>
  <div>
    <p class="to-login">
      <router-link class="has-account" :to="{path: '/hkjyyds/login'}">已有账号？前往登录>>></router-link>
    </p>
    <div class="img-content">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        action="string"
        :auto-upload="false"
        :multiple="false"
        :on-change="uploadImg">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!--<p>头像为<2M的JPG文件</p>-->
      <div style="clear:both;"></div>
    </div>
    <div class="content-parent">
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请输入姓名"
          v-model="isAbled.userName">
          <el-input slot="reference" @keyup.native="keyupFn" placeholder="姓名" v-model="userInfo.userName"></el-input>
        </el-popover>
      </div>
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请选择性别"
          v-model="isAbled.sex">
          <el-select slot="reference" @change="keyupFn" placeholder="请选择性别" v-model="userInfo.sex">
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-popover>
      </div>
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请输入单位"
          v-model="isAbled.work">
          <el-input slot="reference" @keyup.native="keyupFn" placeholder="单位" v-model="userInfo.work"></el-input>
        </el-popover>
      </div>
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请输入手机号码"
          v-model="isAbled.phoneNumber">
          <el-input slot="reference" @keyup.native="keyupFn" placeholder="手机号码"
                    v-model="userInfo.phoneNumber"></el-input>
        </el-popover>
      </div>
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请输入大赛注册码"
          v-model="isAbled.inputCode">
          <el-input slot="reference" @keyup.native="keyupFn" placeholder="请输入大赛注册码" v-model="inputCode"></el-input>
        </el-popover>
      </div>
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请输入邮箱地址"
          v-model="isAbled.emailAddress">
          <el-input slot="reference" @keyup.native="keyupFn" v-model="userInfo.emailAddress" class="email-input"
                    placeholder="邮箱" type="email"></el-input>
        </el-popover>
        <el-button class="code-btn" type="primary" :disabled="isDisabled" @click.native="sendMsg">{{buttonName}}
        </el-button>
        <div style="clear:both;"></div>
      </div>
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请输入邮箱验证码"
          v-model="isAbled.code">
          <el-input slot="reference" @keyup.native="keyupFn" v-model="userInfo.code" placeholder="邮箱验证码"></el-input>
        </el-popover>
      </div>
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请输入密码"
          v-model="isAbled.password">
          <el-input slot="reference" type="password" @keyup.native="keyupFn" v-model="userInfo.password"
                    placeholder="请输入6-20位字母数字组合的密码"></el-input>
        </el-popover>
      </div>
      <div class="input-content">
        <el-popover
          placement="right"
          title=""
          width="200"
          trigger="manual"
          content="请确认密码"
          v-model="isAbled.confirmPassword">
          <el-input slot="reference" type="password" @keyup.native="keyupFn" v-model="userInfo.confirmPassword"
                    placeholder="确认密码"></el-input>
        </el-popover>
      </div>
      <div class="input-content notice-content">
        <el-button size="mini" @click.native="showFileModal">上传附件</el-button>
        <p class="registered-notice">
          <i class="el-icon-warning"></i>
          <router-link class="has-account" :to="{path: 'Notice'}">注册须知</router-link>
        </p>
        <div style="clear:both;"></div>
      </div>
      <div class="input-content">
        <el-button class="submit" @click.native="registeredFn" type="primary" :disabled="registerBtn.isDisabled">
          {{registerBtn.msg}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import Axios from 'axios'
import QS from 'qs'
export default{
  name: 'registered-child-view',
  data () {
    return {
      imageUrl: '',
      sex: [{
        name: '男',
        value: '男'
      }, {
        name: '女',
        value: '女'
      }],
      buttonName: '获取验证码',
      isDisabled: false,
      time: 60,
      inputCode: '',
      isAbled: {
        userName: false,
        sex: false,
        work: false,
        phoneNumber: false,
        code: false,
        emailAddress: false,
        password: false,
        confirmPassword: false
      }
    }
  },
  methods: {
    uploadImg (file) {
      const isAllow = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      let flag = this.fileType(['jpg', 'jpeg', 'png', 'gif'], isAllow)
      if (flag) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.$store.commit('updateFormData', {
          name: 'photo',
          file: file
        })
      }
    },
    isUser () {
      Axios.post('isUser', QS.stringify({
        emailAddress: this.userInfo.emailAddress
      })).then(response => {
        let data = response.data
        if (data.success) {
          Message.error({
            message: '该邮箱已注册'
          })
          return
        }
        this.sendEmail()
      }).catch(response => {
        Message.error({
          message: '网络连接失败'
        })
      })
    },
    sendMsg () {
      if (this.userInfo.emailAddress !== '') {
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!regEmail.test(this.userInfo.emailAddress)) {
          Message.error({
            message: '请输入有效的邮箱地址'
          })
          return
        }
        this.isUser()
        // this.sendEmail()
      } else {
        Message.error({
          message: '请输入邮箱'
        })
      }
    },
    registeredFn () {
      let flag = true
      for (let i in this.userInfo) {
        if (this.userInfo[i] === '') {
          this.isAbled[i] = true
          flag = false
        }
      }
      if (!flag) {
        return
      }
      let regPhone = /^1[3456789]\d{9}$/
      if (!regPhone.test(this.userInfo.phoneNumber)) {
        Message.error({
          message: '请输入有效的手机号码'
        })
        return
      }
      let pwdReg = /^[A-Za-z0-9]{6,20}$/
      if (!pwdReg.test(this.userInfo.password)) {
        Message.error({
          message: '请输入符合规则的密码（6-20位字母数字组合）'
        })
        return
      }
      if (this.userInfo.password !== this.userInfo.confirmPassword) {
        Message.error({
          message: '两次密码输入不一致'
        })
        return
      }
      if (this.inputCode === this.userInfo.inputCode) {
        this.$store.dispatch('registeredFn')
      } else {
        Message.error({
          message: '大赛注册码有误，请确定后重新输入'
        })
      }
    },
    keyupFn () {
      for (let i in this.isAbled) {
        this.isAbled[i] = false
      }
    },
    showFileModal () {
      this.$store.commit('updateFileModal', true)
    },
    sendEmail () {
      let me = this
      me.isDisabled = true
      me.buttonName = '发送中……'
      Axios.post('sendCodeEmail', QS.stringify({
        emailAddress: this.userInfo.emailAddress
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
        }
      })
    },
    fileType (typeList, filetype) {
      let isAllow = false
      for (let i = 0; i < typeList.length; i++) {
        if (typeList[i] === filetype) {
          isAllow = true
        }
      }
      if (!isAllow) {
        Message.error({
          message: '上传文件格式不正确'
        })
      }
      return isAllow
    },
  },
  computed: {
    userInfo: {
      get () {
        return this.$store.state.Registered.userInfo
      },
      set () {
        this.$store.commit('updateUserInfo', this.userInfo)
      }
    },
    registerBtn: {
      get () {
        return this.$store.state.Registered.registerBtn
      }
    }
  }
}
</script>

<style scoped>
  .to-login {
    text-align: right;
    margin-right: 50px;
  }

  .has-account {
    font-size: 14px;
    color: #999;
    text-decoration: none;
  }

  .img-parent img {
    border-radius: 50%;
  }

  .img-content p {
    margin: 0px;
    font-size: 12px;
    color: #666;
  }

  .content-parent {
    padding: 20px 90px;
    width: calc(100% - 182px);
  }

  .input-content {
    margin-bottom: 10px;
  }

  .el-select {
    width: 100%;
  }

  .email-input {
    width: 220px;
    float: left;
    display: block;
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
    width: 250px;
  }

  .code-btn:hover, .submit:hover {
    opacity: 0.8;
  }

  .registered-notice {
    margin: 0;
    float: right;
    display: block;
  }

  .notice-content {
    text-align: left;
    margin-bottom: 25px;
  }

  .el-icon-warning {
    color: #FF0000;
  }

  .avatar-uploader .el-upload {
    /*border: 1px dashed #d9d9d9;*/
    /*border-radius: 50%;*/
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 60px;
    height: 60px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .avatar {
    width: 60px;
    height: 60px;
    display: block;
    border-radius: 50%;
  }

  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
    background: #2E9400;
    border: solid 1px #2E9400;
    opacity: 0.8;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
  }
</style>
