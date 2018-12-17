<template>
  <div class="container">
    <div class="news-content" v-html="html">{{html}}</div>
  </div>
</template>

<script>
export default{
  name: 'review',
  data () {
    return {
      html: ''
    }
  },
  mounted () {
    let newsMsg = sessionStorage.getItem('row')
    newsMsg = JSON.parse(newsMsg)
    this.html = newsMsg.content
  }
}
</script>

<style scoped>
  .container {
    min-height: 800px;
    width: calc(70% - 160px);
    margin: 0 15%;
    background: white;
    padding: 50px 80px;
  }

  .news-content {
    width: 100%;
    /*padding: 50px 100px;*/
  }
</style>
