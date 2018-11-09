<template>
  <div class="registered-input-content">
    <div class="img-content" style="margin-bottom: 20px">
      <div class="img-parent">
        <img :src="userDetailInfo.photo" height="160" width="160" >
      </div>
    </div>
    <div class="download-content">
      <el-button type="primary" @click.native="download('rec')">下载单位推荐文件</el-button>
      <el-button type="primary" @click.native="download('speech')">下载复赛演讲稿</el-button>
      <el-button type="primary" @click.native="download('speech1')">下载决赛演讲稿</el-button>
    </div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名：">
        <el-input disabled v-model="userDetailInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="公司：">
        <el-input disabled v-model="userDetailInfo.work"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-input disabled v-model="userDetailInfo.sex"></el-input>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input disabled v-model="userDetailInfo.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input disabled v-model="userDetailInfo.emailAddress"></el-input>
      </el-form-item>
      <el-form-item label="是否注册：">
        <el-input disabled v-model="userDetailInfo.register"></el-input>
      </el-form-item>
      <el-form-item label="复赛演讲稿：">
        <el-input disabled v-model="userDetailInfo.speech"></el-input>
      </el-form-item>
      <el-form-item label="决赛演讲稿：">
        <el-input disabled v-model="userDetailInfo.speech1"></el-input>
      </el-form-item>
      <el-form-item label="推荐文件：">
        <el-input disabled v-model="userDetailInfo.recommandFile"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import utils from '../utils/index'
import {Message} from 'element-ui'

export default {
  name: 'detail-view',
  data () {
    return {}
  },
  methods: {
    download (type) {
      if (this.$router.query[type]) {
        location.href = utils.downloadFileUrl + '?type=' + type + '&id=' + this.$route.query.id
      } else {
        Message.error({
          message: '当前用户暂未上传该文件'
        })
      }
    }
  },
  computed: {
    userDetailInfo: {
      get () {
        return this.$store.state.detail.userDetail
      }
    }
  },
  mounted () {
    this.$store.state.detail.userId = this.$route.query.id
    this.$store.dispatch('getUserDetail')
  }
}
</script>

<style>
  .el-form--inline .el-form-item__content {
    width: 70%;
  }

  .el-form--inline .el-form-item__label {
    width: 90px;
  }
</style>

<style scoped>
  .download-a-btn {
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .download-content{
    text-align: left;
    padding-left: 60px;
  }

  .header-title {
    width: calc(100% - 50px);
    height: 85px;
    line-height: 85px;
    padding-left: 50px;
    text-align: left;
    font-size: 30px;
    font-weight: 700;
  }

  .registered-input-content {
    border: solid 1px #D7D6D7;
    box-shadow: darkgrey 0px 0px 10px 0px;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 760px;
    height: 575px;
    transform: translate(-50%, -50%);
    background: white;
    padding: 60px 20px 40px 20px;
  }

  .registered-title {
    height: 150px;
  }

  .el-form--inline .el-form-item {
    width: 46%;
  }

  .el-form {
    margin-top: 40px;
  }

  .img-parent {
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }

  .img-parent img{
    border-radius: 50%;
  }
  .head-img-content {
    margin-top: 40px;
    text-align: center;
  }
</style>
