<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
        placeholder="请输入搜索关键词"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->

    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-ressult></search-ressult> -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchRessult from './components/SearchRessult.vue'

import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchRessult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史 ：搜索框的值空
      // 搜索建议：搜索有值，并且不渲染搜索结果
      // 搜索结果：触发搜索时，显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchRessult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywordes) {
      // 把keywordes关键词存起来
      // 1. 用户手动敲回车  2. 点击了搜索建议
      // 存储搜索历史

      // 去重：1. 获取没有去重的数组 2. 放在new Set(arr) 3. [...set]
      const distinctHistories = [...new Set([keywordes, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)

      this.keywords = keywordes
      this.isShowSearchResult = true
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
