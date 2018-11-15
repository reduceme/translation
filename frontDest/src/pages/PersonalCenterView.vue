<template>
  <div class="out-content">
    <div class="person-content">
      <div class="blue-line"></div>
      <div class="blue-line line-right"></div>
      <div class="head-img-content">
        <div class="img-parent">
          <el-upload
            name="photo"
            class="avatar-uploader"
            :action="uploadFileUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="personal.photo !== ''" :src="imgUrl" height="160" width="160" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <p class="login-status" :class="personal.register ? '' : 'is-not-pass'">{{personal.registerMsg}}</p>
      <div class="user-info-content">
        <div class="content-same-style content-left">
          <p>&nbsp;&nbsp;真实姓名：</p>
          <el-input class="special-input" v-model="personal.userName" readonly placeholder="请输入姓名"></el-input>
        </div>
        <div class="content-same-style content-right">
          <p>&nbsp;&nbsp;手机号：</p>
          <el-input readonly v-model="personal.phoneNumber" placeholder="请输入联系方式"></el-input>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div class="user-info-content">
        <div class="content-same-style content-left">
          <p>&nbsp;&nbsp;性别：</p>
          <el-input readonly v-model="personal.sex" placeholder="请输入性别"></el-input>
        </div>
        <div class="content-same-style content-right">
          <p>&nbsp;&nbsp;邮箱：</p>
          <el-input readonly v-model="personal.emailAddress" placeholder="请输入邮箱"></el-input>
        </div>
        <div style="clear:both;"></div>
      </div>
      <!--<div class="user-info-content" style="margin-left: 25px;width: calc(100% - 25px)">-->
      <div class="user-info-content">
        <!--<div class="content-same-style content-left" style="float: left; display: block">-->
        <div class="content-same-style content-left">
          <p>&nbsp;&nbsp;工作单位：</p>
          <el-input readonly v-model="personal.work" placeholder="请输入工作单位"></el-input>
        </div>
        <!--<div class="content-same-style content-left" style="float: left; display: block">-->
        <div class="content-same-style content-left">
          <!--<p>&nbsp;&nbsp;工作单位：</p>-->
          <!--<el-input readonly v-model="personal.work" placeholder="请输入工作单位"></el-input>-->
        </div>
        <div style="clear:both;"></div>
      </div>
      <div class="user-document">
        <h1 class="inline-document">相关资料</h1>
        <p class="inline-document" style="cursor: pointer" @click="showModal">（点击上传）</p>
        <div style="clear:both;"></div>
        <div class="download-content">
          <div class="download-inline download-left">
            <div class="download-btn download-title">
              <p class="large-title">单位推荐函扫描件</p>
            </div>
            <div class="download-btn download-icon" @click="downloadFile(personal.recommandFile, 'rec')">
              <i class="el-icon-download"></i>
            </div>
          </div>
          <div class="download-inline download-center">
            <div class="download-btn download-title">
              <p class="large-title have-two-line">复赛演讲稿</p>
              <p>（中英文对照电子版）</p>
            </div>
            <div class="download-btn download-icon" @click="downloadFile(personal.speech, 'speech')">
              <i class="el-icon-download"></i>
            </div>
          </div>
          <div class="download-inline download-right">
            <div class="download-btn download-title">
              <p class="large-title have-two-line">决赛演讲稿</p>
              <p>（中英文对照电子版）</p>
            </div>
            <div class="download-btn download-icon" @click="downloadFile(personal.speech1, 'speech1')">
              <i class="el-icon-download"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="user-document">
        <h1>我的动态</h1>
        <div class="my-dynamic-content">
          <template>
            <el-table
              :data="userMsg"
              stripe
              style="width: 100%">
              <el-table-column
                prop="date"
                label=""
                width="180">
              </el-table-column>
              <el-table-column
                prop="message"
                label="">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
    <personal-upload-file></personal-upload-file>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import utils from '../utils/index'
