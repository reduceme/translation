<template>
  <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[20, 100, 200, 300, 400]"
      :page-size="20"
      layout="total, sizes, prev, pager, next"
      :total="parseInt(total)">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'message-page',
  methods: {
    handleSizeChange (val) {
      this.$store.commit('updateMessagePageInfo', {
        key: 'pageSize',
        value: val
      })
      this.searchList()
    },
    handleCurrentChange (val) {
      this.$store.commit('updateMessagePageInfo', {
        key: 'pageNum',
        value: val
      })
      this.searchList()
    },
    searchList () {
      this.$store.dispatch('getAllMessage')
    }
  },
  data () {
    return {}
  },
  computed: {
    currentPage: {
      get () {
        return this.$store.state.message.pageInfo.pageNum
      },
      set (value) {}
    },
    total: {
      get () {
        return this.$store.state.message.total
      }
    }
  }
}
</script>

<style scoped>
  .block{
    float: right;
    display: block;
    margin-top: 20px;
  }
</style>
