<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  height: 100%;
  min-width: 1024px;
  min-height: 800px;
}

body {
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.el-dialog__header {
  background: #409EFF;
}

.el-dialog__title{
  color: white;
}
</style>
