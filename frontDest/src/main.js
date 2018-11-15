import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

// 引用element-ui框架
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 设置
Vue.config.productionTip = false
Vue.prototype.http = Axios
// Axios.defaults.baseURL = ''
Axios.defaults.baseURL = 'http://115.29.106.226:1111/user/'
// Axios.defaults.baseURL = 'http://192.168.3.37:1111/user/'
Axios.defaults.withCredentials = true

// Vue全局使用element-ui
Vue.use(Element)

Axios.interceptors.response.use(function (response) {
  if (!JSON.parse(response.request.response).success && !router.history.current.fullPath.includes('/login') && !router.history.current.fullPath.includes('/registered')) {
    Element.Message.warning({
      message: '请先登录'
    })
    store.TopBar.menuList[5].isShow = false
    store.TopBar.menuList[6].isShow = true
    store.TopBar.logInfo = store.TopBar.logArr[1]
    router.replace({
      path: '/hkjyyds/login/loginComponent'
    })
    sessionStorage.setItem('userId', '')
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
})
