<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :data="showGoodsList"
            :pull-up-load="true"
            :probe-type="3">
      <div>
        <goods-list :goods-list="showGoodsList"></goods-list>
      </div>
    </scroll>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import Scroll from 'common/scroll/Scroll'
  import TabControl from 'content/tabControl/TabControl'
  import GoodsList from './childComps/GoodsList'
  import { getHomeData} from "../../network/home";
  import  MainTabBar from 'content/mainTabbar/MainTabBar'

  export default {
		name: "Home",
    components: {
		  NavBar,
      Scroll,
      TabControl,
      GoodsList,
      MainTabBar
    },
    data() {
		  return {

        goodsList: {
          page: 1, list: [],

        },
        isTabFixed: false,
        tabOffsetTop: 0,
        showBackTop: false
      }
    },
    computed: {
		  showGoodsList() {
		    return this.goodsList.list
      }
    },
    created() {
      this.getHomeProducts()
    },


    methods: {

      contentScroll(position) {
        this.isTabFixed = position.y < -this.tabOffsetTop
      },
      loadMore() {
        this.getHomeProducts()
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },

      getHomeProducts() {
        getHomeData( this.goodsList.page).then(res => {
          const goodsList = res.list;
          this.goodsList.list.push(...goodsList)
          this.goodsList.page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
	}
</script>

<style scoped>
  #home {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }

</style>
