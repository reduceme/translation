<template>
  <div class="container" v-html="html">
    {{html}}
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

<style scoped></style>
