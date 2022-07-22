<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部标签栏 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/wenda">
        <i slot="icon" class="iconfont icon-pinglun"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayOutIndex',
  data() {
    return {}
  }
}
</script>

<style lang='less' scoped>
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
