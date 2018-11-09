import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'

const state = {
  tableData: [],
  total: 0,
  pageInfo: {
    pageNum: 1,
    pageSize: 20
  },
  newMessageInfo: {
    sendTo: '',
    messages: ''
  },
  messageModal: false,
  userList: []
}

const mutations = {
  updateMessagePageInfo (state, pageInfo) {
    state.pageInfo[pageInfo.key] = pageInfo.value
  },
  updateNewMessageInfo (state, messageInfo) {
    state.newMessageInfo.sendTo = messageInfo.sendTo
    state.newMessageInfo.messages = messageInfo.messages
  },
  updateMessageModal (state, flag) {
    state.messageModal = flag
  }
}

const actions = {
  getAllMessage () {
    Axios.post('findAllMessages', QS.stringify(state.pageInfo)).then(response => {
      let data = response.data
      if (data.success) {
        state.total = data.data.total
        state.tableData = data.data.list
        state.tableData.forEach(function (item) {
          item.hasReadMsg = (item.hasRead === false ? '未读' : '已读')
        })
      }
    }).catch(response => {
      Message.error({
        message: '网络连接失败'
      })
    })
  },
  getUserList () {
    Axios.post('userInfo', QS.stringify({
      pageNum: 1,
      pageSize: 0
    })).then(response => {
      let data = response.data
      if (data.success) {
        state.userList = data.data.list
        state.userList.forEach(function (item) {
          item.detailInfo = item.userName + '-' + (item.work || '')
        })
      } else {
        Message.error({
          message: '获取用户列表失败'
        })
      }
    }).catch(response => {
      Message.error({
        message: '网络连接失败'
      })
    })
  },
  sendMessage () {
    Axios.post('sendMessage', QS.stringify({
      id: state.newMessageInfo.sendTo,
      message: state.newMessageInfo.messages
    })).then(response => {
      let data = response.data
      if (data.success) {
        Message.success({
          message: '发送消息成功'
        })
        state.messageModal = false
        actions.getAllMessage()
      } else {
        Message.error({
          message: '网络连接失败'
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
