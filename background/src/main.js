/*
* 单页面主入口js文件
* author：dairui
* date: 2018-10-12
* */
import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import QS from 'qs'

// 引用element-ui框架
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入UEditor
import '../static/UEditor/ueditor.config'
import '../static/UEditor/ueditor.all'
import '../static/UEditor/lang/zh-cn/zh-cn'
import '../static/UEditor/ueditor.parse.min'

// 设置
Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$qs = QS
Axios.defaults.baseURL = 'http://192.168.2.251:1111/user/'
// Axios.defaults.baseURL = 'http://192.168.3.37:1111/user/'
Axios.defaults.withCredentials = true
// Vue全局使用element-ui
Vue.use(Element)

Axios.interceptors.response.use(function (response) {
  if (!JSON.parse(response.request.response).success && !router.history.current.fullPath.includes('/login')) {
    Element.Message.warning({
      message: '请先登录'
    })
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return response
})

/* 挂载Vue实例 */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
