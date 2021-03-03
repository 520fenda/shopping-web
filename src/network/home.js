import axios from './axios'


export function LoginUser(data) {
  return axios({
    url:'/user/LoginUser',
    method:'post',
    data:data

  })
}


export function getUserByAccount(account) {
  return axios({
    url:'/user/getUserByAccount',
    params:{
      account:account

    }
  })
}

export function getHomeData( page) {
  return axios({
    url: '/goods/findPageAll',
    params: {
      page
    }
  })
}
export  function getAddress(uid) {
  return axios({
    url:'/address/getAddressByUid',
    params:{
      uid:uid
    }

  })
}

export  function getAddressById(id) {
  return axios({
    url:'/address/getAddressById',
    params:{
      id:id
    }

  })
}
export  function getGoodsById(id) {
  return axios({
    url:'/goods/getGoodsById',
    params:{
      id:id
    }

  })
}
var map =new Map()
export  function saveOrder(uid,totalPrice,gid,gnum,aid) {
  return axios({
    url:'/order/saveOrder',
    params:{
      uid:uid,
      totalPrice:totalPrice,
      gid:gid,
      gnum:gnum,
      aid:aid

    }

  })
}
export  function saveOrder2(data) {
  return axios({
    url:'/order/saveOrder2',
    method:'post',
    data:data


  })
}
export  function getOrderByUid(uid) {
  return axios({
    url:'/order/getOrderByUid',
    params:{
      uid:uid,
    }

  })
}

export  function getOrderDetailsByOid(oid) {
  return axios({
    url:'/orderdetails/getOrderDetailsByOid',
    params:{
      oid:oid,

    }

  })
}
export  function gerOrderAndOrderDetails(uid) {
  return axios({
    url:'/order/gerOrderAndOrderDetails',
    params:{
      uid:uid,

    }

  })
}
export  function addAddress(data) {
  return axios({
    url:'/address/addAddress',
    method:'post',
      data:data
  })

}
export  function updateAddress(data) {
  return axios({
    url:'/address/updateAddress',
    method:'post',
      data:data
  })

}


export  function saveOrderDetail(cartVO) {
  return axios({
    url:'/orderdetails/saveod2',
    params:{
      gid:cartVO.gid,
      gnum:cartVO.gnum

    },
    // method:'post',
    // cartVO:cartVO
  })
}


