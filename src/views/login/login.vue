<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../../assets/login/logo.png">
    </div>
    <div class="login_form">
      <input type="text" class="qxs-ic_user qxs-icon" placeholder="手机号" v-model="account">
      <input type="text" class="qxs-ic_password qxs-icon" placeholder="密码" v-model="password">
      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>

    </div>
  </div>
</template>

<script>
  import {LoginUser} from '../../network/home'
  // import axios from "../../network/axios";

  export default {
    name: "login",
    data() {
      return {
        account: '',
        password: '',
        isBtnLoading: false
      }
    },
    // created() {
    //   if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
    //     this.userName = JSON.parse(localStorage.getItem('user')).userName;
    //     this.password = JSON.parse(localStorage.getItem('user')).password;
    //
    //   }
    //
    // },

    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {

      // jia:function () {
      //   this.$store.commit('add',aaa)
      //   console.log(this.$store.state.b)
      // },
      login() {

        var logininfo={
          account:this.account,
          password:this.password
        }
        // console.log('点击登陆')
        if (!this.account) {
          this.$message.error('请输入手机号');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
        LoginUser(logininfo).then(res=>{
              if (res.code==200){
                // console.log(res.account)
                localStorage.setItem('useraccount',JSON.stringify(this.account));
                this.$store.commit('changeLogin',200)
                // console.log(this.$store.state.isLogin)
                // window.location = '/home';
                this.$router.push({path: '/home'})
              }

              else {
                this.$message.error(res.msg);

              }

        })


      }

    }


  }
</script>

<style scoped>
  .login_form {

    padding-top: 10%;

    padding-left: 10%;

    padding-right: 10%;

  }

  .qxs-ic_user {

    background: url("../../assets/login/ic_user.png") no-repeat;

    background-size: 13px 15px;

    background-position: 3%;

  }

  .qxs-ic_password {

    background: url("../../assets/login/ic_password.png") no-repeat;

    background-size: 13px 15px;

    background-position: 3%;

    margin-bottom: 20px;

  }

  .login_logo {

    height: 100%;
    width: 100%;

  }

  .login_btn {

    width: 100%;

    font-size: 16px;

    background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */

    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */

    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */

    background: linear-gradient(to right, #000099, #2154FA); /* 标准的语法 */

    filter: brightness(1.4);

  }

</style>
