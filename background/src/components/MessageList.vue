<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="添加时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="from"
        label="添加人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sendTo"
        label="选手姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="hasReadMsg"
        label="是否已读"
        width="180">
      </el-table-column>
      <el-table-column
        prop="message"
        label="消息内容">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default{
  name: 'message-list',
  computed: {
    tableData: {
      get () {
        return this.$store.state.message.tableData
      }
    }
  }
}
</script>

<style scoped></style>
