<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">商城</div></nav-bar>
    <UserInfo><div slot="user-nickname">{{usernames}}</div></UserInfo>
    <list-view  class="order-list"></list-view>
    <main-tab-bar></main-tab-bar>

  </div>
</template>

<script>
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'
  import NavBar from 'common/navbar/NavBar'
  import  MainTabBar from 'content/mainTabbar/MainTabBar'
  import {getUserByAccount} from '../../network/home'
	export default {
		name: "Profile",
    components: {
		  UserInfo,
      ListView,
      NavBar,
      MainTabBar
    },
    created:function () {

    },
    data: function () {
		  return {
        usernames:'请先登录',
		 //    orderList: [
        //   {icon: '#order', iconColor: '#ff8198', info: '我的订单'},
        //   {icon: '#vip', iconColor: '#ffc636', info: '我的地址'},
        // ]
      }
    },
    mounted:function () {
      var data1 = localStorage.getItem('useraccount');

      var data2 = JSON.parse(data1);
      this.usernames = data2;

    }
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }

</style>
