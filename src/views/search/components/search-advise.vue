<template>
  <div class="search-advise">
    <van-cell
      icon="search"
      v-for="(item, index) in AdviseList"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchAdvise } from '@/api/search'
import { debounce } from 'lodash'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      AdviseList: []
    }
  },
  watch: {
    searchText: {
      // 当searchtext发生改变的时候就会调用handler函数
      //   handler(val) {
      //     this.loadSearchAdvise(val)
      //   },
      handler: debounce(function (val) {
        this.loadSearchAdvise(val)
      }, 200),
      immediate: true // 该回调会在监听开始之后被立即执行
    }
  },
  methods: {
    async loadSearchAdvise(q) {
      try {
        const { data } = await getSearchAdvise(q)
        this.AdviseList = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后再试')
      }
    },
    highlight(item) {
      const highlightStr = `<span style='color:#3296fa'>${this.searchText}</span>`
      // 正则表达式//中间的内容都会当做匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, highlightStr)
    }
  }
}
</script>

<style>
</style>
