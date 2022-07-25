// 获取联想建议模块
import request from '@/utils/request'
// 获取联想建议数据
export const getSearchAdvise = (q) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'get',
    params: { q }
  })
}
// 获取搜索结果
export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    method: 'get',
    params
  })
}
