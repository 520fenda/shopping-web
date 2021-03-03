<template>
  <div>

    <van-address-edit

      style="background-color: #fff;"
      :areaList="areaList"
      :addressInfo="addressInfo"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
  import { AddressEdit, NavBar } from 'vant';
  import areaList from './area.json';
  import {addAddress,getUserByAccount} from '../../../network/home'

    export default {
        name: "add-address",
      data() {
        return {
          areaList,
          addressId: 0,
          addressInfo: {}
        };
      },


      methods: {


        onSave(content) {
            console.log(content)
           var addr=content.province+content.city+content.county+content.addressDetail
          var userName=content.name
          var tel=content.tel
          var uid=window.localStorage.getItem('useraccount')
          var uuid=JSON.parse(uid)
          getUserByAccount(uuid).then(res=>{
            var usid=res.id
            var data={
              userId: usid,
              userName: userName,
              userPhone: tel,
              addr: addr
            }
            // console.log(data)
            addAddress(data).then(res => {
              this.$toast('成功');
              // this.$router.go(-1);
            });
          })

        },
        onDelete(content) {
          addressDelete({ id: content.id });
          removeLocalStorage('AddressId')
          this.$router.go(-1);
        },
        goback() {
          this.$router.go(-1);
        }
      },

      components: {
        [NavBar.name]: NavBar,
        [AddressEdit.name]: AddressEdit
      }
    }

</script>

<style scoped>

</style>
