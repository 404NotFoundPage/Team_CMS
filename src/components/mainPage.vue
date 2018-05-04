<!-- 主页面 -->
<template>
  <div id="main">
    <ul>
      <li>
        <router-link to="/index/user">
          <span class="i"> &#xe663;</span><p>会员管理</p>
        </router-link>
      </li>
      <li>
        <router-link to="/index/productManage">
          <span class="i">&#xe656;</span><p>商品管理</p>
        </router-link>
      </li>

      <li>
        <router-link to="/index/dingdanguanli">
          <span class="i">&#xe6bd;</span><p>订单管理</p>
        </router-link>
      </li>
      <li>
        <router-link to="/index/producttype">
          <span class="i">&#xe605;</span><p>商品类型管理</p>
        </router-link>
      </li>
      <li>
        <router-link to="/index/ContentManagement">
          <span class="i">&#xe627;</span><p>内容管理</p>
        </router-link>
      </li>
      <!-- <li><span></span></li> -->
    </ul>
    <div id="totalNumber">
      <Diagram id="diagram" style="background-color:white"/>
    </div>
    <div id="totalLines">
      <!-- <userLine id='userline'/>
      <productLine id="productline"/> -->
      <orderLine id='orderline'/>
    </div>
    <mainUser></mainUser>
  </div>
</template>

<script type="text/javascript">
  import userLine from './charts/userLine'
  import Diagram from './charts/Diagram'
  import productLine from './charts/productLine'
  import orderLine from './charts/orderLine'
  import mainUser from './user/mainUser'
  export default {
    data () {
      return {
      };
    },
    components: {
      Diagram,
      userLine,
      productLine,
      orderLine,
      mainUser,
    }
  }

</script>
<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 642232 */
    src: url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.eot');
    src: url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.woff') format('woff'),
    url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_642232_wvg05pxrfb0rudi.svg#iconfont') format('svg');
  }
  .i{
    font-family: iconfont;
    color:white;
    font-size:35px;
  }
  template{
    position: relative;
  }
  #main>ul>li{
    cursor: pointer;
  }
  #main>ul>li a{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  #main{
    position: absolute;
    width: 1088px;
    left: 230px;
    top:100px;
    height: 540px;
    /* overflow:auto; */
  }
  ul>li{
    list-style: none;
    width: 170px;
    height: 65px;
    float: left;
    margin-left: 48px;
    margin-top:10px;
    color:white;
    padding-top: 8px;
  }
  ul>li:nth-child(1){
    margin-left:22px;
  }
  ul>li:nth-child(1){
    background-color: #F06868;
    /* margin-top:0px; */
  }
  ul>li:nth-child(2){
    /* margin-top:0px; */
    background-color: #07B38B;
  }
  ul>li:nth-child(3){
    background-color: #018ADA;
  }
  ul>li:nth-child(4){
    background-color:#61a0a8;
  }
  ul>li:nth-child(5){
    background-color: #d48265;
  }
  ul>li:nth-child(6){
    background-color: #334b5c;
  }
  #totalNumber{
    float: left;
    margin: 0 auto;
    width: 400px;
    background-color: white;
  }
  ul{
    width: 1088px;
    height: 95px;
    background-color: rgb(255, 255, 255);
    margin-bottom: 8px;
  }
  /* ul{
    margin-left: 350px;
  } */
  #diagram{

    padding: 5px 10px 0 10px;
    /* border-radius: 10px; */
  }
  #totalLines{
    /* clear: both; */
    float: left;
    width:678px;
    margin-left: 10px;
    margin-bottom: 10px;
    height:350px;
    background-color:white;
    /* border: 1px solid red; */
  }
  /* #productline,#userline,#orderline{
    width:300px;
    float: left;
    margin-top: 50px;
    background-color:white;
    border-radius: 10px;
  } */
  /* #productline,#orderline{
    margin-left: 50px;
  } */
  #orderline{

    float: left;
    margin-top: 10px;
    padding-left: 20px;
  }
  a:-webkit-any-link{
    color:white;
    text-decoration:none;
  }
</style>
