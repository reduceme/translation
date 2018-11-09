import Axios from 'axios'
import QS from 'qs'
import topBar from './topBar'
import {Message} from 'element-ui'

const state = {
  userId: '',
  userInfo: {
    userName: '',
    emailAddress: '',
    phoneNumber: '',
    work: '',
    sex: '',
    register: false,
    photo: '',
    speech: '',
    speech1: '',
    recommandFile: '',
    registerMsg: ''
  },
  formData: new FormData(),
  uploadModal: false,
  userMsg: []
}

const mutations = {
  updatePersonalFormData (state, fileInfo) {
    state.formData.append(fileInfo.name, fileInfo.file.raw)
  },
  updatePersonalModal (state, isShow) {
    state.uploadModal = isShow
  },
  uploadImgUrl (state, file) {
    console.log(file)
    state.userInfo.photo = file
  }
}

const actions = {
  getUserDetail () {
    let userId = sessionStorage.getItem('userId')
    Axios.post('showUserInfo', QS.stringify({
      id: userId
    })).then(response => {
      let data = response.data
      if (data.success) {
        topBar.state.menuList[5].isShow = false
        topBar.state.menuList[6].isShow = true
        topBar.state.logInfo = topBar.state.logArr[1]
        for (let i in state.userInfo) {
          state.userInfo[i] = data.data[i]
        }
        state.userInfo.registerMsg = (data.data.register === false ? ('选手状态：待审核') : '选手状态：已审核')
        state.userInfo.photo = 'data:image/png;base64,' + state.userInfo.photo
      }
    }).catch(response => {
      console.log(response)
    })
  },
  updatePersonalFile () {
    let url = 'upload?id=' + sessionStorage.getItem('userId')
    Axios.post(url, state.formData).then(response => {
      let data = response.data
      if (data.success) {
        Message.success({
          message: '上传成功!'
        })
        state.uploadModal = false
      } else {
        Message.error({
          message: '上传失败！'
        })
      }
    }).catch(response => {
      console.log(response)
    })
  },
  getMessage () {
    Axios.post('findAllMessages', QS.stringify({
      pageNum: 1,
      pageSize: 0
    })).then(response => {
      let data = response.data
      if (data.success) {
        state.userMsg = data.data.list
        // state.userMsg[1] = state.userMsg[0]
        // state.userMsg[2] = state.userMsg[0]
        // state.userMsg[3] = state.userMsg[0]
      } else {
        Message.error({
          message: '获取消息失败'
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
