<template>
  <div class="container">
    <div class="content" v-bind:key="item.id" v-for="item in newsList">
      <div class="inline-content inline-left">
        <img :src="item.cover" height="100%" width="100%"/>
      </div>
      <div class="inline-content inline-right">
        <p class="title">
          <router-link class="has-account" :to="{path: 'newsDetails', query: {id: item.id}}">
            {{item.subject}}
          </router-link>
        </p>
        <p class="context">{{item.brief}}</p>
        <p class="time">{{item.date}}</p>
      </div>
    </div>
    <div class="has-no-news" v-if="showList">
      <h1>大赛动态待发布……</h1>
    </div>
  </div>
</template>

<script>
export default{
  name: 'dynamic-view',
  data () {
    return {
      scloll: false
    }
  },
  computed: {
    newsList: {
      get () {
        return this.$store.state.Dynamic.newsList
      }
    },
    showList: {
      get () {
        return this.$store.state.Dynamic.showList
      }
    }
  },
  methods: {
    handleScroll () {
      // scrollTop为滚动条在Y轴上的滚动距离。
      // clientHeight为内容可视区域的高度。
      // scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
      let scrollTop = document.documentElement.scrollTop
      let offsetHeight = document.documentElement.offsetHeight
      let scrollHeight = document.documentElement.scrollHeight
      if (scrollTop + offsetHeight >= scrollHeight) {
        this.loadmore()
      } else {
        this.scloll = false
      }
    },
    loadmore () {
      setTimeout(() => {
        this.$store.dispatch('getNewsList')
      }, 0.5)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    this.$store.dispatch('getNewsList')
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style scoped>
  .container {
    width: calc(70% - 160px);
    margin: 0 15%;
    min-height: 700px;
    background: white;
    padding: 50px 80px;
  }

  .content {
    height: 140px;
    padding: 30px;
    border-bottom: solid 1px #CCCCCC;
  }

  .inline-content {
    display: block;
    float: left;
    height: 140px;
  }

  .inline-left {
    width: 25%;
  }

  .inline-right {
    width: 73%;
    margin-left: 2%;
  }

  .inline-right p {
    margin: 0;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 15px !important;
    cursor: pointer;
  }

  .context {
    font-size: 14px;
    line-height: 28px;
    text-align: justify;
    height: 84px;
    overflow: hidden;
    margin-bottom: 15px !important;
  }

  .time {
    text-align: right;
  }

  .has-no-news {
    line-height: 500px;
  }
</style>

<style>
  .has-account {
    color: black;
    text-decoration: none;
  }
</style>
