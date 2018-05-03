<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="head"></router-view>
    <router-view name="left"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data (){
      return {
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#left{
  height: 590px;
  width: 200px;
}
#top{
  height: 60px;
  width: 100%;
}
#left,#right{
  float: left;
}
  .funOption .el-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .cmsLeft_son>ul>li,
  .cmsLeft_son>ul>li:nth-of-type(2)>div,
  .cmsLeft_son>ul>li:nth-of-type(2)>ul,
  .cmsLeft_son>ul>li:nth-of-type(2)>ul li{
    background-color: #343f4b!important;
    width: 200px;
  }
  .el-menu-item-group__title{
    padding: 0;
  }
  .ddtable th{
    text-align: center;
  }
  .ddtable .el-button+.el-button{
    margin-left: 5px;
  }
  .ddtablehead thead th{
    background-color: #4f9acd;
    color: white;
    border-right: 1px solid white;
  }
  .ddtablehead tbody>tr>td:nth-of-type(13){
    color: #4f9acd;
    text-decoration: underline;
    cursor: pointer;
  }
  .ddinputad3 input,.ddinputad4 input,.ddinputad5 input{
    width: 217px;
  }
  *{
    padding: 0px;
    margin: 0px;
  }
  html{
    /* border: 1px solid red; */
    height: 640px;
  }
.el-table th>.cell{
  text-align: center;
}
  /*内容管理*/
.newArrival{
  width: 1088px;
  height: 576px;
}
.frame{
  width: 1088px;
  height: 86px;
}
.Button{
  width: 90px;
  height: 34px;
  color: white;
  background-color: #4F9ACD;
  float:left;
  line-height: 34px;
  transition: all .2s linear;
  cursor:pointer;
  margin: 26px 0 26px 0;
  text-align: center;
}
.Button:hover{
  background-color:#FF9000;
}
.tubiaoqian{
  padding-right: 5px;
}
.kubox{
  width:1050px;
  height: 56px;
  color: #224D83;
  margin-left: 20px;
  text-align: center;
  line-height: 56px;
  background-color: #F9F9F9;
}
.box{
  width: 1050px;
  margin-left: 20px;
}
.contenttag .el-tabs__nav-wrap::after{
  height: 0;
}
.contenttag .el-tabs__nav-wrap{
  float: left;
  margin-left: 80px;
  margin-top: 3px;
}
.contenttag .el-tabs__header{
  overflow: hidden;
}
  .contenttag .el-tabs__content{
    margin-left: -120px;
  }
</style>
