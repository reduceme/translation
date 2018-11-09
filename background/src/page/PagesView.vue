<template>
  <div class="pages-view">
    <aside-bar></aside-bar>
  </div>
</template>

<script>
import AsideBar from '../components/AsideBar'

export default {
  name: 'pages-view',
  components: { AsideBar },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
  .pages-view{
    height: 100%;
  }
</style>
