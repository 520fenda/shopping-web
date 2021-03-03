<template>
<div class="order_list">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="getOrderList"
  >

    <van-panel
      v-for="(el, i) in orderList"
      :key="i"
      :title="'订单编号: ' + el.number"
      @click.native="toOrderDetail(el.id)"
      status="">
      <van-card
        v-for="(goods, goodsI) in el.orderdetail"
        :key="goodsI"
        :title="goods.goodsName"
        :num="goods.goodsNumber"
        :thumb="goods.goodsImag"
      />
      <div class="total">{{el.totalPrice}}</div>
    </van-panel>
  </van-list>
</div>
</template>

<script>
  import {Tab, Tabs, Panel, Card, List, Tag} from 'vant';
  import{getOrderByUid,getUserByAccount,getOrderDetailsByOid,} from '../../../network/home'
    export default {
        name: "order-list3",
      data:function () {
        return{
          loading: true,
          finished: true,
          orderList:[
            // {
            //   id: 1, number: '20201225', orderStatusText: 'test',
            //
            // }

          ],
          orderdetail:[
            // goodsName: '设计师原款，精致绣花',
            // number: 1,
            // picUrl: 'http://yanxuan.nosdn.127.net/8ab2d3287af0cefa2cc539e40600621d.png'
          ],

        }
      },
      // activated(){
      //   this.getOrderList()
      //   // this.toOrderDetail()
      // },

      created(){
        this.getOrderList()
      },
      methods:{
        toOrderDetail(id){
          this.$router.push({
            path: '/order/order-detail',
            query: {orderId: id}
          });
        },
        getOrderList(){
          var uid=window.localStorage.getItem('useraccount')
          // console.log(uid)
          var uuid=JSON.parse(uid)
          getUserByAccount(uuid).then(res=>{
            var usid=res.id
            getOrderByUid(usid).then(data=>{
              // console.log(data)
              for(var i=0;i<data.length;i++){
                var odId=data[i].id
                var item=data[i]
                this.orderList.push({
                  id:item.id,
                  number: item.number,
                  totalPrice:item.totalPrice,
                  orderdetail:item.orderdetail
                })
                // console.log(odId)
                // getOrderDetailsByOid(odId).then(data2=>{
                //   console.log(data2)
                //     for (var n=0;n<data2.length;n++){
                //       this.goodsList.push({
                //         goodsName:data2.goodsName,
                //         number: data2.goodsNumber,
                //         picUrl: data2.goodsImage,
                //       })
                //     }
                // })

                // for (var n=0;n<item.orderdetail.length;n++){
                //   var itemm=item.orderdetail[n]
                //   this.goodsList.push({
                //     goodsName:itemm.goodsName,
                //     number: itemm.goodsNumber	,
                //     picUrl: itemm.goodsImage,
                //
                //   })
                // }
              }
            })
          })

        }


      },
      components:{
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Panel.name]: Panel,
        [Card.name]: Card,
        [List.name]: List,
        [Tag.name]: Tag,
      }
    }
</script>

<style lang="scss" scoped>
  .order_list {
    .van-panel {
      margin-top: 20px;
    }

    .van-card {
      background-color: #fff;
    }

    .total {
      text-align: right;
      padding: 10px;
    }

    .footer_btn {
      text-align: right;
      .van-button {
        margin-left: 10px;
      }
    }
  }
</style>
