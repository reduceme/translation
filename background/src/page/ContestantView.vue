<template>
  <div>
    <contestant-search-bar></contestant-search-bar>
    <contestant-list></contestant-list>
    <pagination></pagination>
    <change-state></change-state>
  </div>
</template>

<script>
import ContestantSearchBar from '../components/ContestantSearchBar.vue'
import ContestantList from '../components/ContestantList.vue'
import Pagination from '../components/Pagination.vue'
import ChangeState from '../components/ChangeState.vue'
export default {
  name: 'contestant-view',
  components: { ContestantSearchBar, ContestantList, Pagination, ChangeState },
  methods: {
    searchList () {
      this.$store.dispatch('getList')
    }
  },
  mounted () {
    this.searchList()
  }
}
</script>

<style></style>
