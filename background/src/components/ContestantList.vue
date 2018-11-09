<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="姓名">
      <template slot-scope="scope">
        <el-button @click.native="goDetail(scope.row)" type="text" size="small">{{scope.row.userName}}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="emailAddress"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="work"
      label="工作单位">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="localRegister"
      label="是否审核通过"
      width="120">
    </el-table-column>
    <el-table-column
      label="复赛演讲稿（中英对照）">
      <template slot-scope="scope">
        <el-button @click.native="downloadFile(scope.row.userId, 'speech')" type="text" size="small">{{scope.row.speech}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="决赛演讲稿（中英对照）">
      <template slot-scope="scope">
        <el-button @click.native="downloadFile(scope.row.userId, 'speech1')" type="text" size="small">{{scope.row.speech1}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="单位推荐文件扫描件">
      <template slot-scope="scope">
        <el-button @click.native="downloadFile(scope.row.userId, 'rec')" type="text" size="small">
          {{scope.row.recommandFile}}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button
          @click.native="updateModalAndId(scope.row)"
          type="primary"
          v-show="!scope.row.register"
          size="mini">
          审核
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import utils from '../utils/index'
export default {
  name: 'contestant-list',
  computed: {
    tableData: {
      get () {
        return this.$store.state.contestant.userList.tableData
      }
    }
  },
  methods: {
    updateModalAndId (item) {
      let flag = {
        id: item.userId,
        isModalShow: true
      }
      this.$store.commit('updateModalAndId', flag)
    },
    downloadFile (id, type) {
      location.href = utils.downloadFileUrl + '?type=' + type + '&id=' + id
    },
    goDetail (item) {
      this.$router.push({
        path: '/hkjyyds/detail/',
        query: {
          id: item.userId,
          speech: item.speech,
          speech1: item.speech1
        }
      })
    }
  }
}
</script>

<style></style>
