<template>
  <div class="cmsLeft">
    <el-col :span="12" class="cmsLeft_son">
      <el-menu default-active="2"  router class="el-menu-vertical-demo" @open="handleOpen"  @close="handleClose"  background-color="#545c64" active-background-color="#253243" text-color="#fff"  active-text-color="#41c7ff">
        <el-menu-item index="/index" class="item">
          <i class="icon">&#xe60b;</i>
          <span slot="title" class="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/index/user" class="item">
          <i class="icon">&#xe610;</i>
          <span slot="title" class="title">会员管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title" class="item"><i class="icon">&#xe656;</i><span class="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="subtitle" index="/index/producttype">·商品类型管理</el-menu-item>
            <el-menu-item class="subtitle" index="/index/productManage">·商品详情管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/index/dingdanguanli" class="item">
          <i class="icon">&#xe64e;</i>
          <span slot="title" class="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title" class="item"><i class="icon">&#xe656;</i><span class="title">内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="subtitle" index="/index/ContentManagement/RecomForBur">·爆款推荐</el-menu-item>
            <el-menu-item class="subtitle" index="/index/ContentManagement/NewArrivals">·新品推荐</el-menu-item>
            <el-menu-item class="subtitle" index="/index/ContentManagement/UserCase">·用户案例</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    </el-row>
    <router-view name="body" @proM_pro_id="id" :pro_id="pro_id"></router-view>
  </div>
</template>
<script>
  import qs from 'qs';
  export default{
    'name': '',
    'data': function () {
      return {
          pro_id:'',
      }
    },
    'methods':{
        //接收商品详情查看参数
      id(pro_id){
        this.pro_id= pro_id
        console.log(this.pro_id);
        this.$router.push('/index/productContent/'+this.pro_id)
      },
      handleOpen(key, keyPath) {
//        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
//        console.log(key, keyPath);
      },
      //添加路由
      dingdanguanli:function () {
        this.$router.push('dingdanguanli')
      },
      huiyuanguanli:function () {
        this.$router.push('huiyuanguanli')
      },
      shangpingtype:function () {
        this.$router.push('shangpingtype')
      },
      shangpingdetail:function () {
        this.$router.push('shangpingdetail')
      },
      neirongguanli:function () {
        this.$router.push('neirongguanli')
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
    src: url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.eot');
    src: url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.woff') format('woff'),
    url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_642232_6b3tlz8iru0oogvi.svg#iconfont') format('svg');
  }
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .icon{
    position: absolute;
    left: 52px;
    font-size: 16px;
  }
  .title{
    position:absolute;
    left:80px;
    font-size: 14px;

  }
  .item{
    position:relative;
    height: 53px;
    border:1px solid #1f2b39;
  }
  .subtitle{
    font-size: 12px;
  }
  .cmsLeft{
    float: left;
    font-size: 16px;
  }
  .cmsLeft i{
    font-style: normal;
    font-family: iconfont;
  }
  .cmsLeft_son{
    width: 200px;
    height:590px;
    position: relative;
    background-color: #343f4b;
    font-family: fzqk;
  }
  .dingdanguanli{
    float: left;
  }

</style>
