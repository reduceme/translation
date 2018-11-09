<template>
  <div class="pages-view" ref="parent">
    <top-bar></top-bar>
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
    <font-bar></font-bar>
  </div>
</template>

<script>
import TopBar from '../components/TopBar'
import FontBar from '../components/FontBar'

export default {
  components: { FontBar, TopBar },
  name: 'pages-view',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style>
  .pages-view {
    min-height: 100%;
    position: relative;
  }
</style>
