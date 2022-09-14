// 所有关于频道的接口

import request from '@/utils/requsest'

/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 删除频道
 * @param {Number/String} id 频道的id
 * @returns Promise
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {String/Number} id 新增频道的id
 * @param {Number} seq 新增频道添加的索引值
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
