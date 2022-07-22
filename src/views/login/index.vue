<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="default"
            round
            @click="onSendCode"
            native-type="button"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { require: true, message: '手机号不能为空' },
          { pattern: /1[3|5|7|8]\d{9}/, message: '手机号格式错误' }
        ],
        code: [
          { require: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 3.提交表单请求登录
      try {
        const res = await login(user)
        this.$store.commit('setUser', res.data.data)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后再试')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onSendCode() {
      // 1.检验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {}
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发生验证码
      try {
        await sendCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后再试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 170px;
    height: 46px;
    line-height: 46px;
    background: #ededed;
    font-size: 10px;
    color: #666;
  }
  .login-btn-warp {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      border-radius: 10px;
    }
  }
}
</style>
