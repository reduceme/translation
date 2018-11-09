import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'

const state = {
  getNewsData: {
    pageSize: 10000,
    pageNum: 1,
    display: ''
  },
  newsList: [],
  deleteModal: false,
  newsStatus: Boolean,
  newsId: ''
}

const mutations = {
  updateNewsName (state, name) {
    state.newsInfo.name = name
  },
  updateNewsSubject (state, subject) {
    state.newsInfo.subject = subject
  },
  updateDisplay (state, flag) {
    state.getNewsData.display = flag
  },
  updateDeleteModal (state, flag) {
    state.deleteModal = flag
  },
  updateNewsStatus (state, value) {
    state.newsStatus = value
  },
  updateNewsId (state, value) {
    state.newsId = value
  }
}

const actions = {
  getNewsList () {
    Axios.post('findAllNews', QS.stringify(state.getNewsData)).then(response => {
      if (response.data.success) {
        state.newsList = response.data.data.list
        state.newsList.forEach(function (item) {
          item.isValid = (item.display === false ? '无效' : '有效')
        })
      } else {
        Message.error({
          message: response.data.msg
        })
      }
    }).catch(response => {
      Message.error({
        message: '网络连接失败'
      })
    })
  },
  changeStatus () {
    let url = ''
    if (state.newsStatus === true) {
      url = 'fabuNews'
    } else {
      url = 'deleteNews'
    }
    Axios.post(url, QS.stringify({
      id: state.newsId
    })).then(response => {
      let data = response.data
      if (data.success) {
        Message.success({
          message: data.msg
        })
        actions.getNewsList()
        state.deleteModal = false
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
