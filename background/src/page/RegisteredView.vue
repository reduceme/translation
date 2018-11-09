<template>
  <div class="registered-content">
    <el-container>
      <el-header>
        <div class="header-title">科普中国，绿色核能——首届全国科技英语演讲大赛</div>
      </el-header>
      <el-main>
        <div class="registered-input-content">
          <div class="registered-title">
            <span>欢迎注册</span>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script></script>

<style scoped>
.registered-content {
  color: #fff;
  width: 100%;
  height: 100%;
  position: relative;
}

.el-container {
  height: 100%;
}

.el-header {
  background: #0BE897;
  height: 85px !important;
}

.header-title{
  width: calc(100% - 50px);
  height: 85px;
  line-height: 85px;
  padding-left: 50px;
  text-align: left;
  font-size: 30px;
  font-weight: 700;
}

.registered-input-content{
  border: solid 1px #D7D6D7;
  box-shadow: darkgrey 0px 0px 10px 0px;
  top: 50%;
  left: 50%;
  position: absolute;
  width: 800px;
  height: 600px;
  transform: translate(-50%, -50%);
  background: white;
}

.registered-title{
  height: 150px;
}
</style>
