import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求发起会经过这里
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意：这里务必返回config配置对象，否则请求会出不去
    return config
  },
  function (error) {
    // 如果请求出错了（还没发出去）会进入这里
    return Promise.reject(error)
  }
)
export default request
