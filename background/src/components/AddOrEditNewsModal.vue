<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isModalShow"
      width="80%">
      <u-editor></u-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="modalShow(false)">取 消</el-button>
        <el-button type="primary" @click.native="addNews">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UEditor from './UEditor'
export default {
  components: {UEditor},
  name: 'add-or-edit-news-modal',
  data () {
    return {
      newsTitle: false,
      newsContext: false
    }
  },
  methods: {
    addNews () {
      if (this.newsName === '') {
        this.newsTitle = true
        return
      }
      if (this.newsSubject === '') {
        this.newsContext = true
        return
      }
      this.$store.dispatch('addNews')
    },
    modalShow (flag) {
      this.closePopover()
      return this.$store.commit('updateNewsModalShow', flag)
    },
    closePopover () {
      this.newsTitle = false
      this.newsContext = false
    }
  },
  computed: {
    newsName: {
      get () {
        return this.$store.state.newsManage.newsInfo.name
      },
      set (val) {
        return this.$store.commit('updateNewsName', val)
      }
    },
    newsSubject: {
      get () {
        return this.$store.state.newsManage.newsInfo.subject
      },
      set (val) {
        return this.$store.commit('updateNewsSubject', val)
      }
    },
    isModalShow: {
      get () {
        return this.$store.state.newsManage.modalInfo.isModalShow
      },
      set () {
        this.modalShow(false)
      }
    },
    title: {
      get () {
        return this.$store.state.newsManage.modalInfo.title
      }
    }
  }
}
</script>

<style scoped>
  .title{
    width: 100px;
    display: block;
    float: left;
    height: 40px;
    line-height: 40px;
  }

  .el-input{
    width: 80%;
  }
</style>
