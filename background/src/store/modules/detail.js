import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'

const state = {
  userId: '',
  userDetail: {}
}

const mutations = {}

const actions = {
  getUserDetail () {
    state.userDetail = {}
    Axios.post('showUserInfo', QS.stringify({
      id: state.userId
    })).then(response => {
      let data = response.data
      if (data.success) {
        state.userDetail = data.data
        state.userDetail.register = (state.userDetail.register === true ? '是' : '否')
        if (state.userDetail.photo) {
          state.userDetail.flag = true
          state.userDetail.photo = 'data:image/png;base64,' + state.userDetail.photo
        } else {
          state.userDetail.flag = false
        }
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
