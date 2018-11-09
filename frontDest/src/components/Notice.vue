<template>
  <div class="notice-content">
    <p class="notice-title">注册须知</p>
    <router-link class="little-title" :to="{path: 'registeredChild'}">
      <i class="el-icon-error" style="color: #818181"></i>
    </router-link>
    <p class="notice-context">各单位推荐选拔的优秀选手需在2019年2月28日前在本次大赛注册系统官网（http://www.hkjyyds.com.cn）上完成免费注册。选手注册时应在线提交单位推荐函扫描件，并在参加复赛前15日内在线提交所准备的复赛、决赛备赛正式演讲稿中英文对照电子版，以及向大赛组委会办公室函寄单位出具的保密审查证明和推荐函原件。<span style="color: red">未完成上述资料提交的选手视为无效注册，不能进入复赛。</span></p>
    <p class="notice-context">各位选手请勿重复注册，以免影响比赛结果的统计</p>
  </div>
</template>

<script>
export default{
  name: 'notice-component'
}
</script>

<style scoped>
  .notice-content{
    padding: 50px 100px;
    height: 285px;
  }
  .notice-title{
    font-size: 18px;
    display: inline-block;
    width: 93%;
    font-weight: 700;
  }
  .notice-context{
    font-size: 14px;
    color: #666;
    line-height: 28px;
    letter-spacing: 3px;
    text-align:justify;
  }
</style>
