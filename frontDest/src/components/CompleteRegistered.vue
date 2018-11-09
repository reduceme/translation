<template>
  <div>
    <div class="notice-info-content">
      <img src="../images/6-2注册-资料审核中_03.png" height="98" width="100"/>
      <h1 style="margin-top: 30px">账号注册完成</h1>
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;资料待审核中……</h1>
      <p>（{{time}}秒后自动登录进入个人中心）</p>
    </div>
    <div class="font-btn-content">
      <el-button class="submit-btn" type="primary">
        <router-link class="little-title" :to="{path: 'about'}">返回首页</router-link>
      </el-button>
    </div>
  </div>
</template>

<script>
import router from '../router'
import topBar from '../store/moudles/topBar'
export default{
  name: 'complete-registered-component',
  data () {
    return {
      time: 5
    }
  },
  methods: {
    returnHome () {
      let me = this
      let interval = window.setInterval(function () {
        --me.time
        if (me.time < 0) {
          me.time = 5
          router.push({
            path: '/hkjyyds/personalCenter'
          })
          window.clearInterval(interval)
        }
      }, 1000)
    }
  },
  mounted () {
    this.returnHome()
    topBar.state.menuList[5].isShow = false
    topBar.state.menuList[6].isShow = true
    topBar.state.logInfo = topBar.state.logArr[1]
  }
}
</script>

<style scoped>
  .login-content{
    height: 700px;
  }

  .registered-detail{
    height: 700px;
  }

  .notice-info-content{
    padding: 140px 0 0 0;
    width: 100%;
  }

  .notice-info-content h1{
    font-size: 18px;
    height: 28px;
    line-height: 28px;
  }

  .notice-info-content p{
    font-size: 14px;
    color: #999;
  }

  .font-btn-content{
    width: 100%;
    height: 70px;
    text-align: center;
    margin-top: 90px;
  }

  .submit-btn{
    width: 250px;
    background: #2E9400;
    border: solid 1px #2E9400;
  }

  .little-title{
    font-size: 14px;
    text-decoration: none;
    color: white;
  }
</style>
