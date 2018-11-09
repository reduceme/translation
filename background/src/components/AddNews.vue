<template>
  <div class="add-news-content">
    <el-select @change="getNewsList" v-model="display" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button id="search" type="primary" @click.native="goToAddNews()">新增新闻</el-button>
    <!--<add-or-edit-news-modal></add-or-edit-news-modal>-->
  </div>
</template>

<script>
// import AddOrEditNewsModal from './AddOrEditNewsModal'
import router from '../router/index'
export default {
  //  components: {AddOrEditNewsModal},
  name: 'add-news',
  data () {
    return {
      options: [{
        value: '',
        label: '全部新闻'
      }, {
        value: true,
        label: '已发布新闻'
      }, {
        value: false,
        label: '未发布新闻'
      }]
    }
  },
  methods: {
    goToAddNews () {
      this.$store.commit('clearRewriteInfo')
      router.push({
        path: 'addNews'
      })
    },
    getNewsList () {
      this.$store.dispatch('getNewsList')
    }
  },
  computed: {
    display: {
      get () {
        return this.$store.state.newsManage.getNewsData.display
      },
      set (val) {
        this.$store.commit('updateDisplay', val)
      }
    }
  }
}
</script>

<style scoped>
  .add-news-content {
    width: 100%;
    height: 100px;
    text-align: left;
  }

  #search{
    margin: 30px 50px;
  }

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
