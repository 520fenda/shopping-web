<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll=""
            :data="[img]"
            :probe-type="3">
      <div>
        <img  class="detailImg" :src="img"/>
        <detail-base-info :goods="detgoods"></detail-base-info>
      </div>
    </scroll>
    <div class="item_cell_group">

      <van-sku
        v-model="showSku"
        :sku="sku"
        :hide-stock="true"
        :goods="skuGoods"
        :goodsId="this.$route.query.id"
        @buy-clicked="buyGoods"
        @add-cart="addCart"
      />


      <van-popup v-model="propsPopup" position="bottom">
        <popup-props ></popup-props>
      </van-popup>
    </div>
    <van-goods-action>
      <van-goods-action-button type="warning" @click="skuClick" text="加入购物车"/>
      <van-goods-action-button type="danger" @click="skuClick" text="立即购买"/>
    </van-goods-action>

  </div>
</template>

<script>
  import { Sku,  GoodsAction, GoodsActionButton, GoodsActionIcon, Popup } from 'vant';
  import {Message} from 'element-ui'
  import Scroll from 'common/scroll/Scroll'
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import popupProps from './childComps/popup-props';
  import {getDetail} from '../../network/detail'
  import {addCart}from '../../network/cart'
  import {getUserByAccount} from '../../network/home'

  export default {
		name: "Detail",
    components: {
      DetailBaseInfo,
      DetailBottomBar,
		  Scroll,
		  DetailNavBar,
      [Popup.name]: Popup,
      [Sku.name]: Sku,
      [GoodsAction.name]: GoodsAction,
      [GoodsActionButton.name]: GoodsActionButton,
      [GoodsActionIcon.name]: GoodsActionIcon,
      [popupProps.name]: popupProps
    },

    data() {
      // const isLogin = !!localStorage.getItem('Authorization');
		  return {
        // isLogin,
        detgoods:[],
		    did: '',
        img:'',
        list: [],
        goods: {
          userHasCollect: 0,
          info: {
            gallery: []
          }
        },
        sku: {
          tree: [
          //   {
          //   k: '规格', // skuKeyName：规格类目名称
          //   v: [
          //     {
          //       id: '30349', // skuValueId：规格值 id
          //       name: '标准', // skuValueName：规格值名称
          //     },
          //   ],
          //   k_s: 's1',
          // }
          ],
          list: [],
          price: '', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
        },
        skuGoods: {},
        propsPopup: false,
        showSku: false
      }
    },
    created() {
		  this._getDetailData()

    },

    methods: {
		  _getDetailData() {
        const id = this.$route.query.id
        this.did = id
        getDetail(id).then(res=>{
          this.price=res.price
          this.detgoods=res
          this.img=res.image
          this.sku.price=res.price
          this.skuGoods.picture=res.image
          this.sku.list.push({
            id: 2259, // skuId，下单时后端需要
            price:res.price *100 , // 价格（单位分）
            s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 110 // 当前 sku 组合对应的库存
          })
        })
        // this.list.filter((item,i)=>{
        //   if (this.list[i].id==id){
        //     this.detgoods=this.list[i]
        //     this.img=this.list[i].img
        //     this.sku.price=this.list[i].price
        //     this.skuGoods.picture=this.list[i].img
        //       this.sku.list.push(
        //         {
        //           id: 2259, // skuId，下单时后端需要
        //           price:this.list[i].price *100 , // 价格（单位分）
        //           s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
        //           stock_num: 110 // 当前 sku 组合对应的库存
        //         }
        //       )
        //   }
        // })
      },
      skuClick() {
        this.showSku = true;
      },

      addCart(data) {
        var uid=window.localStorage.getItem('useraccount')
        var uuid=JSON.parse(uid)
        // console.log(uuid)
        if (uuid==null){
          Message.error("请先登录")
          this.$router.push({path: '/login'})
        }
        else {
          getUserByAccount(uuid).then(res => {
            var uid = res.id
            var gid = data.goodsId
            var num = data.selectedNum
            var addcarinfo={
              uid:uid,
              gid:gid,
              num:num
            }

            addCart(addcarinfo).then(res2 => {
              this.$toast({
                message: '已添加至购物车',
                duration: 1500
              });
              this.showSku = false;
            })
          })
        }
      },
      buyGoods(data) {
        let that = this;
        let params = [{
          goodsId: this.$route.query.id,
          number: data.selectedNum,
          toprice:data.selectedNum * this.detgoods.price
        }];
           var buygood= JSON.stringify(params)
        localStorage.setItem('buygoods',buygood)
        that.showSku = false;
        this.$router.push('/order/checkout');

      },


    }
	}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }


  .detailImg{
    height: 100%;
    width: 100%;
  }
</style>
