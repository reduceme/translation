import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'

const state = {
  newsFormData: new FormData(),
  newsInfo: {
    // 新闻内容
    content: '',
    // 标题
    subject: '',
    brief: '',
    id: '',
    cover: ''
  },
  base64: 'data:image/png;base64,',
  releaseNewsUrl: 'releaseNews'
}

const mutations = {
  updateFormData (state, file) {
    state.newsFormData.set('cover', file.raw)
  },
  updateContent (state, content) {
    state.newsInfo.content = content
  },
  isRewrite (state, context) {
    state.releaseNewsUrl = 'editNews'
    for (let i in state.newsInfo) {
      state.newsInfo[i] = context[i]
    }
    state.newsInfo.cover = state.base64 + state.newsInfo.cover
  },
  clearRewriteInfo (state, context) {
    for (let i in state.newsInfo) {
      state.newsInfo[i] = ''
    }
  }
}

const actions = {
  releseNews () {
    state.newsFormData.set('content', state.newsInfo.content)
    state.newsFormData.set('subject', state.newsInfo.subject)
    state.newsFormData.set('brief', state.newsInfo.brief)
    Axios.post('releaseNews', state.newsFormData).then(response => {
      let data = response.data
      if (data.success) {
        Message.success({
          message: data.msg
        })
      } else {
        Message.success({
          message: data.msg
        })
      }
    }).catch(response => {
      Message.error({
        message: '网络连接失败'
      })
    })
  },
  rewrite () {
    state.newsFormData.set('content', state.newsInfo.content)
    state.newsFormData.set('subject', state.newsInfo.subject)
    state.newsFormData.set('brief', state.newsInfo.brief)
    state.newsFormData.set('id', state.newsInfo.id)
    Axios.post('editNews', state.newsFormData).then(response => {
      let data = response.data
      if (data.success) {
        Message.success({
          message: data.msg
        })
      } else {
        Message.success({
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
