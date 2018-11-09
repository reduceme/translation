<template>
  <div class="bar">
    <el-container>
      <el-header>
        <div class="header-title">“科普中国，绿色核能”</div>
        <div class="header-icon" @click="logout" style="margin-right: 50px">
          <i style="color: white" class="el-icon-back"></i>
          <span class="header-operating">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['0']" router :default-active="$route.path">
            <el-submenu style="color: white" :key="item.key" :index="''+index" v-for="(item, index) in menuList">
              <template slot="title">{{item.title}}</template>
              <el-menu-item :key="subItem.key" :index="subItem.path"
                            v-for="subItem in secondMenuList[item.attribute]"
                            :class="$route.path==subItem.path?'is-active':''">{{subItem.title}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Axios from 'axios'
import {Message} from 'element-ui'
export default {
  name: 'aside-bar',
  data () {
    return {
      menuList: [{
        title: '选手管理',
        attribute: 'menberStatistic',
        key: 'menberStatistic'
      }],
      secondMenuList: {
        menberStatistic: [{
          title: '选手统计',
          path: '/hkjyyds/contestant',
          key: 'statistic'
        }, {
          title: '新闻列表',
          path: '/hkjyyds/newsManage',
          key: 'news'
        }, {
          title: '消息列表',
          path: '/hkjyyds/messageList',
          key: 'message'
        }]
      }
    }
  },
  methods: {
    logout () {
      Axios.get('logout').then(response => {
        let data = response.data
        if (data.success) {
          this.$router.push({
            path: '/login/'
          })
        } else {
          Message.error({
            message: data.msg
          })
        }
      }).catch(response => {
        Message.error({
          message: '网络连接失败'
        })
      })
    }
  }
}
</script>

<style>
  .el-main{
    position: relative;
  }

  .bar {
    height: 100%;
  }

  .el-container {
    height: 100%;
  }

  .el-header {
    background: #409EFF;
    height: 85px !important;
  }

  .header-title {
    color: #FFFFFF;
    float: left;
    height: 85px;
    padding-left: 50px;
    line-height: 85px;
    font-size: 25px;
  }

  .header-icon {
    float: right;
    height: 85px;
    line-height: 85px;
    display: block;
    margin-left: 80px;
    cursor: pointer;
  }

  .header-image {
    width: 25px;
    height: 25px;
    vertical-align: middle
  }

  .header-operating {
    color: white;
    font-size: 14px;
  }

  .el-submenu__title {
    background: #409EFF !important;
    margin-top: 1px;
    color: white;
    font-size: 16px;
    width: 200px;
    height: 50px;
    line-height: 50px;
  }

  .el-submenu__title i {
    color: white;
    font-size: 16px;
  }

  .el-menu {
    height: 100%;
  }

  .el-menu-item {
    margin-top: 1px;
  }

  .el-menu-item.is-active {
    background: #E5E5E5;
    color: black;
  }
</style>
