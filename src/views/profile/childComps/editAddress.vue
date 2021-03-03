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
  import {getUserByAccount,updateAddress,getAddressById} from '../../../network/home'

    export default {
        name: "edit-address",
      data() {
        return {
          areaList,
          addressInfo: {
            id:0,
            name:'a',
            tel:'',
            addressDetail:'',
            // areaCode:'130421'
          }
        };
      },
      created(){
        this.init()
      },

      methods: {
          init(){
            var reg = /.+?(省|市|自治区|自治州|县|区)/g;

            let addrid=this.$route.query.addressId
            getAddressById(addrid).then(res=>{
              // console.log(res.addr.match(reg));
              var info=res.addr.match(reg)
              // var infos=JSON.parse(info)
              let province=info[0]
              let city=info[1]
              let county=info[2]
              this.addressInfo.id=res.id
              this.addressInfo.name=res.userName
              this.addressInfo.tel=res.userPhone
              // this.addressInfo.province=province
              // this.addressInfo.county=city
              // this.addressInfo.county=county
              this.addressInfo.addressDetail=res.addr

            })

          },

        onSave(content) {
            console.log(content)
          var aid=this.$route.query.addressId
           // var addr=content.province+content.city+content.county+content.addressDetail
           var addr=content.addressDetail
          var userName=content.name
          var tel=content.tel
          var uid=window.localStorage.getItem('useraccount')
          var uuid=JSON.parse(uid)
          getUserByAccount(uuid).then(res=>{
            var usid=res.id
            var data={
              id:aid,
              userId: usid,
              userName: userName,
              userPhone: tel,
              addr: addr
            }
            console.log(data)
            updateAddress(data).then(res => {
              console.log(data)
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
