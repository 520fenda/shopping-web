<template xmlns="http://www.w3.org/1999/html">
  <div>
   <span>姓名</span><el-input
    placeholder="请输入收姓名"
    v-model="inputname"
    clearable>
  </el-input>
    <br/>
    <span>电话</span><el-input
    placeholder="请输入电话"
    v-model="inputtel"
    clearable>
  </el-input>
    <br/>
   <span>地址</span> <el-input
    type="textarea"
     autosize
      placeholder="请输入地址"
      v-model="inputaddr"
      clearable>
    </el-input>
    <br/>
    <el-button @click="onsave"  type="danger" round>保存</el-button>
  </div>

</template>

<script>
  import {getUserByAccount,updateAddress,getAddressById} from '../../../network/home'
    export default {
        name: "eedit-address",
      data(){
          return{

              id:0,
              inputname:'a',
              inputtel:'',
              inputaddr:'',
              // areaCode:'130421'



          }
      },
      created(){
          this.init()
      },
      methods:{
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
            this.id=res.id
            this.inputname=res.userName
            this.inputtel=res.userPhone
            // this.addressInfo.province=province
            // this.addressInfo.county=city
            // this.addressInfo.county=county
            this.inputaddr=res.addr

          })

        },
        onsave(){
          var uid=window.localStorage.getItem('useraccount')
          var uuid=JSON.parse(uid)
          getUserByAccount(uuid).then(res=>{
            let addid=this.$route.query.addressId
            let userid=res.id
            let name=this.inputname
            let tel=this.inputtel
            let addrr=this.inputaddr
            let Address={
              id:addid,
              userId:userid,
              userName:name,
              userPhone:tel,
              addr:addrr,
            }
            updateAddress(Address).then(res2=>{

              this.$toast('成功');
            })
          })




        }
      },
    }
</script>

<style scoped >
  .el-button--danger{

    width: 300px;
    height: 50px;
    margin: 390px 50% 5px 4%;

  }
  .el-input{
        width: 70%;
  }

  .el-textarea{
    width: 70%;
  }
  span{
    margin: 0px 20px 20px 20px;
  }


</style>
