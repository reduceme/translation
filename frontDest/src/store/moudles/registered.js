import Axios from 'axios'
import {Message} from 'element-ui'
import router from '../../router'
import Personal from './personal'
import crypto from 'crypto'

const state = {
  userInfo: {
    emailAddress: '',
    password: '',
    confirmPassword: '',
    userName: '',
    phoneNumber: '',
    work: '',
    code: '',
    sex: '',
    inputCode: 'NECOS'
  },
  formData: new FormData(),
  uploadModal: false,
  registerBtn: {
    msg: '立即注册',
    isDisabled: false
  }
}

const mutations = {
  updateUserInfo (state, obj) {
    state.userInfo.emailAddress = obj.emailAddress
    state.userInfo.password = obj.password
    state.userInfo.confirmPassword = obj.confirmPassword
    state.userInfo.userName = obj.userName
    state.userInfo.phoneNumber = obj.phoneNumber
    state.userInfo.work = obj.work
    state.userInfo.code = obj.code
    state.userInfo.sex = obj.sex
  },
  updateFileModal (state, isShow) {
    state.uploadModal = isShow
  },
  updateFormData (state, fileInfo) {
    state.formData.append(fileInfo.name, fileInfo.file.raw)
  }
}

const actions = {
  registeredFn () {
    state.registerBtn.msg = '注册中……'
    state.registerBtn.isDisabled = true
    state.formData.set('emailAddress', state.userInfo.emailAddress)
    state.formData.set('password', crypto.createHash('md5').update(state.userInfo.password, 'utf-8').digest('hex'))
    state.formData.set('userName', state.userInfo.userName)
    state.formData.set('phoneNumber', state.userInfo.phoneNumber)
    state.formData.set('work', state.userInfo.work)
    state.formData.set('code', state.userInfo.code)
    state.formData.set('sex', state.userInfo.sex)
    let recommandFile = state.formData.get('recommandFile')
    if (!recommandFile) {
      Message.error({
        message: '请上传单位推荐文件扫描件'
      })
      return
    }
    Axios.post('register', state.formData).then(response => {
      let data = response.data
      if (data.success) {
        state.registerBtn.msg = '立即注册'
        state.registerBtn.isDisabled = false
        router.push({
          path: '/hkjyyds/registered/completeRegistered'
        })
        for (let i in state.userInfo) {
          state.userInfo[i] = ''
        }
        state.userInfo.inputCode = 'NECOS'
        Personal.state.userId = data.userId
        sessionStorage.setItem('userId', data.userId)
      } else {
        Message.error({
          message: data.msg
        })
        state.registerBtn.msg = '立即注册'
        state.registerBtn.isDisabled = false
      }
    }).catch(response => {
      Message.error({
        message: '网络连接失败'
      })
      state.registerBtn.msg = '立即注册'
      state.registerBtn.isDisabled = false
    })
  }
}

export default {
  state,
  mutations,
  actions
}
