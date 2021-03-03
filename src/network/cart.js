import axios from './axios'
export function getCart(id) {
  return axios({
    url: '/cart/getCartByUid',
    params: {
      id
    }
  })
}
export function getCartById(id) {
  return axios({
    url: '/cart/getCartById',
    params: {
      id
    }
  })
}


export function addCart(data) {
  return axios({
    url: '/cart/addCart',
    data:data,
    method:'post',
  })
}
export function deleCart(id) {
  return axios({
    url: '/cart/deleCart',
    params: {
      id
    }
  })
}
