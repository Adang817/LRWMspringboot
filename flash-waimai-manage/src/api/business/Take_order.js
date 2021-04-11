import request from '@/utils/request'

export function getTakeList() {
  return request({
    url: '/getOrderList',
    method: 'get',
  })
}
