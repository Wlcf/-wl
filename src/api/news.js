// 所有关于新闻的接口

import request from '@/utils/requsest'

/**
 * 获取文章
 * @param {String | Number} id 频道的id
 * @param {Number} timestamp 请求新的推荐数据当前的时间戳，请求历史推荐传指定的时间戳
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
