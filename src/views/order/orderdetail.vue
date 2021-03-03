<template>
  <div class="order_detail">
    <div class="order-goods">
      <van-card v-for="item in orderGoods"
                :key="item.id"
                :title="item.goodsName"
                desc=""
                :num="item.number"
                :price="item.price +'.00'"
                :thumb="item.picUrl">
      </van-card>

    </div>
    <van-cell-group style="margin-top: 20px;">
      <van-cell icon="dingwei"
                :title="`${orderInfo.consignee}  ${orderInfo.mobile}`"
                :label="orderInfo.address"/>
    </van-cell-group>
    <van-cell-group style="margin-top: 20px;">
      <van-cell title="下单时间">
        <span>{{orderInfo.createTime}}</span>
      </van-cell>
      <van-cell title="订单编号">
        <span>{{orderInfo.number}}</span>
      </van-cell>
      <van-cell title="实付款：">
        <span class="red">{{orderInfo.totalPrice}}</span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  import {Card, Field, SubmitBar, Button, Cell, CellGroup, Dialog} from 'vant';
  import {getAddressById,gerOrderAndOrderDetails} from '../../network/home'
  export default {
    name: "orderdetail",
    data: function () {
      return {
        orderInfo: {},
        orderGoods: [],

      }
    },
    // activated(){
    //   this.init()
    // },
    created(){
      this.init()
    },
    methods:{
      init(){
        let orderId = this.$route.query.orderId;
        // console.log(orderId)
        gerOrderAndOrderDetails(orderId).then(res=>{

          var seladdressid=res.addressId
          // console.log(seladdressid)
          getAddressById(seladdressid).then(data=>{
            var Addrss={
              id:data.id,
              consignee:data.userName,
              mobile:data.userPhone	,
              address:data.addr
            }
            this.orderInfo=Addrss
            this.orderInfo.totalPrice=res.totalPrice
            this.orderInfo.createTime=res.createTime
            this.orderInfo.number=res.number
          })

          var oGoods=[]
          for(var i=0;i<res.orderdetail.length;i++){
            var item=res.orderdetail[i]
            oGoods.push({
                id:item.id,
                goodsName:item.goodsName,
                number:item.goodsNumber,
                price:item.goodsPrice,
                picUrl:item.goodsImag
            })
          }
          this.orderGoods=oGoods
        })
        // const orderAddr=localStorage.getItem('orderAddress')
        // var selectAddrp=JSON.parse(orderAddr)
        // var orderAddrId=selectAddrp.id
        // getAddressById(orderAddrId).then(res=>{
        //   var Addrss={
        //     id:res.id,
        //     consignee:res.userName,
        //     mobile:res.userPhone	,
        //     address:res.addr
        //   }
        //   this.orderInfo=Addrss
        //
        // })
      }
    },
    components: {
      [Dialog.name]: Dialog,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell,
      [Button.name]: Button,
      [SubmitBar.name]: SubmitBar,
      [Card.name]: Card,
      [Field.name]: Field
    }
  }
</script>

<style lang="scss" scoped>
  .order_detail {
    padding-bottom: 70px;
  }
</style>
