import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const cart=()=>import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const login=()=> import('views/login/login')
const Address=()=>import('views/profile/childComps/profileAddress')
const Addresss=()=>import('views/profile/childComps/profileAddresss')
const OrderCheckout=()=>import('views/order/checkout')
const OrderCheckouts=()=>import('views/order/checkouts')
const UserOrder =()=> import('views/profile/childComps/orderList3')
const  OrderDetail=()=>import('views/order/orderdetail')
const addAddress=()=>import('views/profile/childComps/addAddress')
const editAddress=()=>import('views/profile/childComps/editAddress')
const eeditAddress=()=>import('views/profile/childComps/eeditAddress')
Vue.use(VueRouter)



const routes = [
  {
    path: '/order/checkout',
    name: 'orderCheckout',
    meta:{auth:true},

    component: OrderCheckout
  },

  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name:'home',
    component: Home
  },
  {
    path: '/cart',
    name:'cart',
    meta:{auth:true},

    component: cart
  },

  {
    path: '/profile',
    meta:{auth:true},
    component: Profile

  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/user/address',
    meta:{auth:true},
    component: Address
  },
  {
    path: '/user/addresss',
    meta:{auth:true},
    component: Addresss
  },
  {
    path: '/user/order/list',
    component: UserOrder
  },
  {
    path: '/order/order-detail',
    component: OrderDetail
  },
  {
    path: '/order/checkouts',
    name: 'orderCheckouts',
    component: OrderCheckouts
  },
  {
    path: '/user/addaddress',
    component: addAddress
  },
  {
    path: '/user/editaddress',
    component: editAddress
  },
  {
    path: '/user/eeditaddress',
    component: eeditAddress
  },



]


const router = new VueRouter({
  mode: 'history',
  routes
})


export default router
