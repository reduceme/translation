<template>
  <div class="container">
    <div class="top-info">
      <span class="top-art-info">欢迎进入“科普中国，绿色核能——首届全国科技英语演讲大赛”注册系统！</span>
    </div>
    <div class="top-menu">
      <div class="img-content">
        <img src="../images/logo.png" height="90" width="90"/>
      </div>
      <div class="menu-content">
        <ul>
          <li v-for="item in menuList"
              :key="item.key"
              v-show="item.isShow"
              class="menu-list"
              :class="$route.path==item.url?'is-active':''">
            <router-link :to="{path: item.url}">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="login-or-logout">
        <div class="login-icon">
          <img :src="logInfo.imgUrl" height="13" width="13"/>
          <span>
            <router-link @click.native="logout(logInfo.context)" :to="{path: logInfo.url}">{{logInfo.context}}</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '../store/moudles/topBar'
export default {
  name: 'top-bar',
  computed: {
    menuList: {
      get () {
        return this.$store.state.TopBar.menuList
      }
    },
    logInfo: {
      get () {
        return this.$store.state.TopBar.logInfo
      }
    }
  },
  methods: {
    logout (loginInfo) {
      if (loginInfo === '退出') {
        this.$store.dispatch('logout')
      }
    }
  },
  mounted () {
    let userId = sessionStorage.getItem('userId')
    if (userId) {
      topBar.state.menuList[5].isShow = false
      topBar.state.menuList[6].isShow = true
      topBar.state.logInfo = topBar.state.logArr[1]
    }
  }
}
</script>

<style scoped>
  .container {
    height: 120px;
  }

  .el-header {
    padding: 0;
    margin: 0;
  }

  .top-info {
    width: 100%;
    height: 30px;
    background: black;
  }

  .top-art-info {
    display: block;
    width: 60%;
    height: 30px;
    line-height: 30px;
    color: #7C7D7F;
    text-align: left;
    margin-left: 15%;
  }

  .top-menu {
    width: 100%;
    height: 90px;
    background: #0691FA;
    box-shadow: 0px 8px 7px #D9DBDE;
  }

  .img-content {
    display: block;
    float: left;
    margin-left: 15%;
    width: 90px;
    height: 90px;
    /*background: white;*/
  }

  .menu-list{
    transition: border-bottom 0.3s;
    -moz-transition: border-bottom 0.3s; /* Firefox 4 */
    -webkit-transition: border-bottom 0.3s; /* Safari and Chrome */
    -o-transition: border-bottom 0.3s; /* Opera */
  }

  .menu-list:hover{
    border-bottom: 5px solid white;
  }

  .menu-content {
    width: 50%;
    display: block;
    float: left;
    height: 90px;
    line-height: 85px;
  }

  ul {
    margin: 0 0 0 20px;
    padding: 0;
    overflow: hidden;
  }

  li {
    display: inline-block;
    width: 14.2%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  .is-active {
    border-bottom: 5px solid white;
  }

  .login-or-logout {
    display: block;
    float: left;
    width: 10%;
    height: 85px;
    line-height: 85px;
    margin-left: 5%;
  }

  .login-icon {
    display: block;
    float: left;
  }
</style>
