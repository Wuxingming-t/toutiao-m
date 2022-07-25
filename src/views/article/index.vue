<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
      left-arrow
      title="某头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="main-warp">
      <!-- 加载中 -->
      <div class="loading-warp" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          ></van-image>
          <div class="user-name" slot="title">{{ article.aut_name }}</div>
          <div class="publish-date" slot="label">
            {{ article.pubdate | relativeTime }}
          </div>
          <van-button
            class="follow-btn"
            type="info"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
        </van-cell>
        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure"></van-icon>
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- 加载失败：其他未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure"></van-icon>
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777"></van-icon>
      <van-icon name="star-o" color="#777"></van-icon>
      <van-icon name="good-job-o" color="#777"></van-icon>
      <van-icon name="share" color="#777"></van-icon>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import { ImagePreview } from 'vant'
export default {
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {},
      loading: true,
      errStatus: 0
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async loadArticle() {
      this.loading = true
      try {
        const { data } = await getArticleDetail(this.articleId)
        this.article = data.data
        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取数据失败，请稍后再试')
      }
      this.loading = false
    },
    previewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import './github-markdown.css';
.article-container {
  padding-top: 64px;
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }
  }
}
</style>
