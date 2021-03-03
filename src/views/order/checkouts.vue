<template>

  <div class="order">
    <!--<button @click="aa">aaaaa</button>-->
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
  import {getAddressById,getGoodsById,saveOrder2,getUserByAccount,saveOrderDetail} from '../../network/home'
  import {deleCart,getCartById} from '../../network/cart'
    export default {
        name: "checkouts",
      data() {
        return {
          checkedGoodsList: [],
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

      created() {
        this.init()
      },

      methods: {
        init() {
          const selectAddrId = localStorage.getItem('selectAddressId')
          if (selectAddrId == 0) {
            Toast.fail('请设置收货地址');
          } else {
            this.isDisabled = false
          }

          var selectAddrIdp = JSON.parse(selectAddrId)
          getAddressById(selectAddrIdp).then(res => {
            var Addrss = {
              id: res.id,
              name: res.userName,
              tel: res.userPhone,
              addressDetail: res.addr
            }
            this.checkedAddress = Addrss
          })
          var asd=localStorage.getItem('totoprice')
          var totalprice=JSON.parse(asd)


         var checkcarts= localStorage.getItem('checkouts')
          var checkgoods=JSON.parse(checkcarts)


          for (var i = 0; i < checkgoods.length; i++) {
            // console.log(checkgoods[i])
            var catid=checkgoods[i]
            getCartById(catid).then(res=>{
              this.goodsTotalPrice = totalprice *0.01
              this.actualPrice = totalprice *0.01

              this.checkedGoodsList.push({
                id: res.goodsId,
                picUrl: res.goodsImag,
                goodsName: res.goodsName,
                price: res.goodsPrice,
                number: res.goodsNumber,
              })
            })
          }
        },

        onSubmit() {
          const selectAddrId = localStorage.getItem('selectAddressId')
          var selectAddrIdp = JSON.parse(selectAddrId)
          var checkcarts= localStorage.getItem('checkouts')
          var checkgoods=JSON.parse(checkcarts)
          // console.log(checkgoods)
          var uid = window.localStorage.getItem('useraccount')
          var uuid = JSON.parse(uid)
          getUserByAccount(uuid).then(res => {
            var uid = res.id
            var totalPrices = this.actualPrice
            // map.set(goodsId,buyGoodnumber)
            var checkgood= this.checkedGoodsList
            var goods=[]
            for (var n=0;n<checkgood.length;n++){
              var goodsId = checkgood[n].id
              var buyGoodnumber = checkgood[n].number
              goods.push({
                gid:goodsId,
                num:buyGoodnumber
              })
            }

            saveOrder2({
              goods:goods,
              uid:uid,
              totalPrice:totalPrices,
              aid:selectAddrIdp
            }).then(res => {
              this.$message.success("购买成功");
            })

          })
          this.isDisabled = true;
          localStorage.setItem('selectAddressId', 0)

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

    }
</script>

<style lang="scss" scoped>
  .order-coupon {
    margin-top: 10px;
  }
</style>

