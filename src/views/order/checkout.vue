<template>
  <div class="order">
    <van-cell-group>
      <van-cell v-if="checkedAddress" isLink @click="goAddressList()" title="收货地址">
        <div slot="label">
          <div>
            <span>{{ checkedAddress.name }} </span>
            <span>{{ checkedAddress.tel }} </span>
          </div>
          <div>
            {{ checkedAddress.addressDetail }}
          </div>
        </div>
      </van-cell>
    </van-cell-group>

    <van-card
      v-for="item in checkedGoodsList"
      :key="item.id"
      :title="item.goodsName"
      :num="item.number"
      :price="item.price +'.00'"
      :thumb="item.picUrl"
    >
      <!--<div slot="desc">-->
        <!--<div class="van-card__desc">-->
          <!--<van-tag plain style="margin-right:6px;" v-for="(spec, index) in item.specifications" :key="index">-->
            <!--{{spec}}-->
          <!--</van-tag>-->
        <!--</div>-->
      <!--</div>-->
    </van-card>

    <van-cell-group>
      <van-cell title="商品金额">
        <span class="red">{{goodsTotalPrice}}</span>
      </van-cell>
      <!--<van-cell title="邮费">-->
      <!--<span class="red">{{ freightPrice * 100| yuan}}</span>-->
      <!--</van-cell>-->
      <!--<van-cell title="优惠券">-->
      <!--<span class="red">-{{ couponPrice * 100| yuan}}</span>-->
      <!--</van-cell>-->
      <!--<van-field v-model="message" placeholder="请输入备注" label="订单备注">-->
      <!--<template slot="icon">{{message.length}}/50</template>-->
      <!--</van-field>      -->
    </van-cell-group>

    <van-submit-bar
      :price="actualPrice*100"
      label="总计："
      buttonText="提交订单"
      :disabled="isDisabled"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
  import { Card, Tag, ard, Field, SubmitBar, Toast  } from 'vant';
  import { CouponCell, CouponList, Popup } from 'vant';
  // import { cartCheckout, orderSubmit, couponSelectList} from '@/api/api';
  // import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';
  // import dayjs from 'dayjs';
  import {getAddressById,getGoodsById,saveOrder,getUserByAccount} from '../../network/home'
  export default {
    data() {
      return {
        checkedGoodsList: [
          // {
          // picUrl:'http://yanxuan.nosdn.127.net/8fe022126a2789d970f82853be13a5e6.png',
          // goodsName:'细腻绵羊毛，保暖性增加一倍',
          // price:659,
          // number:2}
        ],
        checkedAddress: {},
        goodsTotalPrice: 889, //商品总价
        actualPrice: 1, //实际需要支付的总价
        message: '',
        // useraddressList: [
        //   {id:2,name:"小李",tel:18888888888,address:"河北省邯郸市丛台区丛台公园1号楼1单元101号"},
        //   // {id:1,name:'小明',tel:16666666666,address:"北京市海淀区光明街2号楼2单元202号"}
        // ],
        isDisabled: true,
        showList: false,
      };
    },
    activated(){
      // const selectAddrId=localStorage.getItem('selectAddressId')
      // if (selectAddrId === null) {
      //   Toast.fail('请设置收货地址');
      //   return;
      // }
      //
      // var selectAddrIdp=JSON.parse(selectAddrId)
      // getAddressById(selectAddrIdp).then(res=>{
      //   var Addrss={
      //     id:res.id,
      //     name:res.userName,
      //     tel:res.userPhone,
      //     addressDetail:res.addr
      //   }
      //   this.checkedAddress=Addrss
      //   localStorage.setItem('orderAddress',JSON.stringify(Addrss))
      // })

    },
    created() {
      this.init()
    },

    methods: {
      init(){
        const selectAddrId=localStorage.getItem('selectAddressId')
        if (selectAddrId == 0) {
          Toast.fail('请设置收货地址');
        }else {
          this. isDisabled=false
        }

        var selectAddrIdp=JSON.parse(selectAddrId)
        getAddressById(selectAddrIdp).then(res=>{
          var Addrss={
            id:res.id,
            name:res.userName,
            tel:res.userPhone,
            addressDetail:res.addr
          }
          this.checkedAddress=Addrss
          // localStorage.setItem('orderAddress',JSON.stringify(Addrss))
        })



        const  buygoods=localStorage.getItem('buygoods')
        // console.log(buygoods)
        var goods=JSON.parse(buygoods)
        // console.log(buygoods)
        for(var i=0;i<goods.length;i++){
            // console.log(goods.length)
          var goodsId=goods[i].goodsId
          // console.log(goodsId)
          var buyGoodnumber=goods[i].number
          var toprice=goods[i].toprice
          // console.log(toprice)
          getGoodsById(goodsId).then(res=>{
            this.goodsTotalPrice=buyGoodnumber * res.price
            // this.goodsTotalPrice=toprice
            this.actualPrice=toprice
            this.checkedGoodsList.push({
              id:res.id,
              picUrl:res.image,
              goodsName:res.name,
              price:res.price,
              number:buyGoodnumber,
            })

          })
        }
      },
      onSubmit() {
        // const {AddressId, CartId, CouponId, UserCouponId} = getLocalStorage('AddressId', 'CartId', 'CouponId', 'UserCouponId');
        // if (AddressId === null) {
        //   Toast.fail('请设置收货地址');
        //   return;
        // }
        const selectAddrId=localStorage.getItem('selectAddressId')
        var selectAddrIdp=JSON.parse(selectAddrId)
        const  buygoods=localStorage.getItem('buygoods')
        var goods=JSON.parse(buygoods)
        var uid=window.localStorage.getItem('useraccount')
        // console.log(uid)
        var uuid=JSON.parse(uid)
        getUserByAccount(uuid).then(res=>{
          var uid=res.id
          var totalPrice=this.actualPrice
          // var map =new Map();
          // map.set(goodsId,buyGoodnumber)
          for(var i=0;i<goods.length;i++){
            var goodsId=goods[i].goodsId
            var buyGoodnumber=goods[i].number
          }
          saveOrder(uid,totalPrice,goodsId,buyGoodnumber,selectAddrIdp).then(res=>{

            this.$message.success("购买成功");
          })

        })
        this.isDisabled = true;
        localStorage.setItem('selectAddressId',0)
      //   orderSubmit({
      //     addressId: AddressId,
      //     cartId: CartId,
      //     couponId: CouponId,
      //     userCouponId: UserCouponId,
      //     grouponLinkId: 0,
      //     grouponRulesId: 0,
      //     message: this.message
      //   }).then(res => {
      //
      //     // 下单成功，重置下单参数。
      //     setLocalStorage({AddressId: 0, CartId: 0, CouponId: 0});
      //
      //     let orderId = res.data.data.orderId;
      //     this.$router.push({
      //       name: 'payment',
      //       params: { orderId: orderId }
      //     });
      //   }).catch(error => {
      //     this.isDisabled = false;
      //     this.$toast("下单失败");
      //   })
      },
      goAddressList() {
        this.$router.push({
          path: '/user/address'
        });
      },


    },

    components: {
      [Toast.name]: Toast ,
      [SubmitBar.name]: SubmitBar,
      [Card.name]: Card,
      [Field.name]: Field,
      [Tag.name]: Tag,
      [CouponCell.name]: CouponCell,
      [CouponList.name]: CouponList,
      [Popup.name]: Popup
    }
  };
</script>


<style lang="scss" scoped>
  .order-coupon {
    margin-top: 10px;
  }
</style>
