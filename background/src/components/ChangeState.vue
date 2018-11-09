<template>
  <div>
    <el-dialog
      title="状态修改"
      :visible.sync="isModalShow"
      :before-close="closeModal"
      width="30%">
      <div class="demo-input-suffix">
        状态：
        <el-select v-model="statusChange">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="closeModal">取 消</el-button>
        <el-button type="primary" @click.native="updateState">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: [{
        value: true,
        name: '通过'
      }, {
        value: false,
        name: '不通过'
      }]
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('updateModalAndId', {
        isModalShow: false,
        id: ''
      })
    },
    updateState () {
      this.$store.dispatch('changeUserState')
    }
  },
  computed: {
    isModalShow: {
      get () {
        return this.$store.state.contestant.isModalShow
      }
    },
    statusChange: {
      get () {
        return this.$store.state.contestant.isAllow.isRegister
      },
      set (val) {
        return this.$store.commit('updateAllow', val)
      }
    }
  }
}
</script>

<style scoped>
.demo-input-suffix {
  text-align: left;
  margin-left: 50px;
}

.demo-input-suffix .el-select {
  width: 80%;
}

.el-dialog__headerbtn .el-dialog__close {
  color: white !important;
}
</style>
