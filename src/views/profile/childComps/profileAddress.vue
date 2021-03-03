<template>
  <div>
    <detail-nav-bar></detail-nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
      <!--<img v-for="item in addressList.length" class="editbtn" src="../../../assets/img/common/edit.png"/>-->


  </div>
</template>

<script>
  import { AddressList, NavBar } from 'vant';
 import DetailNavBar from '../../detail/childComps/DetailNavBar'
import {getUserByAccount,getAddress} from  '../../../network/home'
    export default {
        name: "address",
      data() {
        return {
          chosenAddressId: -1,
          addressList: []
        };
      },

      created() {
        this.init()
      },
      methods: {
          init(){
            var uid=window.localStorage.getItem('useraccount')
            // console.log(uid)
            var uuid=JSON.parse(uid)
            getUserByAccount(uuid).then(res=>{
                // console.log(res)
                var usid=res.id
                // console.log(usid)
                getAddress(usid).then(data=>{
                  // console.log(data)
                  var addList=[]
                  for(var i=0;i<data.length;i++){
                    var item=data[i]

                    // this.addressList.push({
                    //   id:item.id,
                    //   name: item.userName,
                    //   tel: item.userPhone,
                    //   address: item.addr
                    // })
                    addList.push({
                        id:item.id,
                        name: item.userName,
                        tel: item.userPhone,
                        address: item.addr
                    })
                  }
                  this.addressList=addList
                })
              }
            )
          },
        onAdd() {
          this.$router.push('/user/addaddress');
        },

        onEdit(item, index) {
          this.$router.push({ path: '/user/addaddress', query: { addressId: item.id } });
        },
        onSelect(item, index) {
         localStorage.setItem('selectAddressId',item.id);
          this.$router.go(-1);
        },


      },

      components: {
        [NavBar.name]: NavBar,
        [AddressList.name]: AddressList,
        DetailNavBar
      }
    }

</script>

<style lang="scss" scoped>
  .editbtn{

    height: 15px;
    width: 15px;
  }
  .addressGroup {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .bottom_btn {
    position: fixed;
    bottom: 0;

  }
</style>
<!--<style  scoped>-->
  <!--.addressGroup {-->
    <!--margin-bottom: 10px;-->

  <!--}-->

  <!--.bottom_btn {-->
    <!--position: fixed;-->
    <!--bottom: 0;-->
  <!--}-->
<!--</style>-->