import PersonalUploadFile from '../components/personalUploadFile'
export default{
  components: {PersonalUploadFile},
  name: 'personal-center-view',
  data () {
    return {
      fileList: [],
      uploadFileUrl: utils.uploadFileUrl + '?id=' + sessionStorage.getItem('userId'),
    }
  },
  computed: {
    personal: {
      get () {
        return this.$store.state.Personal.userInfo
      }
    },
    modalShow: {
      get () {
        return this.$store.state.Personal.uploadModal
      }
    },
    imgUrl: {
      get () {
        return this.personal.photo
      },
      set (value) {
        this.$store.commit('uploadImgUrl', value)
      }
    },
    userMsg: {
      get () {
        return this.$store.state.Personal.userMsg
      }
    }
  },
  methods: {
    downloadFile (hasFile, type) {
      if (hasFile !== '') {
        let id = sessionStorage.getItem('userId')
        location.href = utils.downloadFileUrl + '?type=' + type + '&id=' + id
      } else {
        Message.error({
          message: '您暂未上传该类型文件，请上传后再下载'
        })
      }
    },
    showModal () {
      this.$store.commit('updatePersonalModal', true)
    },
    handleAvatarSuccess (res, file) {
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        Message.error({
          message: '上传头像图片只能是 JPG 格式!'
        })
      }
      if (!isLt2M) {
        Message.error({
          message: '上传头像图片大小不能超过 2MB!'
        })
      }
      return isJPG && isLt2M
    }
  },
  mounted () {
    this.$store.dispatch('getUserDetail')
    this.$store.dispatch('getMessage')
  }
}
</script>

<style scoped>
  .out-content {
    position: relative;
    width: 100%;
    height: 1400px;
  }

  .person-content {
    border: solid 1px #D7D6D7;
    box-shadow: darkgrey 0px 0px 10px 0px;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 70%;
    height: 1300px;
    transform: translate(-50%, -50%);
    background: white;
  }

  .blue-line {
    margin-top: 120px;
    border: solid 1px #0393F6;
    position: absolute;
    width: calc(50% - 81px);
  }

  .line-right {
    margin-left: calc(50% + 79px);
  }

  .head-img-content {
    margin-top: 40px;
    text-align: center;
  }

  .img-parent {
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }

  .img-parent img {
    border-radius: 50%;
  }

  .login-status {
    font-size: 20px;
    color: #2E9400;
  }

  .user-info-content {
    width: 100%;
  }

  .content-same-style {
    width: calc(48% - 120px);
    height: 80px;
    /*display: inline-block;*/
    display: block;
    float: left;
    padding: 10px 60px;
  }

  .content-same-style p {
    margin: 0;
    font-size: 14px;
    color: #888;
    text-align: left;
    padding: 10px;
  }

  .user-document{
    width: calc(100% - 120px);
    height: 180px;
    padding: 20px 60px;
  }

  .user-document h1{
    text-align: left;
  }

  .download-inline{
    display: inline-block;
    width: 31.5%;
    height: 180px;
  }

  .download-left{
    text-align: left;
  }

  .download-center{
    text-align: center;
  }

  .download-right{
    text-align: center;
    width: 34%;
  }

  .download-btn{
    display: block;
    float: left;
    height: 70px;
    margin-top: 30px;
    cursor: pointer;
  }

  .download-title{
    width: 60%;
    background: #0691FA;
    color: white;
    min-width: 160px;
  }

  .download-icon{
    width: 20%;
    background: #2E9400;
    color: white;
    text-align: center;
    line-height: 70px;
    font-size: 25px;
  }

  .download-btn p{
    margin: 0;
  }

  .large-title{
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 20px;
  }

  .have-two-line{
    height: 40px;
    line-height: 40px;
  }

  .user-document h1{
    margin-bottom: 40px;
  }

  .my-dynamic-content{
    width: 100%;
    height: 80px;
    border-top: solid 1px #CCCCCC;
  }

  .is-not-pass{
    color: red;
  }

  .inline-document{
    display: block;
    float: left;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 160px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }

  .avatar {
    width: 160px;
    height: 160px;
    display: block;
    border-radius: 50%;
  }

  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
    background: #2E9400;
    border: solid 1px #2E9400;
    opacity: 0.8;
  }

  .has-gutter{
    display: none;
  }
</style>

<style>
  .el-table thead{
    display: none;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
  }
</style>
