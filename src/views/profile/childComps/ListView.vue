<template>
    <div id="list">
      <div  class="item">

          <span class="icon">
            <svg fill="#ff8198"><use xlink:href="#order"></use></svg>
          </span>
        <div @click="touserorder" class="info">我的订单</div>

        <span class="icon2">
            <!--<svg fill="#ffc636"><use xlink:href="#vip"></use></svg>-->
          <svg t="1608618656413" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2995" width="200" height="200"><path d="M518.4 48C304 48 128 224 128 441.6c0 48 16 99.2 41.6 156.8C198.4 656 240 716.8 288 780.8c35.2 41.6 73.6 83.2 108.8 121.6l35.2 35.2c6.4 6.4 12.8 9.6 12.8 12.8 38.4 38.4 102.4 38.4 137.6 0l12.8-12.8 35.2-35.2c38.4-38.4 73.6-80 108.8-121.6C790.4 720 832 656 857.6 598.4c28.8-57.6 41.6-108.8 41.6-156.8C908.8 224 732.8 48 518.4 48z m304 528c-25.6 54.4-64 112-115.2 172.8-35.2 41.6-70.4 83.2-105.6 118.4l-35.2 35.2-12.8 12.8c-19.2 19.2-51.2 19.2-70.4 0l-12.8-12.8-35.2-35.2c-35.2-38.4-73.6-76.8-105.6-118.4-48-60.8-86.4-118.4-115.2-172.8-25.6-51.2-38.4-96-38.4-134.4C176 249.6 329.6 96 518.4 96c188.8 0 342.4 153.6 342.4 345.6 0 38.4-12.8 83.2-38.4 134.4z m-304-313.6c-96 0-169.6 76.8-169.6 172.8 0 96 76.8 172.8 169.6 172.8S688 531.2 688 435.2c0-96-73.6-172.8-169.6-172.8z m0 294.4c-67.2 0-121.6-54.4-121.6-124.8s54.4-124.8 121.6-124.8c67.2 0 121.6 54.4 121.6 124.8s-54.4 124.8-121.6 124.8z" fill="" p-id="2996"></path></svg>
          </span>
        <div @click="toAddress" class="info">我的地址</div>
      </div>
      <div class="logout" @click="loginOut">退出当前账户</div>
    </div>
</template>

<script>
	export default {
		name: "ListView",
    props: {
		  listData: {
		    type: Array,
        default: function () {
          return []
        }
      }
    },
    methods:{
      touserorder(){
        this.$router.push('/user/order/list')
      },
      loginOut() {
       localStorage.removeItem("useraccount")
        // this.$router.push({ name: 'home' })
        // window.location.href='http://localhost:8082/home'
        window.location.href='/'

      },
      toAddress(){
        this.$router.push('/user/addresss')
      }
    }
	}
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon svg {
    width: 18px;
    height: 18px;
  }
  .icon2 svg {
    width: 18px;
    height: 18px;
  }


  .icon2 {
    margin-top: 60px;
    position: absolute;
    left: 0px;
    top: -7px;
  }

  .item .icon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
  .logout{
    margin-top: 80px;
    text-align: center;
    background-color: white;
    font-size: large;

  }
</style>
