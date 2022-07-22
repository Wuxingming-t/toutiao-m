// 用户相关请求模块
import request from '@/utils/request'
// import store from '@/store'

// 登录
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}
// 发送验证码
export const sendCode = (mobile) => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取当前用户信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'get'
    // // 发送请求头
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
