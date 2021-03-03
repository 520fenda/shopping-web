<template>
  <div class="tab-cart">
    <div class="editor_head" v-show="goods.length">
    </div>
    <van-checkbox-group  class="card-goods" v-model="checkedGoods">
      <div v-for="(item, i) in goods" :key="i" class="card-goods__item">
        <van-checkbox :key="item.id" :name="item.id"  ></van-checkbox>
        <van-card :title="item.goodsName" :price="item.goodsPrice" :num="item.goodsNumber" :thumb="item.goodsImag">
        </van-card>
      </div>
      <!--<button @click="toasd">asd</button>-->

    </van-checkbox-group>

    <!--<is-empty v-if="!goods.length">您的购物车空空如也~</is-empty>-->

    <van-submit-bar
      style="bottom: 50px"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      button-text="结算"
      :loading="isSubmit"
      label="总计"
      @submit="cartSubmit"
    >
      <van-checkbox v-model="checkedAll" @click="setCheckAll" style="padding: 0 10px;">全选</van-checkbox>
    </van-submit-bar>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import { Checkbox, CheckboxGroup, Card, SubmitBar, Stepper, Tag, Form } from 'vant';
import MainTabBar from '../../components/content/mainTabbar/MainTabBar'
  import {getUserByAccount} from '../../network/home'
  import {getCart,getCartById} from '../../network/cart'
    export default {
        name: "cart",
      data() {
        return {
          checkedAll: false,
          isSubmit: false,
          checkedGoods: [],
          allGoods: [],
          goods: []
        };
      },

      created() {
        this.init();
      },
      computed: {
        totalPrice() {
          return this.goods.reduce(
            (total, item) =>
              total +
              (this.checkedGoods.indexOf(item.id) !== -1
                ? item.goodsPrice * item.goodsNumber * 100
                : 0),
            0
          );
        }
      },


      methods: {
        gettotalPrice() {
          return this.goods.reduce(
            (total, item) =>
              total +
              (this.checkedGoods.indexOf(item.id) !== -1
                ? item.goodsPrice * item.goodsNumber * 100
                : 0),
            0
          );
        },
        init() {
          var uid=window.localStorage.getItem('useraccount')
          var uuid=JSON.parse(uid)
          getUserByAccount(uuid).then(res=>{
            var uid=res.id
            getCart(uid).then(res2 => {
              // console.log(res2)
              this.goods = res2
              this.allGoods = this.getAllList();
            });
          })
        },
        getAllList() {
          let result = [];
          this.goods.forEach(g=>{
            result.push(g.id)
          })
          return result;
         
        },


        cartSubmit(data) {
          let params = [];
          var checkGoods=this.checkedGoods
          var checkgoods=JSON.stringify(checkGoods)
          localStorage.setItem('checkouts',checkgoods)

          var price=this.gettotalPrice();
          var toprice=JSON.stringify(price)

          localStorage.setItem('totoprice',toprice)
            this.isSubmit = true;
            this.$router.push('/order/checkouts');

        },
        setCheckAll(val) {
          if (this.checkedGoods.length === this.allGoods.length) {
            this.checkedGoods = [];
          } else {
            this.checkedGoods = this.allGoods;
          }
        },
      },

      components: {
        [Card.name]: Card,
        [Tag.name]: Tag,
        [Stepper.name]: Stepper,
        // [isEmpty.name]: isEmpty,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [CheckboxGroup.name]: CheckboxGroup,
        MainTabBar,

      }
    }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin';

  .tab-cart {
    padding-bottom: 50px;
    box-sizing: border-box;
  }

  .editor_head {
    @include one-border;
    text-align: right;
    padding: 10px;
    font-size: $font-size-normal;
    background-color: #fff;
  }

  .card-goods {
    background-color: $bg-color;
    .card-goods__item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      background-color: #fff;
    }
    .cart_delete {
      line-height: 100px;
      padding: 0 10px;
      color: #fff;
      background-color: $red;
    }
    .card-goods__footer {
      font-size: $font-size-normal;
      color: $font-color-gray;
    }
  }

  .clear_invalid {
    width: 120px;
    color: $font-color-gray;
    border: 1px solid $font-color-gray;
    margin: 0 auto;
    text-align: center;
    padding: 5px 3px;
    margin-top: 20px;
    border-radius: 3px;
  }
</style>
