// 频道模块
import request from '@/utils/request'
// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}
// 添加用户频道
export const addUserhannels = (channel) => {
  return request({
    method: 'patch',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除用户频道
export const deleteUserhannels = (channelId) => {
  return request({
    method: 'delete',
    url: `/v1_0/user/channels/${channelId}`
  })
}
