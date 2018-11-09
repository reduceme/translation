<template>
  <div class="search-content">
    <div class="demo-input-size">
      <el-button type="primary" @click.native="isShowModal(true)">新建消息</el-button>
    </div>
    <el-dialog
      title="新建消息"
      :visible.sync="showModal"
      :close-on-click-modal="false"
      width="30%">
      <div class="inline-content" style="margin-bottom: 15px;">
        <span>选手姓名：</span>
        <el-select class="inline-select" v-model="newMsgInfo.sendTo" filterable placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.detailInfo"
            :value="item.userId">
          </el-option>
        </el-select>
      </div>
      <div class="inline-content">
        <span>消息内容：</span>
        <el-input
          class="inline-txtarea"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="newMsgInfo.messages">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowModal(false)">取 消</el-button>
        <el-button type="primary" @click="sendMsg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default{
  name: 'new-message',
  methods: {
    isShowModal (flag) {
      this.$store.commit('updateMessageModal', flag)
    },
    sendMsg () {
      this.$store.dispatch('sendMessage')
    }
  },
  computed: {
    showModal: {
      get () {
        return this.$store.state.message.messageModal
      },
      set (val) {
        this.$store.commit('updateMessageModal', val)
      }
    },
    userList: {
      get () {
        return this.$store.state.message.userList
      }
    },
    newMsgInfo: {
      get () {
        return this.$store.state.message.newMessageInfo
      }
    }
  },
  mounted () {
    this.$store.dispatch('getAllMessage')
    this.$store.dispatch('getUserList')
  }
}
</script>

<style scoped>
  .search-content {
    width: 100%;
    height: 100px;
  }

  .demo-input-size {
    display: block;
    float: left;
    width: 210px;
    margin: 30px 20px 0 0;
  }

  .inline-content{
    text-align: left;
  }

  .inline-content span{
    display: block;
    float: left;
    width: 90px;
    line-height: 40px;
  }

  .inline-txtarea, .inline-select{
    width: calc(100% - 90px);
  }
</style>
