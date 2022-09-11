<template>
  <div>
    <article-item
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></article-item>
  </div>
</template>

<script>
// 发送请求 拿到当前文章的详情数据
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: { ArticleItem },
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getFirstPageArticles() {
      // 获取时间戳的三种方法
      // new Date().valueof()
      // Date.now()
      // +new Date()
      try {
        const { data } = await getArticles(this.id, +new Date())
        //   console.log(data)
        this.articles = data.data.results
      } catch (error) {
        // js的错误， . 507原封不动的上抛 . 400 上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style></style>
