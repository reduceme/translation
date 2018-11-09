<template>
  <div class="container">
    <!--<button size="primary" type="info" icon="plus" @click="getContent">获取内容</button>-->
    <div class="title">
      <span>选择封面图：</span>
    </div>
    <el-upload
      class="avatar-uploader"
      action="string"
      :show-file-list="false"
      :on-change="uploadImg"
      :auto-upload="false">
      <img v-if="newsInfo.cover" :src="newsInfo.cover" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div style="clear:both;"></div>
    <div class="title">
      <span>新闻标题：</span>
    </div>
    <el-input
      style="margin-bottom: 20px"
      type="textarea"
      :autosize="{ minRows: 1, maxRows: 2}"
      placeholder="请输入新闻标题"
      v-model="newsInfo.subject">
    </el-input>
    <div class="title">
      <span>请输入内容摘要：</span>
    </div>
    <el-input
      style="margin-bottom: 20px"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容摘要"
      v-model="newsInfo.brief">
    </el-input>
    <div class="title">
      <span>新闻内容：</span>
    </div>
    <UEditor ref="ueditor"></UEditor>
  </div>
</template>

<script>
import UEditor from './UEditor.vue'

export default{
  name: 'hello',
  components: {UEditor},
  data () {
    return {
      addFormVisible: false
    }
  },
  methods: {
    // 获取文档内容
    getContent: function () {
      let content = this.$refs.ueditor.getUEContent()
      alert(content)
    },
    uploadImg (file) {
      this.newsInfo.cover = URL.createObjectURL(file.raw)
      this.$store.commit('updateFormData', file)
    }
  },
  computed: {
    newsInfo: {
      get () {
        return this.$store.state.ueditor.newsInfo
      }
    }
  },
  mounted () {
    let isRewrite = this.$route.query
    if ('isRewrite' in isRewrite) {
      let sessionInfo = JSON.parse(sessionStorage.getItem('rewrite'))
      this.$store.commit('isRewrite', sessionInfo)
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: left;
    margin: 20px 0;
  }

  .avatar-uploader {
    text-align: left;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
  }
</style>
