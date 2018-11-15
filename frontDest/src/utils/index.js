import Axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'

const downloadFileUrl = 'http://115.29.106.226:1111/user/download'
const uploadFileUrl = 'http://115.29.106.226:1111/user/upload'
const codeImg = 'http://115.29.106.226:1111/user/getCode'

/*const downloadFileUrl = 'http://192.168.3.37:1111/user/download'
const uploadFileUrl = 'http://192.168.3.37:1111/user/upload'
const codeImg = 'http://192.168.3.37:1111/user/getCode'*/

/* const axiosGet = function (url, msg, callback) {
 Axios.get(url).then(response => {
 let data = response.data
 if (data.success) {
 callback()
 } else {
 Message.error({
 message: msg
 })
 }
 }).catch(response => {
 Message.error({
 message: msg
 })
 })
 } */

const deWeight = function () {
  var res = []
  var json = {}
  for (var i = 0; i < this.length; i++) {
    if (!json[this[i]]) {
      res.push(this[i])
      json[this[i]] = 1
    }
  }
  return res
}

export default {
  downloadFileUrl,
  uploadFileUrl,
  codeImg,
  deWeight
}
