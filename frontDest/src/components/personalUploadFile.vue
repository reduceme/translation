<template>
  <el-dialog
    title="文件上传"
    :visible.sync="modalShow"
    width="40%"
    :lock-scroll="false"
    :close-on-click-modal="false">
    <el-upload
      class="upload-demo"
      action="string"
      :show-file-list="true"
      :file-list="fileList"
      :auto-upload="false"
      :limit="1"
      :multiple="false"
      :on-change="uploadFileRec"
      :on-remove="clearRec"
      :on-exceed="exceedFn">
      <el-button slot="trigger" size="small" type="primary">上传单位推荐文件扫描件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
    </el-upload>
    <el-upload
      class="upload-demo"
      action="string"
      :show-file-list="true"
      :file-list="speechList"
      :auto-upload="false"
      :on-change="uploadFileSpe"
      :limit="1"
      :multiple="false"
      :on-remove="clearSpeech"
      :on-exceed="exceedFn">
      <el-button slot="trigger" size="small" type="primary">上传复赛中英对照演讲稿</el-button>
      <div slot="tip" class="el-upload__tip">只能上传docx/doc/pdf文件</div>
    </el-upload>
    <el-upload
      class="upload-demo"
      action="string"
      :show-file-list="true"
      :file-list="speech1List"
      :auto-upload="false"
      :on-change="uploadFileSpe1"
      :limit="1"
      :multiple="false"
      :on-remove="clearSpeech1"
      :on-exceed="exceedFn">
      <el-button slot="trigger" size="small" type="primary">上传决赛中英对照演讲稿</el-button>
      <div slot="tip" class="el-upload__tip">只能上传docx/doc/pdf文件</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="uploadFile">确认上传</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: 'personal-upload-file',
  data () {
    return {
      dialogVisible: false,
      fileList: [],
      speechList: [],
      speech1List: []
    }
  },
  methods: {
    uploadFileSpe (file) {
      const isAllow = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      let flag = this.fileType(['docx', 'doc', 'pdf'], isAllow)
      if (flag) {
        this.$store.commit('updatePersonalFormData', {
          name: 'speech',
          file: file,
          key: 'formDataSpe'
        })
      } else {
        this.$store.commit('clearPersonalFormData', 'speech')
      }
    },
    uploadFileSpe1 (file) {
      const isAllow = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      let flag = this.fileType(['docx', 'doc', 'pdf'], isAllow)
      if (flag) {
        this.$store.commit('updatePersonalFormData', {
          name: 'speech1',
          file: file,
          key: 'formDataSpe1'
        })
      } else {
        this.$store.commit('clearPersonalFormData', 'speech1')
      }
    },
    uploadFileRec (file) {
      const isJPG = (file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
      let flag = this.fileType(['jpg', 'jpeg', 'png'], isJPG)
      if (flag) {
        this.$store.commit('updatePersonalFormData', {
          name: 'recommandFile',
          file: file,
          key: 'formData'
        })
      } else {
        this.$store.commit('clearPersonalFormData', 'recommandFile')
      }
    },
    exceedFn () {
      Message.error({
        message: '只能选择一个文件'
      })
    },
    uploadFile () {
      this.$store.dispatch('updatePersonalFile')
    },
    fileType (typeList, filetype) {
      let isAllow = false
      for (let i = 0; i < typeList.length; i++) {
        if (typeList[i] === filetype) {
          isAllow = true
        }
      }
      if (!isAllow) {
        Message.error({
          message: '上传文件格式不正确'
        })
      }
      return isAllow
    },
    clearRec () {
      this.$store.commit('clearPersonalFormData', 'recommandFile')
    },
    clearSpeech () {
      this.$store.commit('clearPersonalFormData', 'speech')
    },
    clearSpeech1 () {
      this.$store.commit('clearPersonalFormData', 'speech1')
    }
  },
  computed: {
    modalShow: {
      get () {
        return this.$store.state.Personal.uploadModal
      },
      set () {
        this.$store.commit('updatePersonalModal', false)
      }
    }
  }
}
</script>

<style scoped>
  .el-upload__tip{
    display: inline-block;
    margin-left: 10px;
  }
</style>

<style>
  .upload-demo{
    margin-bottom: 20px;
    text-align: left;
  }
</style>
