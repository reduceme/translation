<template>
  <div id="app">
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  min-width: 1265px;
}

#app {
  font-family: 黑体;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  height: 100%;
}

li {
  list-style: none;
}

h1{
  padding: 0;
  margin: 0;
}
</style>
