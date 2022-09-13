<template>
  <div class="article">
    <!-- offset:滚动条和底部距离多少的时候触发load事件，默认值是300px -->
    <!-- immediate-check:初渲染的时候是否执行load事件，默认是true -->
    <!-- v-model="loading" -->
    <!-- loading为true,load事件不会被触发 -->
    <!-- loading为false的时候，load事件会被触发 -->
    <!-- loading会在load事件执行后，被van-list组件自动设置为true，需要手动的改为false -->
    <!-- finished:Boolean. false:load事件会被触发 true：load事件不会被触发，并且显示finished-text的文本 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多的文章了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
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
      articles: [],
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    // loading: false,
    async getFirstPageArticles() {
      // 获取时间戳的三种方法
      // new Date().valueof()
      // Date.now()
      // +new Date()
      try {
        const { data } = await getArticles(this.id, +new Date())
        //   console.log(data)
        this.articles = data.data.results
        // 保存下一页的时间戳，用于分页
        this.perTimestamp = data.data.pre_timestamp
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
    },
    async getNextPageArticle() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }

        //  1.发送请求
        const { data } = await getArticles(this.id, this.perTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下滑加载，将数据放到最后
        // 如果是下拉刷新，将数据放在最前
        // 2.添加到articles
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 3.更新时间戳
        this.perTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally语句一定会执行
        // 4.更改loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 如何给盒子拥有自己的滚动条
//  - 1.定高 2.overflow: auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
}

// &: 代表当前元素他爹
// ::-webkit-scrollbar : 滚动槽
// ::-webkit-scrollbar-thumb: 滚动的滑块
&::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
&::-webkit-scrollbar-thumb {
  background-color: #3296fa;
  border-radius: 10px;
}
</style>
