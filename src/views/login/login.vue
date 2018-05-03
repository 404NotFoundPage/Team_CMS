<template>
  <div id="app">
    <div class="login-wrap" v-show="showLogin">
      <h2>管理登录</h2>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button @click="login">登 录</button>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
  import {setCookie,getCookie} from '../../assets/js/cookie.js';
  export default {
    data() {
      return {
        showLogin: true,
        showTishi: false,
        tishi: '',
        username: '',
        password: '',
        newUsername: '',
        newPassword: ''
      }
    },
    mounted(){
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
      if(getCookie('username')){
        this.$router.push('/index')
      }
    },
    methods:{
      login(){
        if(this.username == ""){
          this.tishi = "用户名不能为空，请重新输入"
          this.showTishi = true
        }else if(this.password == ""){
          this.tishi = "密码不能为空，请重新输入"
          this.showTishi = true
        }else{
            let self = this;
          let data = qs.stringify({'username':this.username,'password':this.password});
          /*接口请求,下方单引号内为接口路径*/
          this.$axios.post('/api/login.do',data).then((res)=>{
            console.log(res.data)
            /*接口的传值是(1,成功),(0,该用户不存在)*/
            if(res.data['items'].length == 0){
              self.loginerr();
            }else{
              self.loginsuccess();
              setCookie('userId',res.data['items'][0].user_id,1000*10)
              setTimeout(function(){
                this.$router.push('/index')
              }.bind(this),1000)
            }
          })
        }
      },
      loginsuccess() {
        this.$message({
          message: '登录成功',
          center: true,
          type: 'success'
        });
      },
      loginerr() {
        let self = this;
        this.$message({
          message: '用户名或密码错误',
          center: true,
          type: 'error'
        });
      }
    }
  }

</script>
<style scoped>
  #app {
    width: 100%;
    height:660px;
    overflow: hidden;
    background-image: url("../../assets/QQ图片20180423094507.jpg");
    background-size: cover;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .login-wrap {
    text-align: center;
  }
  h2{
    margin-top: 240px;
  }
  input {
    display: block;
    width: 300px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 40px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
  }
  p {
    /*border: 1px solid red;*/
    color: red;
    width: 100%;
    height: 40px;
    float: left;
    line-height: 40px;
    font-weight: bold;
  }

  button {
    display: block;
    width: 300px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: #FFAD01;
    color: #fff;
    font-size: 16px;
    margin-top: 40px;
  }
  span {
    cursor: pointer;
    color: red;
    font-size: 40px;
    float: left;
  }
</style>


