<template>
  <div class="container">
    <div class="news-content" v-html="content">{{content}}</div>
  </div>
</template>

<script>
export default {
  name: 'news-details',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getContent () {
      let newsId = this.$route.query.id
      for (let i = 0; i < this.newsList.length; i++) {
        if (parseInt(newsId) === parseInt(this.newsList[i].id)) {
          this.content = this.newsList[i].content
          return
        }
      }
    }
  },
  computed: {
    newsList: {
      get () {
        return this.$store.state.Dynamic.newsList
      }
    }
  },
  mounted () {
    this.getContent()
  },
  destroyed () {}
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
