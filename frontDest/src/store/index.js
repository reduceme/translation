import Vue from 'vue'
import Vuex from 'vuex'

import TopBar from './moudles/topBar'
import Login from './moudles/login'
import Registered from './moudles/registered'
import Personal from './moudles/personal'
import Dynamic from './moudles/dynamic'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    TopBar,
    Login,
    Registered,
    Personal,
    Dynamic
  }
})
