import Axios from 'axios'
import router from '../../router'
import {Message} from 'element-ui'

const state = {
  menuList: [{
    name: '大赛简介',
    url: '/hkjyyds/about',
    key: '1',
    isShow: true
  }, {
    name: '通知文件',
    url: '/hkjyyds/document',
    key: '2',
    isShow: true
  }, {
    name: '组织机构',
    url: '/hkjyyds/mechanism',
    key: '3',
    isShow: true
  }, {
    name: '预定赛程',
    url: '/hkjyyds/schedule',
    key: '4',
    isShow: true
  }, {
    name: '大赛动态',
    url: '/hkjyyds/dynamic',
    key: '5',
    isShow: true
  }, {
    name: '选手注册',
    url: '/hkjyyds/registered/registeredChild',
    key: '6',
    isShow: true
  }, {
    name: '个人中心',
    url: '/hkjyyds/personalCenter',
    key: '7',
    isShow: false
  }],
  logInfo: {
    imgUrl: require('../../images/1大赛简介_06.png'),
    context: '登录',
    url: '/hkjyyds/login'
  },
  logArr: [{
    imgUrl: require('../../images/1大赛简介_06.png'),
    context: '登录',
    url: '/hkjyyds/login'
  }, {
    imgUrl: require('../../images/8-0个人中心_03.png'),
    context: '退出',
    url: '/hkjyyds/about'
  }]
}

const mutations = {}

const actions = {
  logout () {
    Axios.get('logout').then(response => {
      let data = response.data
      if (!data.success) {
        router.push({
          path: '/hkjyyds/login/loginComponent'
        })
        state.menuList[5].isShow = true
        state.menuList[6].isShow = false
        state.logInfo = state.logArr[0]
        Message.success({
          message: '已退出'
        })
        sessionStorage.setItem('userId', '')
      } else {
        Message.error({
          message: data.msg
        })
      }
    }).catch(response => {
      router.push({
        path: '/hkjyyds/login/loginComponent'
      })
      state.menuList[5].isShow = true
      state.menuList[6].isShow = false
      state.logInfo = state.logArr[0]
      Message.success({
        message: '已退出'
      })
      sessionStorage.setItem('userId', '')
    })
  }
}

export default {
  state,
  mutations,
  actions
}
