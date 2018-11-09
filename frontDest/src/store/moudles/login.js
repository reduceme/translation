import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'
import router from '../../router'
import topBar from './topBar'
import personal from './personal'
import utils from '../../utils/index'
import crypto from 'crypto'
// const hash = crypto.createHash('md5')

const state = {
  userInfo: {
    emailAddress: '',
    password: '',
    code: ''
  },
  forgetPwd: {
    emailAddress: '',
    newPassword: '',
    confirmPwd: '',
    code: ''
  },
  imgUrl: utils.codeImg,
  forgetImgUrl: utils.codeImg
}

function RndNum (n) {
  var rnd = ''
  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10)
  }
  return rnd
}

const mutations = {
  updateEmailAddress (state, emailAddress) {
    state.userInfo.emailAddress = emailAddress
  },
  updatePassword (state, password) {
    state.userInfo.password = password
  },
  updateCode (state, code) {
    state.userInfo.code = code
  },
  updatePwdEmailAddress (state, emailAddress) {
    state.forgetPwd.emailAddress = emailAddress
  },
  updatePwd (state, newPassword) {
    state.forgetPwd.newPassword = newPassword
  },
  updatePwdConfirm (state, confirmPwd) {
    state.forgetPwd.confirmPwd = confirmPwd
  },
  updatePwdCode (state, code) {
    state.forgetPwd.code = code
  },
  updateImgUrl (state, imgInfo) {
    state[imgInfo.key] = utils.codeImg + '?code=' + RndNum(5)
  }
}

const actions = {
  login () {
    Axios.post('formalLogin', QS.stringify({
      emailAddress: state.userInfo.emailAddress,
      password: crypto.createHash('md5').update(state.userInfo.password, 'utf-8').digest('hex'),
      code: state.userInfo.code
    })).then(response => {
      let data = response.data
      if (data.success) {
        router.push({
          path: '/hkjyyds/personalCenter'
        })
        topBar.state.menuList[5].isShow = false
        topBar.state.menuList[6].isShow = true
        topBar.state.logInfo = topBar.state.logArr[1]
        personal.state.userId = data.userId
        sessionStorage.setItem('userId', data.userId)
        for (let i in state.userInfo) {
          state.userInfo[i] = ''
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
    state.imgUrl = utils.codeImg + '?code=' + RndNum(5)
  },
  resetPwd () {
    Axios.post('forgotPassword', QS.stringify({
      emailCode: state.forgetPwd.code,
      newPassword: crypto.createHash('md5').update(state.forgetPwd.newPassword, 'utf-8').digest('hex'),
      emailAddress: state.forgetPwd.emailAddress
    })).then(response => {
      let data = response.data
      if (data.success) {
        Message.success({
          message: '密码重置成功，即将自动前往登录界面'
        })
        let time = 3
        let interval = window.setInterval(function () {
          --time
          if (time < 0) {
            router.push({
              path: '/hkjyyds/login/loginComponent'
            })
            for (let i in state.forgetPwd) {
              state.forgetPwd[i] = ''
            }
            window.clearInterval(interval)
          }
        }, 1000)
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
