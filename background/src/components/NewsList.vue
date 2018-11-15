<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="date"
        label="添加时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="subject"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="brief"
        label="简介">
      </el-table-column>
      <el-table-column
        prop="isValid"
        label="是否有效"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click.native="review(scope.row)">
            预览
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click.native="rewriteNews(scope.row)">
            修改
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click.native="statusModal(true, scope.row)">
            状态设置
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="状态设置"
      :visible.sync="deleteModal"
      width="20%">
      <el-select v-model="newsStatus" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="modalShow(false)">取 消</el-button>
        <el-button type="primary" @click.native="changeStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'news-list',
  data () {
    return {
      options: [{
        value: true,
        label: '有效'
      }, {
        value: false,
        label: '无效'
      }]
    }
  },
  computed: {
    tableData: {
      get () {
        return this.$store.state.newsManage.newsList
      }
    },
    deleteModal: {
      get () {
        return this.$store.state.newsManage.deleteModal
      },
      set (val) {
        this.$store.commit('updateDeleteModal', val)
      }
    },
    newsStatus: {
      get () {
        return this.$store.state.newsManage.newsStatus
      },
      set (val) {
        this.$store.commit('updateNewsStatus', val)
      }
    }
  },
  methods: {
    statusModal (flag, item) {
      this.modalShow(flag)
      this.$store.commit('updateNewsStatus', item.display)
      this.$store.commit('updateNewsId', item.id)
    },
    modalShow (flag) {
      this.$store.commit('updateDeleteModal', flag)
    },
    changeStatus () {
      this.$store.dispatch('changeStatus')
    },
    review (item) {
      sessionStorage.setItem('row', JSON.stringify(item))
      this.$router.push({
        path: 'review'
      })
    },
    rewriteNews (item) {
      sessionStorage.setItem('rewrite', JSON.stringify(item))
      this.$router.push({
        path: 'addNews',
        query: {
          isRewrite: 'true'
        }
      })
      window.location.reload()
    }
  }
}
</script>

<style scoped></style>
