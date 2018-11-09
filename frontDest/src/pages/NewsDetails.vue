<template>
  <div class="container" v-html="content">{{content}}</div>
</template>

<script>
export default{
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
  }
}
</script>

<style scoped>
  .container{
    min-height: 800px;
  }
</style>
