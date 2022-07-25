import dayjs from 'dayjs'
import Vue from 'vue'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用

// dayjs()获取当前最新时间
// dayjs().format('YYYY-MM-DD')
// 定义一个全局过滤器
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
