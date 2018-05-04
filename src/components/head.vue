<template>
  <div>
    <header>
      <div class="log">
        <ul>
          <li>
            <a  @click="tiaozhuan()">
              <img src="./../assets/logo.png">
            </a>
          </li>
          <li @click="tiaozhuan()">后台管理系统</li>
        </ul>
      </div>
      <div class="admin">
        <ul>
          <li>
            <!-- <router-link to="/index"> -->
             <img :src="'../static/'+userImg">
            <!-- </router-link> -->
          </li>
          <li>|</li>
          <li><span>欢迎您 {{adminname}}</span></li>
          <li>|</li>
          <li @click="quit">
            <span>&#xe67d;</span>退出
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
  import qs from 'qs'
  import {setCookie, getCookie, delCookie} from '../assets/js/cookie.js'
  export default{
    name: '',
    data: function () {
      return {
        adminname: '',
        userImg: ''
      }
    },
    mounted(){
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let self = this;
      let userId = getCookie('userId');
//      console.log(userId);
      let postData = qs.stringify({user_id: userId})
      this.$axios.post('/api/headuserId.do', postData).then(function (resData) {
//        console.log(resData['data']['items'][0]);
        self.adminname = resData['data']['items'][0].user_name;
        self.userImg = resData['data']['items'][0].user_pic;
//        console.log(self.userImg);
      }).catch(function (err) {
        console.log(err);
      })
      /*如果cookie不存在，则跳转到登录页*/
      if (!userId) {
        this.$router.push('/')
      }
    },
    methods: {
      quit(){
        /*删除cookie*/
        let self = this;
        delCookie('userId');
        this.adminname = '';
        this.userImg = '';
        this.exitsuccess();
        setTimeout(function () {
          self.$router.push('/')
        }, 500)

      },
      exitsuccess() {
        this.$message({
          message: '退出成功',
          center: true,
          type: 'success'
        });
      },
      tiaozhuan(){
          this.$router.push('/index')
      }
    }
  }
</script>
<style scoped>
  @font-face {
    font-family: fzqk;
    src: url('../assets/fonts/fzqk_2.ttf');
  }
  @font-face {
    font-family: 'iconfont';  /* project id 642232 */
    src: url('//at.alicdn.com/t/font_642232_2xyzkmdugq7x2yb9.eot');
    src: url('//at.alicdn.com/t/font_642232_2xyzkmdugq7x2yb9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_642232_2xyzkmdugq7x2yb9.woff') format('woff'),
    url('//at.alicdn.com/t/font_642232_2xyzkmdugq7x2yb9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_642232_2xyzkmdugq7x2yb9.svg#iconfont') format('svg');
  }
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  header {
    height: 70px;
    background-color: #088ec3;
    padding: 0 20px;
    font-family: fzqk;
  }
  .log {
    float: left;
    height: 70px;
  }
  .admin {
    float: right;
    font-family: fzqk;
  }
  .log img {
    width: 45px;
  }
  .log li {
    float: left;
    line-height: 70px;
    height: 70px;
  }
  .log li:nth-of-type(1) {
    margin-top: 10px;
  }
  .log li:nth-of-type(2) {
    padding: 0 20px;
    font-size: 24px;
    color: white;
    font-family: fzqk;
    font-weight: 700;
  }
  .admin li:nth-of-type(5) {
    margin-left: 10px;
    cursor: pointer;
  }
  .admin li:nth-of-type(3) {
    font-size: 18px;
    margin-right: 10px;
    cursor: pointer;
  }
  .log li:hover {
    cursor: pointer;
  }
  .admin img {
    width: 40px;
    height: 40px;
    margin-top: 15px;
  }
  .admin li:nth-of-type(5)>span {
    font-family: iconfont;
    margin-right: 5px;
  }
  .admin li {
    float: left;
    height: 70px;
    line-height: 70px;
    color: white;
  }
  .admin li:nth-of-type(2) {
    padding: 0 10px 0 0;
    font-size: 14px;
    color: #ccc;
  }
  .admin li:nth-of-type(1) {
    padding: 0 20px;
    cursor: pointer;
  }
  .admin li:nth-of-type(3) {
    cursor: pointer;
  }
</style>
