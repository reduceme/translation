import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login'
import contestant from './modules/contestant'
import detail from './modules/detail'
import newsManage from './modules/newsManage'
import message from './modules/message'
import ueditor from './modules/ueditor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    contestant,
    detail,
    newsManage,
    message,
    ueditor
  }
})
