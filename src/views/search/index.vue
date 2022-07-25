<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <search-result v-if="isResultShow" :search-text="searchText" />
    <search-advise
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <search-history
      v-else
      :search-histories="SearchHistories"
      @clear-search-histories="SearchHistories = []"
      @search="onSearch"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchAdvise from './components/search-advise.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: {
    SearchHistory,
    SearchAdvise,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      SearchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  watch: {
    SearchHistories(val) {
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      // 存储搜索历史记录
      const index = this.SearchHistories.indexOf(val)
      if (index !== -1) {
        this.SearchHistories.splice(index, 1)
      }
      this.SearchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang='less' scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
