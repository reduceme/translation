<template>
  <div class="notice-content">
    <p class="notice-title">注册须知</p>
    <router-link class="little-title" :to="{path: 'registeredChild'}">
      <i class="el-icon-error" style="color: #818181"></i>
    </router-link>
    <p class="notice-context">1.各单位推荐选拔的优秀选手需在 2019年 3 月 28 日前在本次大赛官网（http://www.hkjyyds. com. cn）上完成免费注册（注册验证码 NECOS）。选手注册时应在线提交单位推荐函扫描件，并在参加复赛前 15 日在线提交复赛备赛正式演讲稿中英文对照电子版，以及向大赛组委会办公室函寄单位出具的复赛演讲稿不涉密审查证明和推荐函原件。未完成上述资料提交的选手视为无效注册，不能进入复赛。</p>
    <p class="notice-context">2.进入决赛的选手应在决赛前 10 日在线提交决赛备赛正式演讲稿中英文对照电子版，并向大赛组委会办公室函寄单位出具的决赛演讲稿不涉密审查证明。</p>
    <p class="notice-context">3.比赛结束后，将由大赛组委会组织出版《科普中国，绿色核能——首届全国核行业科技英语演讲大赛演讲稿中英文文集（暂名）》。参加复赛和决赛的选手向大赛组委会办公室函寄书面版权转让授权书，即可委托大赛组委会将其演讲稿收入演讲文集，未出具该授权书的演讲稿不收入该文集。</p>
  </div>
</template>

<script>
export default{
  name: 'notice-component'
}
</script>

<style scoped>
  .notice-content{
    padding: 50px 70px;
    /*height: 285px;*/
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
