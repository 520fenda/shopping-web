import axios from './axios'

export function getDetail(id) {
  return axios({
    url: '/goods/getGoodsById',
    params: {
      id
    }
  })
}



