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
