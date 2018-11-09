<template>
  <div>
    <add-news></add-news>
    <news-list></news-list>
  </div>
</template>

<script>
import AddNews from '../components/AddNews.vue'
import NewsList from '../components/NewsList.vue'

export default {
  name: 'news-manage',
  components: { AddNews, NewsList },
  methods: {
    getNewsList () {
      this.$store.dispatch('getNewsList')
    }
  },
  mounted () {
    this.getNewsList()
  }
}
</script>

<style scoped></style>
