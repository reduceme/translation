import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'

const state = {
  getNewsData: {
    pageSize: 10,
    pageNum: 1,
    display: true
  },
  newsList: []
}

const mutations = {}

const actions = {
  getNewsList () {
    Axios.post('findAllNews', QS.stringify(state.getNewsData)).then(response => {
      if (response.data.success) {
        response.data.data.list.forEach(function (item) {
          item.cover = 'data:image/png;base64,' + item.cover
          state.newsList.push(item)
        })

        /*let result = []
        let obj = {}
        for (let i = 0; i < state.newsList.length; i++) {
          if (!obj[state.newsList[i].key]) {
            result.push(state.newsList[i])
            obj[state.newsList[i].key] = true
          }
        }
        state.newsList = result*/
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
