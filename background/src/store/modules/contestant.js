import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'

const state = {
  searchInfo: {
    // 页码
    pageNum: 1,
    // 分页大小
    pageSize: 30,
    // 是否注册
    isRegister: '',
    // 姓名
    userName: ''
  },
  userList: {
    total: '',
    tableData: []
  },
  isModalShow: false,
  isAllow: {
    isRegister: true,
    id: ''
  },
  fileInfo: {
    id: '',
    type: ''
  }
}

const mutations = {
  updateUsername (state, username) {
    state.searchInfo.userName = username
  },
  updateRegister (state, isRegister) {
    state.searchInfo.isRegister = isRegister
  },
  updatePageNum (state, page) {
    state.searchInfo.pageNum = page
  },
  updatePageSize (state, pageSize) {
    state.searchInfo.pageSize = pageSize
  },
  updateModalAndId (state, flag) {
    state.isModalShow = flag.isModalShow
    state.isAllow.id = flag.id
  },
  updateAllow (state, flag) {
    state.isAllow.isRegister = flag
  }
}

const actions = {
  getList () {
    Axios.post('/userInfo', QS.stringify(state.searchInfo))
      .then(function (response) {
        let data = response.data
        if (data.success) {
          state.userList.tableData = data.data.list
          state.userList.tableData.forEach(function (item) {
            item.localRegister = (item.register === true ? '注册完成' : '注册中')
          })
          state.userList.total = data.data.total
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  changeUserState () {
    Axios.post('verify', QS.stringify(state.isAllow)).then(response => {
      let data = response.data
      if (data.success) {
        state.isModalShow = false
        actions.getList()
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
