<template>
  <div class="about-content">
    <div class="content-info">
      <span class="big-mark">“</span>
      <span class="big-word">科普中国，绿色核能</span>
      <span class="big-mark">”</span>
    </div>
    <div class="content-left little-title">
      <span>——首届全国科技英语演讲大赛</span>
    </div>
    <div class="content-left content-main">
      <p>“科普中国，绿色核能——首届全国科技英语演讲大赛”是中国科协、国家能源局、国家原子能机构、国家核安全局举办的“科普中国——绿色核能主题科普活动”之一，其目的是宣传、普及核能知识，为促进核能安全发展及和平利用营造良好社会氛围。同时为我国核能行业广大青年科技人员提供一个科技英语交流的平台，营造学习和应用科技英语的积极氛围，提高科技人员的英语口语水平和交流能力，发现和储备精通科技英语的优秀青年科技人才，从而为对外开展核科技交流与合作，为中国核电走向“一带一路”国际合作贡献力量。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about-competition',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .about-content{
    width: 70%;
    padding: 0 15%;
    height: 970px;
    background-image: url("../images/1大赛简介_05.jpg");
  }

  .content-info{
    padding-top: 150px;
    text-align: left;
    color: white;
  }

  .big-mark{
    font-size: 50px;
  }

  .big-word{
    font-size: 30px;
  }

  .content-left{
    text-align: left;
  }

  .little-title{
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: white;
    margin-left: 250px;
  }

  .content-main{
    margin-top: 50px;
  }
  .content-main p{
    font-size: 18px;
    color: white;
    line-height: 35px;
  }
</style>
