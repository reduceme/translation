import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'
import router from '../../router'

const state = {
  emailAddress: '',
  password: '',
  code: ''
}

const mutations = {
  updateEmailAddress (state, emailAddress) {
    state.emailAddress = emailAddress
  },
  updatePassword (state, password) {
    state.password = password
  },
  updateCode (state, code) {
    state.code = code
  }
}

const actions = {
  login () {
    Axios.post('login', QS.stringify(state))
      .then(response => {
        let data = response.data
        if (data.success) {
          router.push({
            path: '/hkjyyds/'
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

export default {
  state,
  mutations,
  actions
}
