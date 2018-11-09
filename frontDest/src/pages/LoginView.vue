<template>
  <div class="out-content">
    <div class="title-content">
      <h1>欢迎进入</h1>
      <p>“科普中国，绿色核能——首届全国科技英语演讲大赛”注册系统</p>
    </div>
    <div class="login-content">
      <div class="login-inline login-content-left"></div>
      <div class="login-inline login-content-right">
        <router-view></router-view>
      </div>
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'login-view'
}
</script>

<style scoped>
  .out-content {
    position: relative;
    width: 100%;
    height: 1000px;
    background: url("../images/7-0登录_02.jpg") no-repeat bottom center;
  }

  .login-content {
    box-shadow: darkgrey 0px 0px 10px 0px;
    top: 41%;
    left: 50%;
    position: absolute;
    width: 800px;
    height: 500px;
    transform: translate(-50%, -50%);
    background: white;
  }

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
