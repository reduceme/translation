import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'

const state = {
  getNewsData: {
    pageSize: 20,
    pageNum: 1,
    display: true
  },
  newsList: [],
  total: 0,
  showList: false
}

const mutations = {}

const actions = {
  getNewsList() {
    Axios.post('findAllNews', QS.stringify(state.getNewsData)).then(response => {
      if (response.data.success) {
        response.data.data.list.forEach(function (item) {
          item.cover = 'data:image/png;base64,' + item.cover
          state.newsList.push(item)
        })
        let obj = {}
        state.newsList = state.newsList.reduce((cur, next) => {
          obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
          return cur
        }, [])
        if (state.newsList.length === 0) {
          state.showList = true
        }
        state.getNewsData.pageNum++
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
  }
}

export default {
  state,
  mutations,
  actions
}
