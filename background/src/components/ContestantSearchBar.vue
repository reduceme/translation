<template>
  <div class="search-content">
    <div class="demo-input-size">
      <el-input placeholder="请输入姓名" v-model="username"></el-input>
    </div>
    <div class="demo-input-size">
      <el-select v-model="register">
        <el-option
          v-for="item in isRegister"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="demo-input-size">
      <el-button type="primary" @click.native="searchList()">查询</el-button>
      <el-button type="primary" @click.native="exportExcel()">导出EXCEL</el-button>
    </div>
  </div>
</template>

<script>
import utils from '../utils/index'
export default {
  name: 'contestant-search-bar',
  data () {
    return {
      isRegister: [{
        value: '',
        name: '选择注册状态'
      }, {
        value: false,
        name: '注册中'
      }, {
        value: true,
        name: '注册完成'
      }]
    }
  },
  computed: {
    username: {
      get () {
        return this.$store.state.contestant.searchInfo.userName
      },
      set (value) {
        this.$store.commit('updateUsername', value)
      }
    },
    register: {
      get () {
        return this.$store.state.contestant.searchInfo.isRegister
      },
      set (value) {
        this.$store.commit('updateRegister', value)
      }
    }
  },
  methods: {
    searchList () {
      this.$store.dispatch('getList')
    },
    exportExcel () {
      location.href = utils.exportExcel
    }
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

  .demo-input-size:first-child{
    margin-left: 40px;
  }

  .demo-input-size:last-child{
    margin-left: 0;
    text-align: left;
  }
</style>
